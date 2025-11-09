import { useState } from "react";
import EventModal from "./EventModal.jsx";

export default function ConcertCard({ artist, note, imageUrl, date = "TBD", venue = "TBD" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="card card-row">
        <img className="card-img" src={imageUrl} alt={artist} />
        <div className="card-body">
          <h3>{artist}</h3>
          {note && <p className="muted">{note}</p>}
          <button onClick={() => setOpen(true)}>View Event</button>
        </div>
      </div>

      {open && (
        <EventModal
          artist={artist}
          date={date}
          venue={venue}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
