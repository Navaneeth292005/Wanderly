import React, { useState } from "react";
import { hotels } from "../data/hotels";

const CATEGORIES = ["all", "budget", "standard", "luxury"];

function Stars({ rating }) {
  return (
    <span className="card-rating">
      ★ {rating}
    </span>
  );
}

export default function HotelList({ city, selected, onSelect }) {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  const cityHotels = hotels[city.id] || [];

  let list = filter === "all" ? cityHotels : cityHotels.filter((h) => h.category === filter);
  if (sort === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "rating")     list = [...list].sort((a, b) => b.rating - a.rating);

  return (
    <div>
      <div className="hero">
        <div className="hero-glow" />
        <div className="hero-eyebrow">{city.emoji} Step 2 of 5 · {city.name}</div>
        <h1>Choose Your<br /><em>Perfect Stay</em></h1>
        <p>Pick a hotel that matches your style and budget.</p>
        <div className="hero-progress">
          <div className="hero-progress-fill" style={{ width: "40%" }} />
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Hotels in {city.name}</h2>
          <p>{cityHotels.length} options across all categories</p>
        </div>

        {/* Controls */}
        <div className="controls-row">
          <div className="filter-tabs">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`filter-tab ${filter === c ? "active" : ""}`}
                onClick={() => setFilter(c)}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated First</option>
          </select>
        </div>

        {list.length === 0 && (
          <div className="empty-state">
            <div className="e-icon">🏨</div>
            <p>No hotels found in this category.</p>
          </div>
        )}

        <div className="card-grid">
          {list.map((hotel) => (
            <div
              key={hotel.id}
              className={`hotel-card ${selected?.id === hotel.id ? "selected" : ""}`}
              onClick={() => onSelect(hotel)}
            >
              <div className="card-img-wrap">
                <img src={hotel.img} alt={hotel.name} className="card-img" loading="lazy" />
              </div>
              <div className="card-body">
                <span className={`card-badge badge-${hotel.category}`}>{hotel.category}</span>
                <div className="card-name">{hotel.name}</div>
                <div className="card-desc">{hotel.desc}</div>
                <div className="card-footer">
                  <div className="card-price">
                    ₹{hotel.price.toLocaleString("en-IN")}<sub> / night</sub>
                  </div>
                  <Stars rating={hotel.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
