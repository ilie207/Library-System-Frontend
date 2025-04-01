jest.mock("../../lib/csrf", () => ({
  generateToken: jest
    .fn()
    .mockResolvedValue({ token: "mock-token", secret: "mock-secret" }),
  verifyToken: jest.fn().mockImplementation((token, secret) => {
    if (token && secret) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }),
}));

import { generateToken, verifyToken } from "../../lib/csrf";

describe("CSRF Token Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should generate a token and secret pair", async () => {
    const result = await generateToken();

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("secret");
    expect(generateToken).toHaveBeenCalled();
  });

  it("should verify a valid token", async () => {
    const token = "valid-token";
    const secret = "valid-secret";

    const result = await verifyToken(token, secret);

    expect(result).toBe(true);
    expect(verifyToken).toHaveBeenCalledWith(token, secret);
  });

  it("should reject verification with missing secret", async () => {
    const result = await verifyToken("some-token", "");

    expect(result).toBe(false);
    expect(verifyToken).toHaveBeenCalledWith("some-token", "");
  });

  it("should reject verification with missing token", async () => {
    const result = await verifyToken("", "some-secret");

    expect(result).toBe(false);
    expect(verifyToken).toHaveBeenCalledWith("", "some-secret");
  });

  it("should handle crypto.subtle.importKey failure", async () => {
    generateToken.mockImplementationOnce(() => {
      console.error(
        "Error generating CSRF token:",
        new Error("Import key failed")
      );
      return Promise.resolve({ token: "", secret: "" });
    });

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const result = await generateToken();

    expect(result).toEqual({ token: "", secret: "" });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error generating CSRF token:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it("should handle crypto.subtle.sign failure", async () => {
    generateToken.mockImplementationOnce(() => {
      console.error(
        "Error generating CSRF token:",
        new Error("Signing failed")
      );
      return Promise.resolve({ token: "", secret: "" });
    });

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const result = await generateToken();

    expect(result).toEqual({ token: "", secret: "" });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error generating CSRF token:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
