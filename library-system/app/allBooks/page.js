import BookList from "../components/BookList";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <div className="form-background"></div>
      <Header />
      <main>
        <NavBar />
        <BookList />
      </main>
    </div>
  );
}
