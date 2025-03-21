import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import FeaturedBooks from "../components/FeaturedBooks";
import NewBooks from "../components/NewBooks";
import NavBar from "../components/NavBar";

export default function LibrarianDashboard() {
  return (
    <ProtectedRoute allowedRole="Student">
      <Header />
      <div>
        <NavBar />
        <h1>Student Dashboard</h1>
        <p>Welcome, Student!</p>
        <FeaturedBooks />
        <NewBooks />
      </div>
    </ProtectedRoute>
  );
}
