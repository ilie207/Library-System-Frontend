import { render, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../../app/components/Signup";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

jest.mock("../../lib/supabase", () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

describe("Signup Component", () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = useRouter();
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({ csrfToken: "test-csrf-token" }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: "Profile created" }),
        })
      );
  });

  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle librarian code validation", async () => {
    const { getByPlaceholderText, getByRole, getByText } = render(<Signup />);

    fireEvent.change(getByRole("combobox"), { target: { value: "Librarian" } });
    fireEvent.change(getByPlaceholderText("Librarian Authorization Code"), {
      target: { value: "wrong-code" },
    });

    fireEvent.submit(getByRole("button"));

    await waitFor(() => {
      expect(
        getByText("Invalid librarian code. Please contact the administrator.")
      ).toBeInTheDocument();
    });
  });

  it("should handle successful signup flow", async () => {
    supabase.auth.signUp.mockResolvedValueOnce({
      data: { user: { id: "123" } },
      error: null,
    });

    const { getByPlaceholderText, getByRole } = render(<Signup />);

    fireEvent.change(getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.submit(getByRole("button"));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  it("should handle signup authentication error", async () => {
    const errorMessage = "Email already registered";
    supabase.auth.signUp.mockResolvedValueOnce({
      data: { user: null },
      error: { message: errorMessage },
    });

    const { getByPlaceholderText, getByRole, getByText } = render(<Signup />);

    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "existing@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.submit(getByRole("button"));

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("should toggle librarian code input visibility", () => {
    const { getByPlaceholderText, getByRole, queryByPlaceholderText } = render(
      <Signup />
    );

    expect(queryByPlaceholderText("Librarian Authorization Code")).toBeNull();

    fireEvent.change(getByRole("combobox"), { target: { value: "Librarian" } });
    expect(
      getByPlaceholderText("Librarian Authorization Code")
    ).toBeInTheDocument();

    fireEvent.change(getByRole("combobox"), { target: { value: "Student" } });
    expect(queryByPlaceholderText("Librarian Authorization Code")).toBeNull();
  });
});
