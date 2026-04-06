import React, { useEffect, useState } from "react";
import { generateItinerary, generateAlternatePlans } from "../utils/itinerary";
import MapView from "./MapView";
import AlternatePlans from "./AlternatePlans";
import { hotels as allHotels } from "../data/hotels";

// ─── localStorage key for saved trips ────────────────────────────────────────
const SAVED_TRIPS_KEY = "wanderly_saved_trips";

function loadSavedTrips() {
  try {
    const raw = localStorage.getItem(SAVED_TRIPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function persistSavedTrips(trips) {
  try { localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(trips)); } catch {}
}

export default function TravelPlan({ city, hotel, destinations, booking, onReset }) {
  const [loading, setLoading]             = useState(true);
  const [plan, setPlan]                   = useState([]);
  const [alternatePlans, setAlternatePlans] = useState(null);
  const [savedTrips, setSavedTrips]       = useState(loadSavedTrips);
  const [saveToast, setSaveToast]         = useState(false);
  const [showCompare, setShowCompare]     = useState(false);

  // Inject print styles
  useEffect(() => {
    const id = "wanderly-print-style";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = `
        @media print {
          .no-print { display: none !important; }
          .navbar    { display: none !important; }
          .sticky-bar{ display: none !important; }
          .hero      { padding: 1rem !important; }
          .print-only{ display: block !important; }
          body { background: #fff !important; }
          .plan-banner {
            background: #0F1923 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .day-block { page-break-inside: avoid; }
          .tl-card   { break-inside: avoid; }
        }
        .print-only { display: none; }
      `;
      document.head.appendChild(tag);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  // Generate itinerary with loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const itinerary = generateItinerary(destinations, booking.days, city.id);
      setPlan(itinerary);

      // Generate alternate plans
      const alts = generateAlternatePlans({
        destinations,
        hotel,
        booking,
        city,
        allHotels,
      });
      setAlternatePlans(alts);

      setLoading(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  const totalCost = hotel.price * booking.days;
  const perPerson = Math.round(
    totalCost / Math.max(1, booking.adults + booking.children * 0.5)
  );

  // ─── Save trip ──────────────────────────────────────────────────────────────
  function saveTrip() {
    const trip = {
      id: Date.now(),
      city, hotel, destinations, booking,
      totalCost, perPerson, plan,
      savedAt: new Date().toLocaleString("en-IN"),
    };
    const updated = [...savedTrips, trip].slice(-3); // max 3 trips
    setSavedTrips(updated);
    persistSavedTrips(updated);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  }

  function deleteTrip(id) {
    const updated = savedTrips.filter((t) => t.id !== id);
    setSavedTrips(updated);
    persistSavedTrips(updated);
  }

  // ─── Loading screen ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-plane">✈️</div>
        <div className="loading-bar-wrap">
          <div className="loading-bar" />
        </div>
        <div className="loading-text">Crafting your perfect journey…</div>
      </div>
    );
  }

  // ─── COMPARE VIEW ───────────────────────────────────────────────────────────
  if (showCompare) {
    const minCost = Math.min(...savedTrips.map((t) => t.totalCost));

    return (
      <div>
        <div className="hero no-print">
          <div className="hero-glow" />
          <div className="hero-eyebrow">⚖️ Trip Comparison</div>
          <h1>Compare Your<br /><em>Saved Trips</em></h1>
          <p>
            {savedTrips.length} saved trip{savedTrips.length !== 1 ? "s" : ""} ready to compare side by side.
          </p>
        </div>

        <div className="section">
          <button
            className="btn btn-outline no-print"
            style={{ marginBottom: "1.5rem" }}
            onClick={() => setShowCompare(false)}
          >
            ← Back to Current Plan
          </button>

          {savedTrips.length === 0 ? (
            <div className="empty-state">
              <div className="e-icon">📋</div>
              <p>No saved trips yet. Go back and click "Save Trip" to save the current plan first.</p>
            </div>
          ) : (
            <>
              {/* ── Comparison Table ── */}
              <div className="compare-table-wrap">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th className="compare-th-label">Detail</th>
                      {savedTrips.map((t) => (
                        <th key={t.id} className="compare-th-trip">
                          <span className="compare-city-emoji">{t.city.emoji}</span>
                          <span>{t.city.name}</span>
                          <div className="compare-saved-at">{t.savedAt}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Hotel */}
                    <tr>
                      <td className="compare-label">🏨 Hotel</td>
                      {savedTrips.map((t) => (
                        <td key={t.id} className="compare-cell">
                          <div className="compare-val">{t.hotel.name}</div>
                          <span className={`card-badge badge-${t.hotel.category}`}>{t.hotel.category}</span>
                        </td>
                      ))}
                    </tr>
                    {/* Rating */}
                    <tr className="compare-row-alt">
                      <td className="compare-label">⭐ Rating</td>
                      {savedTrips.map((t) => {
                        const best = Math.max(...savedTrips.map((x) => x.hotel.rating));
                        return (
                          <td key={t.id} className="compare-cell">
                            <div className={`compare-val ${t.hotel.rating === best ? "compare-best-green" : ""}`}>
                              ★ {t.hotel.rating}
                              {t.hotel.rating === best && <span className="best-badge best-badge-green">Best</span>}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                    {/* Price per night */}
                    <tr>
                      <td className="compare-label">💰 Per Night</td>
                      {savedTrips.map((t) => {
                        const cheapest = Math.min(...savedTrips.map((x) => x.hotel.price));
                        return (
                          <td key={t.id} className="compare-cell">
                            <div className={`compare-val ${t.hotel.price === cheapest ? "compare-best-green" : ""}`}>
                              ₹{t.hotel.price.toLocaleString("en-IN")}
                              {t.hotel.price === cheapest && <span className="best-badge best-badge-green">Cheapest</span>}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                    {/* Days */}
                    <tr className="compare-row-alt">
                      <td className="compare-label">🗓 Days</td>
                      {savedTrips.map((t) => (
                        <td key={t.id} className="compare-cell">
                          <div className="compare-val">{t.booking.days} days</div>
                        </td>
                      ))}
                    </tr>
                    {/* Travellers */}
                    <tr>
                      <td className="compare-label">👥 Travellers</td>
                      {savedTrips.map((t) => (
                        <td key={t.id} className="compare-cell">
                          <div className="compare-val">
                            {t.booking.adults} Adult{t.booking.adults > 1 ? "s" : ""}
                            {t.booking.children > 0 && ` + ${t.booking.children} Child${t.booking.children > 1 ? "ren" : ""}`}
                          </div>
                        </td>
                      ))}
                    </tr>
                    {/* Destinations */}
                    <tr className="compare-row-alt">
                      <td className="compare-label">📍 Places</td>
                      {savedTrips.map((t) => (
                        <td key={t.id} className="compare-cell">
                          <div className="compare-val">{t.destinations.length} destinations</div>
                          <div className="compare-dest-list">
                            {t.destinations.slice(0, 3).map((d) => (
                              <span key={d.id} className="chip" style={{ fontSize: "0.68rem", padding: "2px 8px", marginTop: 3 }}>
                                {d.name}
                              </span>
                            ))}
                            {t.destinations.length > 3 && (
                              <span className="chip" style={{ fontSize: "0.68rem", padding: "2px 8px" }}>
                                +{t.destinations.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    {/* Total cost */}
                    <tr className="compare-total-row">
                      <td className="compare-label">💳 Total Cost</td>
                      {savedTrips.map((t) => (
                        <td key={t.id} className="compare-cell">
                          <div className={`compare-val compare-cost ${t.totalCost === minCost ? "compare-best" : ""}`}>
                            ₹{t.totalCost.toLocaleString("en-IN")}
                            {t.totalCost === minCost && (
                              <span className="best-badge">Best Value 🏆</span>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    {/* Per person */}
                    <tr>
                      <td className="compare-label">👤 Per Person</td>
                      {savedTrips.map((t) => (
                        <td key={t.id} className="compare-cell">
                          <div className="compare-val">₹{t.perPerson.toLocaleString("en-IN")}</div>
                        </td>
                      ))}
                    </tr>
                    {/* Delete */}
                    <tr className="no-print">
                      <td className="compare-label">🗑 Remove</td>
                      {savedTrips.map((t) => (
                        <td key={t.id} className="compare-cell">
                          <button
                            className="btn btn-outline"
                            style={{ fontSize: "0.75rem", padding: "5px 12px" }}
                            onClick={() => deleteTrip(t.id)}
                          >
                            Delete
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ── Side-by-side Itinerary ── */}
              <div style={{ marginTop: "2.5rem" }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  marginBottom: "1.25rem"
                }}>
                  🗓 Day-wise Comparison
                </h3>
                <div
                  className="compare-itinerary-grid"
                  style={{ gridTemplateColumns: `repeat(${savedTrips.length}, 1fr)` }}
                >
                  {savedTrips.map((t) => (
                    <div key={t.id} className="compare-itinerary-col">
                      <div className="compare-col-header">
                        {t.city.emoji} {t.city.name}
                        <div style={{ fontSize: "0.75rem", fontWeight: 400, opacity: 0.7, marginTop: 2 }}>
                          {t.hotel.name}
                        </div>
                      </div>
                      {t.plan.map(({ day, places }) => (
                        <div key={day} className="compare-day">
                          <div
                            className="day-pill"
                            style={{ display: "inline-block", marginBottom: 8 }}
                          >
                            Day {day}
                          </div>
                          {places.length === 0 ? (
                            <div style={{ fontSize: "0.8rem", color: "var(--ink-muted)" }}>🌴 Free day</div>
                          ) : (
                            places.map((p) => (
                              <div key={p.id} className="compare-place">
                                <img src={p.img} alt={p.name} className="compare-place-img" />
                                <span>{p.name}</span>
                              </div>
                            ))
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Print comparison */}
              <div className="no-print" style={{ textAlign: "center", marginTop: "2rem", paddingBottom: "5rem" }}>
                <button className="btn btn-primary" onClick={() => window.print()}>
                  🖨️ Print Comparison
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─── MAIN PLAN VIEW ─────────────────────────────────────────────────────────
  return (
    <div id="print-area">

      {/* Print-only header */}
      <div className="print-only" style={{ padding: "1.5rem 2rem 0", borderBottom: "2px solid #eee", marginBottom: "1rem" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 700 }}>
          wanderly <span style={{ color: "#F56C2D" }}>✈</span>
        </div>
        <div style={{ fontSize: "0.85rem", color: "#666", marginTop: 4 }}>
          Trip Itinerary for {booking.name} · Printed on {new Date().toLocaleDateString("en-IN")}
        </div>
      </div>

      <div className="hero no-print">
        <div className="hero-glow" />
        <div className="hero-eyebrow">🎉 Step 5 of 5 — Your Plan is Ready</div>
        <h1>
          <em>Bon Voyage,</em><br />
          {booking.name.split(" ")[0]}!
        </h1>
        <p>Your smart, distance-optimised itinerary for {city.name} is below.</p>
        <div className="hero-progress">
          <div className="hero-progress-fill" style={{ width: "100%" }} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="section no-print" style={{ paddingBottom: 0, paddingTop: "1.5rem" }}>
        <div className="plan-action-row">
          <button className="btn btn-primary" onClick={() => window.print()}>
            🖨️ Print / Save as PDF
          </button>
          <button className="btn btn-outline" onClick={saveTrip}>
            💾 Save Trip for Comparison
          </button>
          {savedTrips.length > 0 && (
            <button className="btn btn-outline" onClick={() => setShowCompare(true)}>
              ⚖️ Compare Trips
              <span className="count-badge">{savedTrips.length}</span>
            </button>
          )}
        </div>

        {saveToast && (
          <div className="save-toast">
            ✅ Trip saved! Click "Compare Trips" to see it side by side with others.
          </div>
        )}
      </div>

      <div className="section">

        {/* Banner */}
        <div className="plan-banner">
          <h2>{city.name} Getaway ✈️</h2>
          <p>
            {booking.days} day{booking.days > 1 ? "s" : ""} ·{" "}
            {booking.adults} adult{booking.adults > 1 ? "s" : ""}
            {booking.children > 0 ? ` · ${booking.children} child${booking.children > 1 ? "ren" : ""}` : ""} ·{" "}
            {destinations.length} destination{destinations.length > 1 ? "s" : ""}
          </p>
          <div className="plan-kpis">
            <div className="kpi-item">
              <div className="kpi-key">Total Hotel Cost</div>
              <div className="kpi-val">₹{totalCost.toLocaleString("en-IN")}</div>
            </div>
            <div className="kpi-item">
              <div className="kpi-key">Per Person (est.)</div>
              <div className="kpi-val">₹{perPerson.toLocaleString("en-IN")}</div>
            </div>
            <div className="kpi-item">
              <div className="kpi-key">Hotel</div>
              <div className="kpi-val" style={{ fontSize: "0.9rem" }}>{hotel.name}</div>
            </div>
            <div className="kpi-item">
              <div className="kpi-key">Traveller</div>
              <div className="kpi-val" style={{ fontSize: "0.9rem" }}>{booking.name}</div>
            </div>
          </div>
        </div>

        {/* Hotel + Cost */}
        <div className="plan-2col">
          <div className="info-card">
            <h3>🏨 Your Hotel</h3>
            <img src={hotel.img} alt={hotel.name} className="hotel-thumb" />
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{hotel.name}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--ink-muted)", marginBottom: 8 }}>
              {hotel.desc}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className={`card-badge badge-${hotel.category}`}>{hotel.category}</span>
              <span className="card-rating">★ {hotel.rating}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>💰 Cost Breakdown</h3>
            <div className="cost-row">
              <span>Hotel per night</span>
              <span>₹{hotel.price.toLocaleString("en-IN")}</span>
            </div>
            <div className="cost-row">
              <span>Number of nights</span>
              <span>× {booking.days}</span>
            </div>
            <div className="cost-row">
              <span>Subtotal (hotel)</span>
              <span>₹{totalCost.toLocaleString("en-IN")}</span>
            </div>
            <div className="cost-row">
              <span>Travellers</span>
              <span>{booking.adults}A + {booking.children}C</span>
            </div>
            <div className="cost-row total">
              <span>Estimated Total</span>
              <span>₹{totalCost.toLocaleString("en-IN")}</span>
            </div>
            <div style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--ink-muted)" }}>
              Contact: {booking.email} · {booking.phone}
            </div>
          </div>
        </div>

        {/* Destinations */}
        <div className="info-card" style={{ marginBottom: "1.5rem" }}>
          <h3>📍 Selected Destinations ({destinations.length})</h3>
          <div className="chip-row">
            {destinations.map((d) => (
              <span key={d.id} className="chip">📍 {d.name}</span>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: "0.78rem", color: "var(--ink-muted)" }}>
            ✨ Route optimised using nearest-neighbour algorithm — nearby places are grouped together.
          </div>
        </div>

        {/* Interactive Map */}
        <MapView
          hotel={hotel}
          plan={plan}
          cityId={city.id}
        />

        {/* Day-wise itinerary */}
        <div className="itinerary-section">
          <h3>🗓 Day-wise Smart Itinerary</h3>
          {plan.map(({ day, places, timeline }) => (
            <div key={day} className="day-block">
              <div className="day-header">
                <span className="day-pill">Day {day}</span>
                <span className="day-sub">
                  {places.length > 0
                    ? `${places.length} attraction${places.length > 1 ? "s" : ""} — ${places.map((p) => p.name).join(", ")}`
                    : "Free day — rest & leisure"}
                </span>
              </div>

              {places.length === 0 ? (
                <div className="rest-day">
                  🌴 Free day — explore at your own pace, relax at the hotel, or shop locally.
                </div>
              ) : (
                <div className="timeline">
                  {timeline.map((event, idx) => (
                    <div key={idx} className="tl-item">
                      <div className={`tl-dot ${event.type}`} />
                      <div className={`tl-card ${
                        event.type === "meal" ? "meal"
                        : event.type === "depart" || event.type === "return" ? event.type
                        : event.type === "buffer" ? "buffer"
                        : ""
                      }`}>
                        {event.img && event.type !== "meal" && event.type !== "depart" && event.type !== "return" && event.type !== "buffer" && (
                          <img src={event.img} alt="" className="tl-thumb" />
                        )}
                        <div className="tl-content">
                          <div className="tl-time">{event.time}</div>
                          <div className="tl-label">{event.label}</div>
                          <div className="tl-note">{event.note}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Alternate Plans Suggestion Box */}
        <AlternatePlans
          alternatePlans={alternatePlans}
          originalCost={totalCost}
          booking={booking}
        />

        {/* Bottom actions */}
        <div className="no-print" style={{ textAlign: "center", paddingTop: "1.5rem", paddingBottom: "4rem" }}>
          <button className="btn btn-outline" onClick={onReset}>
            🔄 Plan a New Trip
          </button>
        </div>

        {/* Print footer */}
        <div className="print-only" style={{ borderTop: "1px solid #eee", paddingTop: "1rem", marginTop: "2rem", fontSize: "0.75rem", color: "#999", textAlign: "center" }}>
          Generated by Wanderly — Smart Travel Planner
        </div>
      </div>
    </div>
  );
}
