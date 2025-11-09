export default function EventModal({ artist, date, venue, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginTop: 0 }}>{artist}</h2>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Venue:</strong> {venue}</p>

        <div className="modal-actions">
          <a className="btn" href="#" target="_blank">Hotels</a>
          <a className="btn" href="#" target="_blank">Food</a>
          <a className="btn" href="#" target="_blank">Parking</a>
        </div>

        <button className="btn-outline" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
