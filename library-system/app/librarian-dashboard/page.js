import ProtectedRoute from "../components/ProtectedRoute";
import FeaturedBooks from "../components/FeaturedBooks";
import NewBooks from "../components/NewBooks";
import NavBar from "../components/NavBar";

export default function LibrarianDashboard() {
  return (
    <ProtectedRoute allowedRole="Librarian">
      <div>
        <NavBar />
        <h1>Librarian Dashboard</h1>
        <p>Welcome, Librarian!</p>
        <FeaturedBooks />
        <NewBooks />
      </div>
    </ProtectedRoute>
  );
}
