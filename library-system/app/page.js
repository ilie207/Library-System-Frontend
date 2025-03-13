import styles from "./page.module.css";
import BookList from "./components/BookList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BookList />
      </main>
    </div>
  );
}
