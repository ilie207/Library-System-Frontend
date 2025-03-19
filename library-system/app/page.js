import Login from "./components/Login";
import Link from "next/link";
import "../styles/auth.css";

export default function Home() {
  return (
    <>
      <div className="auth-background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <main>
        <div className="auth-container">
          <h2>Welcome to Learner's Library</h2>
          <div className="auth-tabs">
            <Login />
          </div>
          <div className="signup-link">
            <p>Don't have an account yet?</p>
            <Link href="/signup" className="auth-link">
              Create one here
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
