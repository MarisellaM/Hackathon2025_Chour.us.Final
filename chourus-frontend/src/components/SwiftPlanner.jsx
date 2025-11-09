import React, { useEffect, useState } from "react";

/**
 * Compact Planner
 * - Fixed-height scrollable output (like chat)
 * - Summarized bullets instead of long paragraphs
 */

const sampleConcerts = [
  { id: 1, date: "2025-06-14", city: "Glasgow",   venue: "Hampden Park",     time: "19:00" },
  { id: 2, date: "2025-06-17", city: "London",    venue: "Wembley Stadium",   time: "20:00" },
  { id: 3, date: "2025-06-21", city: "Manchester",venue: "Etihad Stadium",    time: "19:30" },
];

const placesByCity = {
  Glasgow: {
    restaurants: [
      { name: "The Gannet",       type: "Modern British", estTimeMin: 45 },
      { name: "Ubiquitous Chip",  type: "Scottish",        estTimeMin: 60 },
      { name: "Mother India",     type: "Indian",          estTimeMin: 50 },
    ],
    attractions: ["Kelvingrove Art Gallery", "Glasgow Cathedral", "Buchanan Street"],
  },
  London: {
    restaurants: [
      { name: "Flat Iron",   type: "Steakhouse", estTimeMin: 50 },
      { name: "Dishoom",     type: "Indian",     estTimeMin: 60 },
      { name: "Honest Burgers", type: "Burgers", estTimeMin: 40 },
    ],
    attractions: ["Southbank walk", "British Museum", "Covent Garden"],
  },
  Manchester: {
    restaurants: [
      { name: "The Refuge", type: "International", estTimeMin: 55 },
      { name: "Tattu",      type: "Modern Chinese", estTimeMin: 60 },
      { name: "Almost Famous", type: "Burgers",    estTimeMin: 40 },
    ],
    attractions: ["Northern Quarter", "John Rylands Library", "Heaton Park"],
  },
};

function timeStringToMinutes(t) {
  const [hh, mm] = t.split(":").map(Number);
  return hh * 60 + (mm || 0);
}
function minutesToTimeString(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export default function SwiftPlanner() {
  const [concerts, setConcerts] = useState([]);
  const [city, setCity] = useState("");
  const [count, setCount] = useState(2);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    setConcerts(sampleConcerts);
  }, []);

  function sample(city, n) {
    const data = placesByCity[city] || { restaurants: [], attractions: [] };
    return {
      restaurants: data.restaurants.slice(0, n),
      attractions: data.attractions.slice(0, n),
    };
  }

  function buildPlan(c) {
    const picks = sample(c.city, count);
    const startMin = timeStringToMinutes(c.time);
    const arriveMin = startMin - 60;
    const avgEat = picks.restaurants.length
      ? Math.round(
          picks.restaurants.reduce((s, r) => s + (r.estTimeMin || 45), 0) /
            picks.restaurants.length
        )
      : 45;
    const dinnerMin = Math.max(0, arriveMin - avgEat - 10);

    return {
      id: c.id,
      header: `${c.date} — ${c.city} @ ${c.venue}`,
      items: [
        `Show: ${c.time}`,
        `Arrive: ${minutesToTimeString(arriveMin)}`,
        `Dinner: ${minutesToTimeString(dinnerMin)}`,
        `Restaurants: ${
          picks.restaurants.map((r) => r.name).slice(0, 2).join(", ") || "—"
        }`,
        `See: ${picks.attractions.slice(0, 2).join(", ") || "—"}`,
      ],
    };
  }

  function generate() {
    const list = concerts
      .filter((c) => (city ? c.city === city : true))
      .map(buildPlan);
    setPlans(list);
  }

  const cities = Array.from(new Set(concerts.map((c) => c.city)));

  return (
    <div className="panel planner">
      <h3>Planner</h3>

 <div className="planner-controls">
  <label className="pc-field">
    <span>City</span>
    <select value={city} onChange={(e) => setCity(e.target.value)}>
      <option value="">All</option>
      {cities.map((ct) => (
        <option key={ct} value={ct}>
          {ct}
        </option>
      ))}
    </select>
  </label>

  <label className="pc-field">
    <span>Places / type</span>
    <input
      type="number"
      min={1}
      max={5}
      value={count}
      onChange={(e) => setCount(Number(e.target.value))}
     />
    </label>

    <button className="btn" onClick={generate}>
        Generate
        </button>
    </div>

      <ul className="planner-list">
        {concerts.map((c) => (
          <li key={c.id}>
            <div className="pl-title">
              {c.date} — {c.city} — {c.venue} — {c.time}
            </div>
          </li>
        ))}
      </ul>

      <div className="planner-output">
        {plans.length === 0 ? (
          <div className="muted">Click “Generate” to create a compact plan.</div>
        ) : (
          plans.map((p) => (
            <div key={p.id} className="plan-card">
              <div className="plan-header">{p.header}</div>
              <ul className="plan-items">
                {p.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
