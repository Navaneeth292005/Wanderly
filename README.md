# Wanderly — Smart Travel Planner 🗺️

A simplified MakeMyTrip-inspired travel planning web app built with React JS.

## Features

- **City Selection** — 10 Indian cities
- **Hotel Listing** — 4+ hotels per category (Budget / Standard / Luxury) with filter + sort
- **Destination Selection** — 8–9 attractions per city with coordinates
- **Smart Itinerary Engine**:
  - Nearest-neighbour route optimisation
  - Distance-based place grouping per day
  - Automatic meal stops (Breakfast, Lunch, Snacks, Dinner)
  - Time scheduling from 9:00 AM with travel times
- **Booking Form** — Adults, children, days, personal details
- **Travel Plan** — Day-wise timeline cards with cost breakdown
- **localStorage persistence** — Selections saved across refreshes
- **Loading animation** before the plan is revealed
- **Reset button** to start over

## Project Structure

```
src/
├── App.js
├── index.js
├── components/
│   ├── Navbar.js
│   ├── CitySelector.js
│   ├── HotelList.js
│   ├── DestinationList.js
│   ├── BookingForm.js
│   └── TravelPlan.js
├── data/
│   ├── cities.js
│   ├── hotels.js          ← 4+ hotels per category per city
│   └── destinations.js    ← 8–9 destinations per city with coords
├── utils/
│   ├── distance.js        ← calcDistance, travelTime, nearestNeighborSort
│   └── itinerary.js       ← generateItinerary (smart day planner)
└── styles/
    └── main.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Smart Itinerary Logic

1. **Nearest-Neighbour Sort** — all selected destinations are sorted from the hotel outward, so you never backtrack
2. **Day Splitting** — places are split across days using round-robin, keeping the optimised order
3. **Time Scheduling** — each day starts at 9 AM; travel time and visit duration advance the clock
4. **Meal Stops** — automatically inserted at the right times:
   - 🍳 Breakfast (morning, first day)
   - 🍛 Lunch (12:00–14:30)
   - ☕ Snacks (15:30–17:00)
   - 🍽 Dinner (end of day)
