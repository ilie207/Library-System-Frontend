import ProtectedRoute from "../components/ProtectedRoute";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import LibraryOverview from "../components/LibraryOverview";
import RecentActivity from "../components/RecentActivity";

export default function LibrarianDashboard() {
  return (
    <ProtectedRoute allowedRole="Librarian">
      <Header />
      <div>
        <NavBar />
        <LibraryOverview />
        <RecentActivity />
      </div>
    </ProtectedRoute>
  );
}
