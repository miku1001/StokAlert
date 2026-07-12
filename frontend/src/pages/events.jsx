import { useState, useEffect } from "react";
import { CalendarClock, Plus, Trash2, Zap } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = () => {
    setLoading(true);
    fetch("http://localhost:3000/events", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("http://localhost:3000/events", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        event_date: formData.get("event_date"),
        impact_multiplier: Number(formData.get("impact_multiplier")) || 1.0,
      }),
    });

    if (res.ok) {
      setShowModal(false);
      fetchEvents();
    } else {
      const err = await res.json();
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) fetchEvents();
  };

  return (
    <div className="h-full p-8 bg-zinc-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-black">Events</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Mark local demand spikes so forecasts account for them.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-2 rounded-full transition"
        >
          <Plus size={16} />
          Add event
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-300 flex items-center gap-2">
          <CalendarClock size={16} className="text-zinc-500" />
          <span className="text-sm font-semibold text-black">Upcoming and past events</span>
        </div>

        {loading && (
          <div className="px-6 py-8 text-sm text-zinc-500">Loading events...</div>
        )}

        {!loading && events.length === 0 && (
          <div className="px-6 py-12 flex flex-col items-center gap-2 text-center">
            <Zap size={22} className="text-zinc-400" />
            <p className="text-sm text-zinc-500">
              No events yet. Add sahod week, bagyo season, or pasko rush to get started.
            </p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-600 text-xs uppercase tracking-wider border-b border-zinc-300">
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Impact multiplier</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev, i) => (
                <tr
                  key={ev.id}
                  className={`border-b border-zinc-200 hover:bg-zinc-50 transition ${
                    i === events.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-black">{ev.name}</td>
                  <td className="px-6 py-4 text-zinc-600">
                    {new Date(ev.event_date).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/30 font-medium">
                      {Number(ev.impact_multiplier).toFixed(1)}x
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(ev.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border shadow-2xl rounded-xl p-6 w-[360px]">
            <h3 className="text-lg font-semibold mb-4 text-black">Add event</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-sm text-zinc-600 mb-1" htmlFor="event-name">Event name</label>
                <input
                  id="event-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Sahod Week"
                  className="bg-zinc-100 border rounded-lg px-3 py-2 text-sm text-black placeholder-gray-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-zinc-600 mb-1" htmlFor="event-date">Event date</label>
                <input
                  id="event-date"
                  type="date"
                  name="event_date"
                  className="bg-zinc-100 border rounded-lg px-3 py-2 text-sm text-black"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-zinc-600 mb-1" htmlFor="impact">
                  Expected demand level
                </label>
                <select
                  id="impact"
                  name="impact_multiplier"
                  defaultValue="1.0"
                  className="bg-zinc-100 border rounded-lg px-3 py-2 text-sm text-black w-full"
                  required
                >
                  <option value="1.0">Normal</option>
                  <option value="1.2">Slightly busier</option>
                  <option value="1.5">Busier</option>
                  <option value="2.0">Very busy</option>
                  <option value="3.0">Extremely busy (usually runs out)</option>
                </select>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 text-sm py-2 rounded-lg border border-zinc-300 text-zinc-600 hover:bg-zinc-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 text-sm py-2 rounded-lg bg-pink-400 hover:bg-pink-500 text-white font-semibold transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}