import Signup from "../components/Signup";

export default function SignupPage() {
  return (
    <>
      <div className="auth-background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <main>
        <div className="auth-container">
          <h2>Create Account</h2>
          <div className="auth-tabs">
            <Signup />
          </div>
        </div>
      </main>
    </>
  );
}
