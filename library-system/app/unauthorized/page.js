import Link from "next/link";

export default function Unauthorised() {
  return (
    <div className="unauthorised-container">
      <h1>Access Denied</h1>
      <p>You don't have permission to access this page.</p>
      <p>Please contact your administrator if you believe this is an error.</p>
      <Link href="/" className="custom_button">
        Return to safe space.
      </Link>
    </div>
  );
}
