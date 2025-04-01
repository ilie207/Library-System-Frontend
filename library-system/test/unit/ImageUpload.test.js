import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ImageUpload from "../../app/components/ImageUpload";
import { IKUpload, ImageKitProvider } from "imagekitio-next";

jest.mock("imagekitio-next", () => ({
  IKUpload: jest.fn(() => null),
  ImageKitProvider: jest.fn(({ children }) => children),
}));

jest.mock("../../lib/config", () => ({
  env: {
    imagekit: {
      publicKey: "test-public-key",
      urlEndpoint: "test-url-endpoint",
    },
  },
}));

describe("ImageUpload Component", () => {
  const mockOnUploadSuccess = jest.fn();
  const defaultProps = {
    onUploadSuccess: mockOnUploadSuccess,
    filename: "test-file",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            signature: "test-signature",
            token: "test-token",
            expire: 9999999999,
          }),
      })
    );
  });

  it("should render the ImageKitProvider with correct props", () => {
    render(<ImageUpload {...defaultProps} />);

    expect(ImageKitProvider).toHaveBeenCalled();
    const props = ImageKitProvider.mock.calls[0][0];
    expect(props.publicKey).toBe("test-public-key");
    expect(props.urlEndpoint).toBe("test-url-endpoint");
    expect(props.authenticator).toBeDefined();
  });

  it("should validate file size correctly", () => {
    const { container } = render(<ImageUpload {...defaultProps} />);
    const component = container.firstChild;

    const ikUploadProps = IKUpload.mock.calls[0][0];
    const validateFile = ikUploadProps.validateFile;

    const smallFile = { size: 1024 * 1024 }; // 1MB
    const largeFile = { size: 25 * 1024 * 1024 }; // 25MB

    global.alert = jest.fn();

    expect(validateFile(smallFile)).toBe(true);
    expect(validateFile(largeFile)).toBe(false);
    expect(global.alert).toHaveBeenCalledWith(
      "File size must be less than 20MB"
    );
  });

  it("should update progress during upload", () => {
    render(<ImageUpload {...defaultProps} />);
    const onUploadProgress = IKUpload.mock.calls[0][0].onUploadProgress;
    const progressEvent = { loaded: 50, total: 100 };

    expect(onUploadProgress).toBeDefined();
    expect(() => onUploadProgress(progressEvent)).not.toThrow();
  });

  it("should handle successful upload", () => {
    const { container } = render(<ImageUpload {...defaultProps} />);
    const component = container.firstChild;

    const ikUploadProps = IKUpload.mock.calls[0][0];
    const onSuccess = ikUploadProps.onSuccess;

    onSuccess({ name: "testfile_xyz123" });
    expect(mockOnUploadSuccess).toHaveBeenCalledWith("testfile");
  });

  it("should handle upload error", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    const { container } = render(<ImageUpload {...defaultProps} />);
    const component = container.firstChild;

    const ikUploadProps = IKUpload.mock.calls[0][0];
    const onError = ikUploadProps.onError;

    const error = new Error("Upload failed");
    onError(error);
    expect(consoleSpy).toHaveBeenCalledWith("Upload failed:", error);

    consoleSpy.mockRestore();
  });
});
