import BookList from "../components/BookList";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <NavBar />
        <BookList />
      </main>
    </div>
  );
}
