import { nearestNeighborSort, travelTime } from "./distance";

// ─── MEAL TEMPLATES ──────────────────────────────────────────────────────────
const MEALS = {
  breakfast: { type: "meal", label: "🍳 Breakfast",      note: "Enjoy a hearty local breakfast at the hotel or nearby café", duration: 45 },
  lunch:     { type: "meal", label: "🍛 Lunch",          note: "Sit-down meal at a local restaurant · ~60 min",              duration: 60 },
  snacks:    { type: "meal", label: "☕ Evening Snacks", note: "Chai, snacks & short rest · ~30 min",                        duration: 30 },
  dinner:    { type: "meal", label: "🍽 Dinner",         note: "Dinner at hotel or nearby restaurant · ~60 min",             duration: 60 },
};

// ─── BUFFER TIMES (minutes) ───────────────────────────────────────────────────
const BUFFER = {
  TICKET_QUEUE:   20,  // queue at entry / ticket counter
  CROWD_DELAY:    15,  // peak hour crowd buffer
  PHOTO_TIME:     15,  // photography & exploration buffer
  TRANSITION:     10,  // getting in/out of vehicle, parking etc.
  HOTEL_CHECKOUT: 20,  // morning preparation + getting ready
};

// Total per-place overhead added on top of visitDuration
const PER_PLACE_BUFFER = BUFFER.TICKET_QUEUE + BUFFER.CROWD_DELAY + BUFFER.PHOTO_TIME + BUFFER.TRANSITION; // 60 min

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function toMinutes(h, m = 0) { return h * 60 + m; }

