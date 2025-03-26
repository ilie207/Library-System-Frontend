import ProtectedRoute from "../components/ProtectedRoute";
import FeaturedBooks from "../components/FeaturedBooks";
import NewBooks from "../components/NewBooks";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

export default function LibrarianDashboard() {
  return (
    <ProtectedRoute allowedRole="Librarian">
      <Header />
      <div>
        <NavBar />
        <FeaturedBooks />
        <NewBooks />
      </div>
    </ProtectedRoute>
  );
}
