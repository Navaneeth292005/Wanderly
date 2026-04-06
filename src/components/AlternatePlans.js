import React, { useState } from "react";

/**
 * AlternatePlans
 * Displays Budget-Friendly and Express plan suggestions
 * with expandable day-wise itinerary for each.
 */
export default function AlternatePlans({ alternatePlans, originalCost, booking }) {
  const [expanded, setExpanded] = useState(null); // "budget" | "express" | null

  if (!alternatePlans) return null;
  const { budget, express } = alternatePlans;

  const plans = [
    {
      key:       "budget",
      data:      budget,
      icon:      "💰",
      color:     "#0E7E5A",
      colorBg:   "#EDFBF6",
      colorBorder:"#6EE7B7",
      tagline:   "Best for travellers watching their wallet",
    },
    {
      key:       "express",
      data:      express,
      icon:      "⚡",
      color:     "#1D5CB3",
      colorBg:   "#EEF5FF",
      colorBorder:"#BFDBFE",
      tagline:   "Best for travellers short on time",
    },
  ];

  return (
    <div className="alt-plans-section">
      <div className="alt-plans-header">
        <h3>💡 Alternative Trip Suggestions</h3>
        <p>
          Not happy with the current plan? Here are{" "}
          <strong>2 alternatives</strong> tailored to different needs.
        </p>
      </div>

      <div className="alt-plans-grid">
        {plans.map(({ key, data, icon, color, colorBg, colorBorder, tagline }) => (
          <div
            key={key}
            className="alt-plan-card"
            style={{ borderColor: colorBorder, background: colorBg }}
          >
            {/* Header */}
            <div className="alt-plan-top">
              <div className="alt-plan-badge" style={{ background: color }}>
                {icon} {data.label.replace(/^[^ ]+ /, "")}
              </div>
              <div className="alt-plan-tagline">{tagline}</div>
            </div>

            {/* Description */}
            <p className="alt-plan-desc">{data.description}</p>

            {/* Key metrics */}
            <div className="alt-plan-metrics">
              <div className="alt-metric">
                <div className="alt-metric-val" style={{ color }}>
                  ₹{data.totalCost.toLocaleString("en-IN")}
                </div>
                <div className="alt-metric-key">Total Cost</div>
              </div>
              <div className="alt-metric">
                <div className="alt-metric-val" style={{ color }}>
                  {data.days} day{data.days > 1 ? "s" : ""}
                </div>
                <div className="alt-metric-key">Duration</div>
              </div>
              <div className="alt-metric">
                <div className="alt-metric-val" style={{ color }}>
                  {data.destinations.length} places
                </div>
                <div className="alt-metric-key">Destinations</div>
              </div>
              {data.savings > 0 && (
                <div className="alt-metric">
                  <div className="alt-metric-val alt-savings">
                    ₹{data.savings.toLocaleString("en-IN")}
                  </div>
                  <div className="alt-metric-key">You Save</div>
                </div>
              )}
            </div>

            {/* Highlights */}
            <ul className="alt-highlights">
              {data.highlights.map((h, i) => (
                <li key={i}>
                  <span className="alt-check" style={{ color }}>✓</span> {h}
                </li>
              ))}
            </ul>

            {/* Hotel info */}
            <div className="alt-hotel-row">
              <img src={data.hotel.img} alt={data.hotel.name} className="alt-hotel-img" />
              <div>
                <div className="alt-hotel-name">{data.hotel.name}</div>
                <div className="alt-hotel-meta">
                  <span className={`card-badge badge-${data.hotel.category}`}>
                    {data.hotel.category}
                  </span>
                  <span className="card-rating">★ {data.hotel.rating}</span>
                  <span style={{ fontSize: "0.78rem", color: "#555" }}>
                    ₹{data.hotel.price.toLocaleString("en-IN")}/night
                  </span>
                </div>
              </div>
            </div>

            {/* Destinations chips */}
            <div className="alt-dest-chips">
              {data.destinations.map(d => (
                <span key={d.id} className="chip" style={{ fontSize: "0.72rem" }}>
                  📍 {d.name}
                </span>
              ))}
            </div>

            {/* Toggle itinerary */}
            <button
              className="alt-expand-btn"
              style={{ color, borderColor: colorBorder }}
              onClick={() => setExpanded(expanded === key ? null : key)}
            >
              {expanded === key ? "▲ Hide Itinerary" : "▼ See Day-wise Plan"}
            </button>

            {/* Expanded itinerary */}
            {expanded === key && (
              <div className="alt-itinerary">
                {data.plan.map(({ day, places, timeline }) => (
                  <div key={day} className="alt-day-block">
                    <div className="alt-day-header" style={{ background: color }}>
                      Day {day}
                      {places.length > 0
                        ? ` — ${places.map(p => p.name).join(", ")}`
                        : " — Free day"}
                    </div>
                    {places.length === 0 ? (
                      <div className="rest-day">🌴 Free day — leisure time</div>
                    ) : (
                      <div className="alt-timeline">
                        {timeline
                          .filter(e => ["depart", "meal", "arrive", "visit", "return"].includes(e.type))
                          .map((event, idx) => (
                            <div key={idx} className="alt-tl-row">
                              <div className="alt-tl-time">{event.time}</div>
                              <div
                                className="alt-tl-dot"
                                style={{
                                  background: event.type === "meal" ? "#00B8A9"
                                    : event.type === "visit" ? color
                                    : "#ccc",
                                }}
                              />
                              <div className="alt-tl-text">
                                <div className="alt-tl-label">{event.label}</div>
                                {event.note && (
                                  <div className="alt-tl-note">{event.note}</div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
