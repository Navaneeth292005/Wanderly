import React, { useEffect, useRef } from "react";

const DAY_COLORS = [
  "#F56C2D", "#00B8A9", "#8B5CF6",
  "#E11D48", "#059669", "#D97706", "#2563EB",
];

const CITY_CENTRE = {
  delhi:     [28.6139, 77.2090],
  mumbai:    [18.9750, 72.8258],
  chennai:   [13.0827, 80.2707],
  bangalore: [12.9716, 77.5946],
  jaipur:    [26.9124, 75.7873],
  goa:       [15.2993, 74.1240],
  agra:      [27.1767, 78.0081],
  varanasi:  [25.3176, 82.9739],
  kolkata:   [22.5726, 88.3639],
  udaipur:   [24.5854, 73.7125],
};

export default function MapView({ hotel, plan, cityId }) {
  const mapRef  = useRef(null);
  const mapInst = useRef(null);

  // Safe defaults
  const safePlan = Array.isArray(plan) ? plan : [];

  useEffect(() => {
    // Don't build map if no data yet
    if (!safePlan.some(d => d.places && d.places.length > 0) || !hotel || !mapRef.current) return;
    // Inject Leaflet CSS once
    if (!document.getElementById("leaflet-css")) {
      const link  = document.createElement("link");
      link.id     = "leaflet-css";
      link.rel    = "stylesheet";
      link.href   = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }

    function buildMap(L) {
      if (mapInst.current) { mapInst.current.remove(); mapInst.current = null; }

      const centre = CITY_CENTRE[cityId] || [20.59, 78.96];

      const map = L.map(mapRef.current, {
        center: centre, zoom: 12,
        scrollWheelZoom: true, zoomControl: true,
      });
      mapInst.current = map;

      // Free OpenStreetMap tiles — zero API key
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Hotel marker
      const hotelIcon = L.divIcon({
        className: "",
        html: `<div style="background:#0F1923;color:#F56C2D;width:38px;height:38px;
          border-radius:50%;display:flex;align-items:center;justify-content:center;
          font-size:1.15rem;border:3px solid #F56C2D;
          box-shadow:0 3px 10px rgba(0,0,0,0.4);">🏨</div>`,
        iconSize: [38, 38], iconAnchor: [19, 19],
      });
      L.marker(centre, { icon: hotelIcon })
        .addTo(map)
        .bindPopup(`<b>🏨 ${hotel.name}</b><br><span style="font-size:0.8rem;color:#888;">Your base</span>`);

      const allLL = [centre];

      safePlan.forEach(({ day, places }) => {
        if (!places || !places.length) return;
        const color = DAY_COLORS[(day - 1) % DAY_COLORS.length];

        // Route line: hotel → place1 → place2 → ... → hotel
        const routeLL = [
          centre,
          ...places.map(p => [p.coords.y, p.coords.x]),
          centre,
        ];

        // Draw route line FIRST (under markers)
        L.polyline(routeLL, {
          color,
          weight: 4,
          opacity: 0.85,
          dashArray: "8,5",
        }).addTo(map);

        // Draw markers ON TOP of lines
        places.forEach((place, idx) => {
          const ll = [place.coords.y, place.coords.x];
          allLL.push(ll);

          // Marker: solid circle in day color, white border, day number inside
          const numIcon = L.divIcon({
            className: "",
            html: `
              <div style="
                background:${color};
                color:#fff;
                width:34px;height:34px;
                border-radius:50%;
                display:flex;align-items:center;justify-content:center;
                font-size:0.8rem;font-weight:800;
                border:3px solid #fff;
                box-shadow:0 3px 10px rgba(0,0,0,0.35);
                font-family:Outfit,sans-serif;
                position:relative;
              ">
                ${idx + 1}
                <div style="
                  position:absolute;
                  top:-8px;right:-8px;
                  background:${color};
                  color:#fff;
                  font-size:0.52rem;
                  font-weight:700;
                  padding:1px 4px;
                  border-radius:4px;
                  border:1.5px solid #fff;
                  white-space:nowrap;
                ">D${day}</div>
              </div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
          });

          L.marker(ll, { icon: numIcon })
            .addTo(map)
            .bindPopup(`
              <div style="min-width:200px;font-family:Outfit,sans-serif;">
                <img src="${place.img}" alt="${place.name}"
                  style="width:100%;height:110px;object-fit:cover;border-radius:8px;margin-bottom:8px;display:block;"
                  onerror="this.style.display='none'" />
                <b style="font-size:0.92rem;display:block;margin-bottom:3px;">📍 ${place.name}</b>
                <span style="
                  font-size:0.72rem;font-weight:700;
                  background:${color};color:#fff;
                  padding:2px 8px;border-radius:999px;
                  display:inline-block;margin-bottom:6px;">
                  Day ${day} · Stop ${idx + 1}
                </span>
                <p style="font-size:0.72rem;color:#555;line-height:1.5;margin:0;">
                  ${place.desc.slice(0, 100)}…
                </p>
              </div>`);
        });
      });

      // Fit map to all markers
      if (allLL.length > 1) map.fitBounds(allLL, { padding: [50, 50] });
    }

    if (window.L) {
      buildMap(window.L);
    } else {
      const script   = document.createElement("script");
      script.src     = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.onload  = () => buildMap(window.L);
      document.head.appendChild(script);
    }

    return () => { if (mapInst.current) { mapInst.current.remove(); mapInst.current = null; } };
  }, [safePlan, cityId, hotel]);

  const daysWithPlaces = safePlan.filter((d) => d.places && d.places.length > 0);
  const totalPlaces    = safePlan.reduce((s, d) => s + (d.places ? d.places.length : 0), 0);

  // Don't render map UI until itinerary is ready
  if (totalPlaces === 0 || !hotel) return null;

  return (
    <div className="map-section">
      <div className="map-header">
        <div>
          <h3>🗺️ Interactive Route Map</h3>
          <p className="map-sub">
            Click any pin for details. Dashed lines show your optimised day-wise route.
          </p>
        </div>
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-hotel">🏨</span>
            <span>Hotel</span>
          </div>
          {daysWithPlaces.map(({ day }) => (
            <div key={day} className="legend-item">
              <span className="legend-day-dot"
                style={{ background: DAY_COLORS[(day - 1) % DAY_COLORS.length] }}>
                {day}
              </span>
              <span>Day {day}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={mapRef} className="map-container" />

      <div className="map-footer">
        <span>🌍 Powered by OpenStreetMap · No API key required</span>
        <span>{totalPlaces} destination{totalPlaces !== 1 ? "s" : ""} plotted</span>
      </div>
    </div>
  );
}
