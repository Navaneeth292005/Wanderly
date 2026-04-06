import React, { useState, useEffect } from "react";
import "./styles/main.css";

import Navbar         from "./components/Navbar";
import CitySelector   from "./components/CitySelector";
import HotelList      from "./components/HotelList";
import DestinationList from "./components/DestinationList";
import BookingForm    from "./components/BookingForm";
import TravelPlan     from "./components/TravelPlan";

// ─── localStorage helpers ────────────────────────────────────────────────────
const LS_KEY = "wanderly_state";

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState(state) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch {}
}

function clearState() {
  try { localStorage.removeItem(LS_KEY); } catch {}
}

// ─── Default booking state ───────────────────────────────────────────────────
const DEFAULT_BOOKING = {
  adults: 2, children: 0, days: 3,
  name: "", email: "", phone: "",
};

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  // Rehydrate from localStorage on first mount
  const saved = loadState();

  const [step,         setStep]         = useState(saved?.step         ?? 1);
  const [city,         setCity]         = useState(saved?.city         ?? null);
  const [hotel,        setHotel]        = useState(saved?.hotel        ?? null);
  const [destinations, setDestinations] = useState(saved?.destinations ?? []);
  const [booking,      setBooking]      = useState(saved?.booking      ?? DEFAULT_BOOKING);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    saveState({ step, city, hotel, destinations, booking });
  }, [step, city, hotel, destinations, booking]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  function selectCity(c) {
    setCity(c);
    setHotel(null);
    setDestinations([]);
  }

  function toggleDestination(dest) {
    setDestinations((prev) =>
      prev.some((d) => d.id === dest.id)
        ? prev.filter((d) => d.id !== dest.id)
        : [...prev, dest]
    );
  }

  function updateBooking(key, val) {
    setBooking((prev) => ({ ...prev, [key]: val }));
  }

  function reset() {
    clearState();
    setStep(1);
    setCity(null);
    setHotel(null);
    setDestinations([]);
    setBooking(DEFAULT_BOOKING);
  }

  // ─── Sticky bottom navigation bar ──────────────────────────────────────────
  function canProceed() {
    if (step === 1) return !!city;
    if (step === 2) return !!hotel;
    if (step === 3) return destinations.length > 0;
    return false;
  }

  function summaryText() {
    const parts = [];
    if (city) parts.push(`${city.emoji} ${city.name}`);
    if (hotel) parts.push(hotel.name);
    if (destinations.length) parts.push(`${destinations.length} places`);
    return parts.join(" · ") || "Select a city to begin";
  }

  const showBar = step < 5;

  return (
    <>
      <Navbar step={step} setStep={setStep} city={city} />

      {step === 1 && (
        <CitySelector selected={city} onSelect={selectCity} />
      )}

      {step === 2 && city && (
        <HotelList city={city} selected={hotel} onSelect={setHotel} />
      )}

      {step === 3 && city && (
        <DestinationList
          city={city}
          selected={destinations}
          onToggle={toggleDestination}
        />
      )}

      {step === 4 && city && hotel && (
        <BookingForm
          data={booking}
          onChange={updateBooking}
          onSubmit={() => setStep(5)}
          city={city}
          hotel={hotel}
          destinations={destinations}
        />
      )}

      {step === 5 && city && hotel && (
        <TravelPlan
          city={city}
          hotel={hotel}
          destinations={destinations}
          booking={booking}
          onReset={reset}
        />
      )}

      {/* Sticky Bottom Bar */}
      {showBar && (
        <div className="sticky-bar">
          <div className="sticky-info">
            <strong>{summaryText()}</strong>
          </div>
          <div className="sticky-actions">
            {step > 1 && (
              <button className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>
                ← Back
              </button>
            )}
            {step < 4 && (
              <button
                className="btn btn-primary"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
              >
                {step === 3 ? "Enter Details →" : "Continue →"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
