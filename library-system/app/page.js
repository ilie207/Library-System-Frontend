import Header from "./components/Header";
import FeaturedBooks from "./components/FeaturedBooks";
import NewBooks from "./components/NewBooks";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <NavBar />
        <FeaturedBooks />
        <NewBooks />
      </main>
    </div>
  );
}
