import ProtectedRoute from "../components/ProtectedRoute";

export default function LibrarianDashboard() {
  return (
    <ProtectedRoute allowedRole="Student">
      <div>
        <h1>Student Dashboard</h1>
        <p>Welcome, Student!</p>
      </div>
    </ProtectedRoute>
  );
}
