import React, { useEffect, useState } from 'react';

/**
 * Small AI-like generator:
 * - Uses local concert data (replace with real fetch if available)
 * - Uses simple place database (restaurants + attractions) per city
 * - Generates a pre-concert schedule with suggested times, restaurants, and places to visit
 */

const sampleConcerts = [
  { id: 1, date: '2025-06-14', city: 'Glasgow', venue: 'Hampden Park', time: '19:00' },
  { id: 2, date: '2025-06-17', city: 'London', venue: 'Wembley Stadium', time: '20:00' },
  { id: 3, date: '2025-06-21', city: 'Manchester', venue: 'Etihad Stadium', time: '19:30' },
];

const placesByCity = {
  Glasgow: {
    restaurants: [
      { name: 'The Gannet', type: 'Modern British', estTimeMin: 45 },
      { name: 'Ubiquitous Chip', type: 'Scottish', estTimeMin: 60 },
      { name: 'Mother India', type: 'Indian', estTimeMin: 50 },
    ],
    attractions: [
      'Kelvingrove Art Gallery and Museum',
      'Glasgow Cathedral',
      'Buchanan Street shopping',
    ],
  },
  London: {
    restaurants: [
      { name: 'Flat Iron', type: 'Steakhouse', estTimeMin: 50 },
      { name: 'Dishoom', type: 'Indian', estTimeMin: 60 },
      { name: 'Honest Burgers', type: 'Burgers', estTimeMin: 40 },
    ],
    attractions: [
      'Southbank walk',
      'British Museum',
      'Covent Garden',
    ],
  },
  Manchester: {
    restaurants: [
      { name: 'The Refuge', type: 'International', estTimeMin: 55 },
      { name: 'Tattu', type: 'Modern Chinese', estTimeMin: 60 },
      { name: 'Almost Famous', type: 'Burgers', estTimeMin: 40 },
    ],
    attractions: [
      'Northern Quarter',
      'John Rylands Library',
      'Heaton Park',
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

export default function SwiftPlanner() {
  const [concerts, setConcerts] = useState([]);
  const [generated, setGenerated] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [countPlaces, setCountPlaces] = useState(2);

  useEffect(() => {
    // Replace with fetch() to get real concert schedule from an API or file.
    setConcerts(sampleConcerts);
  }, []);

  function samplePlacesFor(city, n) {
    const cityData = placesByCity[city] || { restaurants: [], attractions: [] };
    const restaurants = cityData.restaurants.slice(0, n);
    const attractions = cityData.attractions.slice(0, n);
    return { restaurants, attractions };
  }

  function generateForConcert(c) {
    const city = c.city;
    const placeData = samplePlacesFor(city, countPlaces);
    const concertStartMin = timeStringToMinutes(c.time);
    // Suggest arrival 60 minutes before show by default
    const arrivalMin = concertStartMin - 60;
    // Suggest dinner time: arrivalMin - average restaurant time - 10 min travel
    const avgResTime =
      placeData.restaurants.length > 0
        ? Math.round(placeData.restaurants.reduce((s, r) => s + (r.estTimeMin || 45), 0) / placeData.restaurants.length)
        : 45;
    const dinnerStart = arrivalMin - avgResTime - 10;
    const visitSuggestions = placeData.attractions.map((a, i) => `  - ${a}`);
    const restaurantsList = placeData.restaurants.map(r => `  - ${r.name} (${r.type}, ~${r.estTimeMin}m)`);
    return [
      `${c.date} — ${city} @ ${c.venue}`,
      `Concert time: ${c.time}`,
      `Suggested arrival at venue: ${minutesToTimeString(arrivalMin)}`,
      `Suggested dinner start: ${minutesToTimeString(Math.max(0, dinnerStart))}`,
      `Restaurant options:`,
      ...restaurantsList,
      `Places to visit before the show:`,
      ...visitSuggestions,
      `Notes: allow time for transport and lines; adjust based on tickets and preferences.`,
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
    setGenerated(`Taylor Swift Pre-Concert Plans\n\n${list.join('\n\n')}\n\nGenerated ${new Date().toLocaleString()}`);
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, Arial', maxWidth: 2000 }}>
      <h2>Taylor Swift Pre-Concert Planner</h2>

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

      <div style={{ display: 'flex', gap: 10 }}>
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

       <div style={{ flex: 1 }}  className="my_scroll_div">
          <h3>Generated Plans</h3>
          <pre style={{ whiteSpace: 'pre-wrap', padding: 100, maxHeight: 50 }}>
            {generated || 'Click "Generate Plans" to produce pre-concert schedules with restaurant and visit suggestions.'}
          </pre>
        </div>
      </div>


      
    </div>
  );
}