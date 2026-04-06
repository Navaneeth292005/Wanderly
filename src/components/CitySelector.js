import React from "react";
import { cities } from "../data/cities";

export default function CitySelector({ selected, onSelect }) {
  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-glow" />
        <div className="hero-eyebrow">✈ Step 1 of 5</div>
        <h1>
          Where would you like<br />
          <em>to explore?</em>
        </h1>
        <p>Choose your destination and we'll craft an optimised itinerary just for you.</p>
        <div className="hero-progress">
          <div className="hero-progress-fill" style={{ width: "20%" }} />
        </div>
      </div>

      {/* Grid */}
      <div className="section">
        <div className="section-head">
          <h2>Popular Destinations</h2>
          <p>10 handpicked cities across India</p>
        </div>

        <div className="city-grid">
          {cities.map((city) => (
            <div
              key={city.id}
              className={`city-card ${selected?.id === city.id ? "selected" : ""}`}
              onClick={() => onSelect(city)}
            >
              <span className="city-emoji">{city.emoji}</span>
              <div className="city-name">{city.name}</div>
              <div className="city-tagline">{city.tagline}</div>
              {selected?.id === city.id && (
                <div className="city-selected-mark">✓ Selected</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
