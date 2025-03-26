import ProtectedRoute from "../components/ProtectedRoute";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import AddBook from "../components/AddBook";

export default function LibrarianDashboard() {
  return (
    <ProtectedRoute allowedRole="Librarian">
      <div className="form-background"></div>
      <Header />
      <main>
        <NavBar />
        <div className="form-container">
          <h2>Add Book</h2>
          <div className="form-tabs">
            <AddBook />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
