import React from "react";
import { destinations } from "../data/destinations";

export default function DestinationList({ city, selected, onToggle }) {
  const dests = destinations[city.id] || [];

  return (
    <div>
      <div className="hero">
        <div className="hero-glow" />
        <div className="hero-eyebrow">{city.emoji} Step 3 of 5 · {city.name}</div>
        <h1>Pick Your<br /><em>Adventures</em></h1>
        <p>
          Select as many attractions as you'd like —<br />
          our smart engine will plan the optimal route.
        </p>
        <div className="hero-progress">
          <div className="hero-progress-fill" style={{ width: "60%" }} />
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>
            Top Attractions
            {selected.length > 0 && (
              <span className="count-badge">{selected.length}</span>
            )}
          </h2>
          <p>{dests.length} must-see places in {city.name}</p>
        </div>

        {selected.length > 0 && (
          <div className="dest-count-banner">
            <span>✅</span>
            <span>
              <strong>{selected.length}</strong> destination{selected.length > 1 ? "s" : ""} selected —
              nearby places will be automatically grouped per day.
            </span>
          </div>
        )}

        {selected.length === 0 && (
          <div className="alert alert-info">
            💡 Select at least one destination to continue to the next step.
          </div>
        )}

        <div className="card-grid">
          {dests.map((dest) => {
            const isSelected = selected.some((d) => d.id === dest.id);
            return (
              <div
                key={dest.id}
                className={`dest-card ${isSelected ? "selected" : ""}`}
                onClick={() => onToggle(dest)}
              >
                <div className="dest-img-wrap">
                  <img src={dest.img} alt={dest.name} className="dest-img" loading="lazy" />
                  <div className="dest-overlay" />
                  <div className="dest-check">✓</div>
                  <div className="dest-duration">
                    ⏱ ~{dest.visitDuration} min
                  </div>
                </div>
                <div className="dest-body">
                  <div className="dest-name">{dest.name}</div>
                  <div className="dest-desc">{dest.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
