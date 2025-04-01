import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../app/components/ProtectedRoute";
import { useAuth } from "../../lib/AuthContext";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../lib/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("ProtectedRoute Component", () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
    };
    useRouter.mockReturnValue(mockRouter);
  });

  it("should render children when user has correct role", () => {
    useAuth.mockReturnValue({
      user: { id: 1 },
      role: "admin",
      loading: false,
    });

    render(
      <ProtectedRoute allowedRole="admin">
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });

  it("should redirect to home when user is not authenticated", async () => {
    useAuth.mockReturnValue({
      user: null,
      role: "",
      loading: false,
    });

    render(
      <ProtectedRoute allowedRole="admin">
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });

  it("should redirect to unauthorised when user has incorrect role", async () => {
    useAuth.mockReturnValue({
      user: { id: 1 },
      role: "user",
      loading: false,
    });

    render(
      <ProtectedRoute allowedRole="admin">
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/unauthorized");
    });
  });

  it("should return null while loading", () => {
    useAuth.mockReturnValue({
      user: null,
      role: "",
      loading: true,
    });

    const { container } = render(
      <ProtectedRoute allowedRole="admin">
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(container.firstChild).toBeNull();
  });

  it("should handle role comparison case-insensitively", () => {
    useAuth.mockReturnValue({
      user: { id: 1 },
      role: "ADMIN",
      loading: false,
    });

    render(
      <ProtectedRoute allowedRole="admin">
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByTestId("protected-content")).toBeInTheDocument();
  });
});
