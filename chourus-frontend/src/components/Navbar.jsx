export default function Navbar() {
  return (
    <nav className="nav">
      <div className="brand">Chour.us</div>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Profile</a>
        <a href="#">Settings</a>
      </div>

      {/* PFP (right corner) */}
      <img
        className="avatar"
        src="https://tr.rbxcdn.com/180DAY-2829d4a03681097f9974337eaef14cd6/420/420/FaceAccessory/Webp/noFilter"
        alt="Profile"
      />
    </nav>
  );
}
