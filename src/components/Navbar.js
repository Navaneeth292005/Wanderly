import React from "react";

const STEPS = ["City", "Hotels", "Destinations", "Details", "Plan"];

export default function Navbar({ step, setStep, city }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">wander<span>ly</span></div>

      <div className="nav-steps">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const cls = n === step ? "active" : n < step ? "done" : "";
          return (
            <div
              key={s}
              className={`nav-step ${cls}`}
              onClick={() => n < step && setStep(n)}
            >
              {n < step ? "✓ " : ""}{s}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {city && (
          <div className="nav-city-badge">
            <span>{city.emoji}</span>
            <span>{city.name}</span>
          </div>
        )}
        <a
          href="portfolio.html"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 14px",
            borderRadius: "999px",
            border: "1.5px solid var(--orange)",
            color: "var(--orange)",
            fontSize: "0.78rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--orange)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--orange)";
          }}
        >
          👤 My Portfolio
        </a>
      </div>
    </nav>
  );
}

