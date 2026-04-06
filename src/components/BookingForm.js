import React from "react";

function Counter({ label, value, onChange, min = 0, max = 20 }) {
  return (
    <div className="counter-group">
      <div className="counter-label">{label}</div>
      <div className="counter">
        <button
          className="counter-btn"
          onClick={() => onChange(Math.max(min, value - 1))}
        >−</button>
        <span className="counter-val">{value}</span>
        <button
          className="counter-btn"
          onClick={() => onChange(Math.min(max, value + 1))}
        >+</button>
      </div>
    </div>
  );
}

export default function BookingForm({
  data, onChange, onSubmit,
  city, hotel, destinations,
}) {
  const totalCost = hotel.price * data.days;
  const isValid =
    data.name.trim() &&
    data.email.trim() &&
    data.phone.trim() &&
    data.days >= 1 &&
    destinations.length > 0;

  return (
    <div>
      <div className="hero">
        <div className="hero-glow" />
        <div className="hero-eyebrow">📋 Step 4 of 5</div>
        <h1>Enter Your<br /><em>Travel Details</em></h1>
        <p>A few details and we'll generate your optimised smart itinerary.</p>
        <div className="hero-progress">
          <div className="hero-progress-fill" style={{ width: "80%" }} />
        </div>
      </div>

      <div className="section">
        <div className="form-wrap">

          {/* Booking summary strip */}
          <div className="booking-summary-row">
            <div className="booking-summary-item">
              <div className="bs-key">City</div>
              <div className="bs-val">{city.emoji} {city.name}</div>
            </div>
            <div className="booking-summary-item">
              <div className="bs-key">Hotel</div>
              <div className="bs-val">{hotel.name}</div>
            </div>
            <div className="booking-summary-item">
              <div className="bs-key">Category</div>
              <div className="bs-val" style={{ textTransform: "capitalize" }}>{hotel.category}</div>
            </div>
            <div className="booking-summary-item">
              <div className="bs-key">Destinations</div>
              <div className="bs-val">{destinations.length} selected</div>
            </div>
          </div>

          {/* Group details */}
          <div className="form-card">
            <div className="form-block-title">👥 Group Details</div>
            <div className="form-row">
              <Counter
                label="Adults"
                value={data.adults}
                onChange={(v) => onChange("adults", v)}
                min={1}
              />
              <Counter
                label="Children"
                value={data.children}
                onChange={(v) => onChange("children", v)}
              />
              <Counter
                label="Days of Stay"
                value={data.days}
                onChange={(v) => onChange("days", v)}
                min={1}
                max={30}
              />
            </div>
          </div>

          {/* Personal info */}
          <div className="form-card">
            <div className="form-block-title">🙋 Personal Information</div>
            <div className="form-row-2">
              <div className="field-group">
                <label className="field-label">Full Name</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Your full name"
                  value={data.name}
                  onChange={(e) => onChange("name", e.target.value)}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => onChange("email", e.target.value)}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Phone Number</label>
                <input
                  type="tel"
                  className="field-input"
                  placeholder="+91 XXXXX XXXXX"
                  value={data.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Cost preview */}
          <div className="cost-preview">
            <div>
              <div className="cost-label">Estimated Hotel Cost</div>
              <div className="cost-amount">₹{totalCost.toLocaleString("en-IN")}</div>
              <div className="cost-detail">
                ₹{hotel.price.toLocaleString("en-IN")} × {data.days} night{data.days > 1 ? "s" : ""}
              </div>
            </div>
            <div className="cost-nights-pill">
              <div className="val">{data.days}</div>
              <div className="key">night{data.days > 1 ? "s" : ""}</div>
            </div>
          </div>

          {destinations.length === 0 && (
            <div className="alert alert-warn">
              ⚠ No destinations selected. Go back and pick at least one.
            </div>
          )}

          <button
            className="btn btn-primary btn-full"
            onClick={onSubmit}
            disabled={!isValid}
          >
            🗺 Generate Smart Itinerary
          </button>
        </div>
      </div>
    </div>
  );
}