function formatTime(totalMinutes) {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${ampm}`;
}

function formatDuration(mins) {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

// City centres used as hotel proxy for distance calculation
const CITY_CENTRE = {
  delhi:     { x: 77.2090, y: 28.6139 },
  mumbai:    { x: 72.8347, y: 18.9220 },
  chennai:   { x: 80.2707, y: 13.0827 },
  bangalore: { x: 77.5946, y: 12.9716 },
  jaipur:    { x: 75.8235, y: 26.9124 },
  goa:       { x: 73.8278, y: 15.4909 },
  agra:      { x: 78.0081, y: 27.1767 },
  varanasi:  { x: 83.0107, y: 25.3176 },
  kolkata:   { x: 88.3517, y: 22.5726 },
  udaipur:   { x: 73.6817, y: 24.5854 },
};

// ─── SEQUENTIAL CHUNK SPLIT ───────────────────────────────────────────────────
// Preserves nearest-neighbor order — nearby places stay on same day
function sequentialChunks(arr, numDays) {
  const total = arr.length;
  const days  = [];
  const base  = Math.floor(total / numDays);
  const extra = total % numDays;
  let idx = 0;
  for (let i = 0; i < numDays; i++) {
    const size = base + (i < extra ? 1 : 0);
    days.push(arr.slice(idx, idx + size));
    idx += size;
  }
  return days;
}

// ─── REALISTIC DAY TIMELINE ───────────────────────────────────────────────────
/**
 * Builds a full time-scheduled timeline for a single day.
 *
 * Realistic time model:
 *   9:00 AM  → Leave hotel (+ 20 min morning prep buffer)
 *   9:20     → Depart
 *   + travel time (road speed 30 km/h city, 60 km/h highway)
 *   + arrive
 *   + 20 min ticket queue / entry
 *   + visitDuration (actual sightseeing)
 *   + 15 min crowd/delay buffer
 *   + 15 min photos & wrap-up
 *   + 10 min transition (parking, getting in vehicle)
 *   = realistic total per place ≈ visitDuration + 60 min
 *   Lunch inserted when clock hits 12:30–14:30
 *   Snacks inserted when clock hits 15:30–17:30
 *   Dinner after return
 */
function buildDayTimeline(places, hotelCoords, isFirstDay) {
  const events = [];
  let cursor = toMinutes(9, 0);

  // Morning prep buffer
  events.push({
    type: "depart",
    label: "🏨 Leave Hotel",
    note: `Morning preparation & checkout · ~${BUFFER.HOTEL_CHECKOUT} min buffer included`,
    time: formatTime(cursor),
    duration: 0,
  });
  cursor += BUFFER.HOTEL_CHECKOUT; // 20 min morning prep

  // Breakfast (every day, not just first)
  events.push({ type: "meal", ...MEALS.breakfast, time: formatTime(cursor) });
  cursor += MEALS.breakfast.duration;

  let lastCoords = hotelCoords;
  let hadLunch   = false;
  let hadSnacks  = false;

  places.forEach((place) => {
    // ── Travel to place ──────────────────────────────────
    const travelMins = travelTime(lastCoords, place.coords);
    cursor += travelMins;

    // ── Lunch window check ───────────────────────────────
    if (!hadLunch && cursor >= toMinutes(12, 30) && cursor <= toMinutes(14, 30)) {
      events.push({ type: "meal", ...MEALS.lunch, time: formatTime(cursor) });
      cursor += MEALS.lunch.duration;
      hadLunch = true;
    }

    // ── Arrive ───────────────────────────────────────────
    events.push({
      type: "arrive",
      label: `📍 Reach ${place.name}`,
      note: `Travel time: ~${formatDuration(travelMins)} · ${place.desc.slice(0, 60)}…`,
      time: formatTime(cursor),
      duration: 0,
      img: place.img,
    });

    // ── Ticket queue / entry buffer ───────────────────────
    cursor += BUFFER.TICKET_QUEUE;
    events.push({
      type: "buffer",
      label: `🎫 Entry & Queue — ${place.name}`,
      note: `Ticket counter, security check, entry queue · ~${BUFFER.TICKET_QUEUE} min`,
      time: formatTime(cursor),
      duration: 0,
    });

    // ── Main visit ───────────────────────────────────────
    cursor += 5; // small gap after entry
    events.push({
      type: "visit",
      label: `🎯 Explore ${place.name}`,
      note: `Sightseeing, audio guides, exploration · ~${formatDuration(place.visitDuration)}`,
      time: formatTime(cursor),
      duration: place.visitDuration,
      img: place.img,
    });
    cursor += place.visitDuration;

    // ── Photography & wrap-up buffer ─────────────────────
    events.push({
      type: "buffer",
      label: `📸 Photos & Wrap-up`,
      note: `Photography, souvenir shopping, final look · ~${BUFFER.PHOTO_TIME + BUFFER.CROWD_DELAY} min`,
      time: formatTime(cursor),
      duration: 0,
    });
    cursor += BUFFER.PHOTO_TIME + BUFFER.CROWD_DELAY; // 30 min

    // ── Transition buffer ─────────────────────────────────
    cursor += BUFFER.TRANSITION; // 10 min to get back to vehicle

    // ── Snacks window check ───────────────────────────────
    if (!hadSnacks && cursor >= toMinutes(15, 30) && cursor <= toMinutes(17, 30)) {
      events.push({ type: "meal", ...MEALS.snacks, time: formatTime(cursor) });
      cursor += MEALS.snacks.duration;
      hadSnacks = true;
    }

    lastCoords = place.coords;
  });

  // Fallback lunch if never triggered
  if (!hadLunch && places.length > 0) {
    events.push({ type: "meal", ...MEALS.lunch, time: formatTime(cursor) });
    cursor += MEALS.lunch.duration;
  }

  // Return travel to hotel
  const returnMins = travelTime(lastCoords, hotelCoords);
  cursor += returnMins;

  events.push({
    type: "return",
    label: "🚗 Heading Back to Hotel",
    note: `Return journey · ~${formatDuration(returnMins)}`,
    time: formatTime(cursor),
    duration: 0,
  });

  // Freshen up buffer at hotel
  cursor += 30;

  // Dinner
  events.push({ type: "meal", ...MEALS.dinner, time: formatTime(cursor) });
  cursor += MEALS.dinner.duration;

  events.push({
    type: "return",
    label: "🏨 Rest at Hotel",
    note: "Check in, relax and rest up for tomorrow",
    time: formatTime(cursor),
    duration: 0,
  });

  return events;
}

// ─── MAIN ITINERARY GENERATOR ─────────────────────────────────────────────────
/**
 * @param {Array}  selectedDests
 * @param {number} numDays
 * @param {string} cityId
 * @returns {Array} days: [{ day, places, timeline }]
 */
export function generateItinerary(selectedDests, numDays, cityId) {
  if (!selectedDests || selectedDests.length === 0) return [];

  const hotelCoords  = CITY_CENTRE[cityId] || CITY_CENTRE.delhi;
  const effectiveDays = Math.min(numDays, selectedDests.length);

  const optimized  = nearestNeighborSort(selectedDests, hotelCoords);
  const dayChunks  = sequentialChunks(optimized, effectiveDays);

  while (dayChunks.length < numDays) dayChunks.push([]);

  return dayChunks.map((places, i) => ({
    day: i + 1,
    places,
    timeline: buildDayTimeline(places, hotelCoords, i === 0),
  }));
}

// ─── ALTERNATE PLAN GENERATOR ─────────────────────────────────────────────────
/**
 * Generates 2 alternate trip suggestions:
 *
 * 1. BUDGET PLAN  — same destinations, cheaper hotel from same city data
 *    · Picks lowest-price hotel in budget category
 *    · Recommends skipping paid attractions (entry-fee places)
 *    · Reduces days if possible
 *
 * 2. EXPRESS PLAN — same hotel, fewer destinations, fewer days
 *    · Picks only the top N most popular / quickest places
 *    · Targets finishing in half the original days (min 1)
 *    · Good for someone short on time
 *
 * @param {Object}  params
 * @param {Array}   params.destinations   — selected destinations
 * @param {Object}  params.hotel          — selected hotel
 * @param {Object}  params.booking        — booking details
 * @param {Object}  params.city           — selected city
 * @param {Array}   params.allHotels      — full hotel list for the city
 * @returns {{ budget: Object, express: Object }}
 */
export function generateAlternatePlans({ destinations, hotel, booking, city, allHotels }) {
  const hotelCoords = CITY_CENTRE[city.id] || CITY_CENTRE.delhi;

  // ── 1. BUDGET PLAN ──────────────────────────────────────────────────────────
  // Find cheapest budget hotel in the city
  const budgetHotels = (allHotels[city.id] || [])
    .filter(h => h.category === "budget")
    .sort((a, b) => a.price - b.price);
  const budgetHotel = budgetHotels[0] || hotel;

  // Pick destinations with shorter visit durations (quicker = cheaper on transport)
  const budgetDests = [...destinations]
    .sort((a, b) => a.visitDuration - b.visitDuration)
    .slice(0, Math.max(1, Math.ceil(destinations.length * 0.7))); // keep top 70% quickest

  // Reduce days if possible
  const budgetDays = Math.max(1, Math.floor(booking.days * 0.8));
  const budgetPlan = generateItinerary(budgetDests, budgetDays, city.id);
  const budgetCost = budgetHotel.price * budgetDays;
  const originalCost = hotel.price * booking.days;
  const savings = originalCost - budgetCost;

  // ── 2. EXPRESS PLAN ─────────────────────────────────────────────────────────
  // Take only the closest cluster of destinations (fast to cover)
  const expressDays = Math.max(1, Math.ceil(booking.days / 2));
  const expressCount = Math.min(destinations.length, expressDays * 2); // max 2 places/day
  // Sort by nearest-neighbor and take the first N (closest cluster to hotel)
  const expressOptimized = nearestNeighborSort(destinations, hotelCoords);
  const expressDests = expressOptimized.slice(0, expressCount);
  const expressPlan  = generateItinerary(expressDests, expressDays, city.id);
  const expressCost  = hotel.price * expressDays;

  return {
    budget: {
      label:       "💰 Budget-Friendly Plan",
      description: `Same city, cheaper hotel, fewer days — saves ₹${savings.toLocaleString("en-IN")} vs your current plan.`,
      hotel:       budgetHotel,
      destinations: budgetDests,
      days:        budgetDays,
      totalCost:   budgetCost,
      savings,
      plan:        budgetPlan,
      highlights: [
        `Cheaper hotel saves ₹${(hotel.price - budgetHotel.price).toLocaleString("en-IN")}/night`,
        `${budgetDays} days instead of ${booking.days}`,
        `${budgetDests.length} of your ${destinations.length} destinations covered`,
        "Focuses on free/low-cost attractions",
      ],
    },
    express: {
      label:       "⚡ Express Plan",
      description: `Cover the best highlights in just ${expressDays} day${expressDays > 1 ? "s" : ""} — perfect if you're short on time.`,
      hotel,
      destinations: expressDests,
      days:        expressDays,
      totalCost:   expressCost,
      savings:     originalCost - expressCost,
      plan:        expressPlan,
      highlights: [
        `${expressDays} days instead of ${booking.days}`,
        `${expressDests.length} top highlights only`,
        "Geographically closest places grouped together",
        `Saves ₹${(originalCost - expressCost).toLocaleString("en-IN")} on hotel nights`,
      ],
    },
  };
}
