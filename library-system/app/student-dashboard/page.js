import ProtectedRoute from "../components/ProtectedRoute";
import Header from "../components/Header";
import FeaturedBooks from "../components/FeaturedBooks";
import NewBooks from "../components/NewBooks";
import NavBar from "../components/NavBar";
import BorrowedBooks from "../components/BorrowedBooks";

export default function LibrarianDashboard() {
  return (
    <ProtectedRoute allowedRole="Student">
      <Header />
      <div>
        <NavBar />
        <BorrowedBooks />
        <FeaturedBooks />
        <NewBooks />
      </div>
    </ProtectedRoute>
  );
}
