import Signup from "../components/Signup";

export default function SignupPage() {
  return (
    <>
      <div className="form-background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <main>
        <div className="form-container">
          <h2>Create Account</h2>
          <div className="form-tabs">
            <Signup />
          </div>
        </div>
      </main>
    </>
  );
}
