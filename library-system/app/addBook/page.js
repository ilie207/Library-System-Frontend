import ProtectedRoute from "../components/ProtectedRoute";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import AddBook from "../components/AddBook";

export default function LibrarianDashboard() {
  return (
    <ProtectedRoute allowedRole="Librarian">
      <Header />
      <div>
        <NavBar />
        <AddBook />
      </div>
    </ProtectedRoute>
  );
}
