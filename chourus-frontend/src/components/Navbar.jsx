export default function Navbar() {
  return (
    <nav className="nav">
      <div className="brand">Chour.us</div>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Profile</a>
        <a href="#">Account</a>
      </div>

      {/* PFP (right corner) */}
      <img
        className="avatar"
        src="https://i.pravatar.cc/64?img=5"
        alt="Profile"
      />
    </nav>
  );
}
