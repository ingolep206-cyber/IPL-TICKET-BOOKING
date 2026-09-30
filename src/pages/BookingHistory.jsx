import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabase";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("Loading bookings...");
  const [isLoading, setIsLoading] = useState(true);

  const getBookings = useCallback(async () => {
    if (!supabase) {
      setStatus("Add your Supabase URL and publishable key to .env.local first.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("id, name, tickets, stand, venue, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Could not load bookings:", error);
      setStatus(error.code === "42P01" || error.code === "PGRST205"
        ? "The bookings table is missing. Run supabase/schema.sql in the Supabase SQL Editor."
        : "Could not load bookings. Check your Supabase connection and try again.");
      setIsLoading(false);
      return;
    }

    setBookings(data ?? []);
    setStatus(data?.length ? "" : "No bookings yet. Your confirmed tickets will appear here.");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void Promise.resolve().then(getBookings);
  }, [getBookings]);

  return (
    <main className="history-page">
      <header className="page-heading">
        <p className="eyebrow">YOUR MATCH DAY PLANS</p>
        <h1>Booking history</h1>
        <p>All ticket requests, newest first.</p>
      </header>

      <div className="history-table-wrapper">
        {status ? (
          <p className="table-status" role="status">{status}</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Ticket holder</th>
                <th>Tickets</th>
                <th>Stand</th>
                <th>Ground</th>
                <th>Booked</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.name}</td>
                  <td>{booking.tickets}</td>
                  <td>{booking.stand}</td>
                  <td>{booking.venue}</td>
                  <td>{new Date(booking.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button className="history-button" onClick={getBookings} disabled={isLoading}>
        {isLoading ? "Refreshing..." : "Refresh bookings"}
      </button>

    </main>
  );
}

export default BookingHistory;

