import React, { useEffect, useState } from 'react';

const sampleConcerts = [
  { id: 1, date: '2025-07-02', city: 'Toronto', venue: 'Rogers Centre', time: '20:00' },
  { id: 2, date: '2025-07-10', city: 'New York', venue: 'Madison Square Garden', time: '19:30' },
  { id: 3, date: '2025-07-18', city: 'Los Angeles', venue: 'Crypto.com Arena', time: '20:30' },
];

const placesByCity = {
  Toronto: {
    restaurants: [
      { name: 'Alo', type: 'Fine Dining', estTimeMin: 90 },
      { name: 'Richmond Station', type: 'Contemporary', estTimeMin: 60 },
      { name: 'Pai', type: 'Thai', estTimeMin: 55 },
    ],
    attractions: [
      'Distillery District',
      'CN Tower',
      'Harbourfront Centre',
    ],
  },
  'New York': {
    restaurants: [
      { name: 'Le Coucou', type: 'French', estTimeMin: 90 },
      { name: 'Katz\'s Delicatessen', type: 'Deli', estTimeMin: 45 },
      { name: 'Eataly', type: 'Italian Market', estTimeMin: 60 },
    ],
    attractions: [
      'Times Square',
      'High Line',
      'Bryant Park',
    ],
  },
  'Los Angeles': {
    restaurants: [
      { name: 'Bestia', type: 'Italian', estTimeMin: 75 },
      { name: 'Gjelina', type: 'Californian', estTimeMin: 65 },
      { name: 'Musso & Frank', type: 'Steakhouse', estTimeMin: 70 },
    ],
    attractions: [
      'Griffith Observatory',
      'Santa Monica Pier',
      'The Broad',
    ],
  },
};

function timeStringToMinutes(t) {
  const [hh, mm] = t.split(':').map(Number);
  return hh * 60 + (mm || 0);
}
function minutesToTimeString(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export default function WeekndPlanner() {
  const [concerts, setConcerts] = useState([]);
  const [generated, setGenerated] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [countPlaces, setCountPlaces] = useState(2);

  useEffect(() => {
    setConcerts(sampleConcerts);
  }, []);

  function samplePlacesFor(city, n) {
    const cityData = placesByCity[city] || { restaurants: [], attractions: [] };
    return {
      restaurants: cityData.restaurants.slice(0, n),
      attractions: cityData.attractions.slice(0, n),
    };
  }

  function generateForConcert(c) {
    const city = c.city;
    const placeData = samplePlacesFor(city, countPlaces);
    const concertStartMin = timeStringToMinutes(c.time);
    const arrivalMin = concertStartMin - 60;
    const avgResTime =
      placeData.restaurants.length > 0
        ? Math.round(placeData.restaurants.reduce((s, r) => s + (r.estTimeMin || 60), 0) / placeData.restaurants.length)
        : 60;
    const dinnerStart = arrivalMin - avgResTime - 15;
    const restaurantsList = placeData.restaurants.map(r => `  - ${r.name} (${r.type}, ~${r.estTimeMin}m)`);
    const visitSuggestions = placeData.attractions.map(a => `  - ${a}`);
    return [
      `${c.date} — ${city} @ ${c.venue}`,
      `Concert time: ${c.time}`,
      `Suggested arrival at venue: ${minutesToTimeString(arrivalMin)}`,
      `Suggested dinner start: ${minutesToTimeString(Math.max(0, dinnerStart))}`,
      `Restaurant options:`,
      ...restaurantsList,
      `Places to visit before the show:`,
      ...visitSuggestions,
      `Notes: leave extra time for transport, security, and crowds.`,
    ].join('\n');
  }

  function generateAll() {
    if (!concerts.length) {
      setGenerated('No concerts available.');
      return;
    }
    const list = concerts
      .filter(c => (selectedCity ? c.city === selectedCity : true))
      .map(generateForConcert);
    setGenerated(`The Weeknd Pre-Concert Plans\n\n${list.join('\n\n')}\n\nGenerated ${new Date().toLocaleString()}`);
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, Arial', maxWidth: 900 }}>
      <h2>The Weeknd Pre-Concert Planner</h2>

      <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <label>
          Filter city:
          <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="">All</option>
            {Array.from(new Set(concerts.map(c => c.city))).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>

        <label>
          Places per category:
          <input
            type="number"
            min="1"
            max="5"
            value={countPlaces}
            onChange={e => setCountPlaces(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>

        <button onClick={generateAll} style={{ padding: '8px 12px' }}>
          Generate Plans
        </button>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ minWidth: 320 }}>
          <h3>Concerts</h3>
          <ul>
            {concerts.map(c => (
              <li key={c.id}>
                {c.date} — {c.city} — {c.venue} — {c.time}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
            <div style={{ flex: 1 }}  className="my_scroll_div">
          <h3>Generated Plans</h3>
          <pre style={{ whiteSpace: 'pre-wrap', padding: 12, maxHeight: 200 }}>
            {generated || 'Click "Generate Plans" to produce pre-concert schedules with restaurant and visit suggestions.'}
          </pre>
        </div>
      </div>
        </div>
        

     
    </div>
  );
}