import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../app/components/Login";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

describe("Login Component", () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = useRouter();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ csrfToken: "test-csrf-token" }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle CSRF token fetch error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<Login />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching CSRF token:",
        expect.any(Error)
      );
    });
    consoleSpy.mockRestore();
  });

  it("should update role selection correctly", () => {
    const { getByRole } = render(<Login />);
    const select = getByRole("combobox");

    fireEvent.change(select, { target: { value: "Librarian" } });
    expect(select.value).toBe("Librarian");
  });

  it("should handle login failure with alert", async () => {
    const errorMessage = "Invalid credentials";
    supabase.auth.signInWithPassword.mockResolvedValueOnce({
      error: { message: errorMessage },
    });

    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    const { getByPlaceholderText, getByRole } = render(<Login />);

    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(getByRole("button"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(errorMessage);
    });

    alertMock.mockRestore();
  });

  it("should redirect to student dashboard on successful student login", async () => {
    supabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: { id: "123" } },
      error: null,
    });

    const { getByPlaceholderText, getByRole } = render(<Login />);
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "student@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(getByRole("button"));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/student-dashboard");
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it("should redirect to librarian dashboard on successful librarian login", async () => {
    supabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: { id: "123" } },
      error: null,
    });

    const { getByPlaceholderText, getByRole } = render(<Login />);
    fireEvent.change(getByRole("combobox"), { target: { value: "Librarian" } });

    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "librarian@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(getByRole("button"));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/librarian-dashboard");
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });
});
