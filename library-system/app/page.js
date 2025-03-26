import Login from "./components/Login";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="form-background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <main>
        <div className="form-container">
          <h2>Welcome to Learner's Library</h2>
          <div className="form-tabs">
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
