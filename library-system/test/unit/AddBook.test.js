import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddBook from "../../app/components/AddBook";
import { useRouter } from "next/navigation";
import { fetchWithCSRF } from "../../lib/fetchWithCSRF";
import { sanitiseObject } from "../../lib/sanitise";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../lib/fetchWithCSRF", () => ({
  fetchWithCSRF: jest.fn(),
}));

jest.mock("../../lib/sanitise", () => ({
  sanitiseObject: jest.fn((data) => data),
}));

describe("AddBook Component", () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
      refresh: jest.fn(),
    };
    useRouter.mockReturnValue(mockRouter);
    fetchWithCSRF.mockClear();
    sanitiseObject.mockClear();
  });

  it("should render all form inputs", () => {
    render(<AddBook />);
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Author")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Total Copies")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Genre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  it("should update form fields when user types", () => {
    render(<AddBook />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Book" },
    });
    fireEvent.change(screen.getByPlaceholderText("Author"), {
      target: { value: "Test Author" },
    });

    expect(screen.getByPlaceholderText("Title").value).toBe("Test Book");
    expect(screen.getByPlaceholderText("Author").value).toBe("Test Author");
  });

  it("should handle successful book submission", async () => {
    fetchWithCSRF.mockResolvedValueOnce({ ok: true });

    render(<AddBook />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "New Book" },
    });
    fireEvent.change(screen.getByPlaceholderText("Author"), {
      target: { value: "New Author" },
    });

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Book added successfully!")).toBeInTheDocument();
    });

    expect(fetchWithCSRF).toHaveBeenCalledWith("/api/books", {
      method: "POST",
      body: expect.any(String),
    });
  });

  it("should handle network error during submission", async () => {
    fetchWithCSRF.mockRejectedValueOnce(new Error("Network error"));

    render(<AddBook />);
    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByText("An error occurred while adding the book")
      ).toBeInTheDocument();
    });
  });
});
