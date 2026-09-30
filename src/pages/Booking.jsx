import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { supabase } from "../supabase";

function Booking() {
    const [searchParams] = useSearchParams();
    const [name, setName] = useState("");
    const [tickets, setTickets] = useState("");
    const [stand, setStand] = useState("");
    const [venue, setVenue] = useState(searchParams.get("venue") || "");
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleBooking(event) {
        event.preventDefault();
        setStatus("");

        if (!supabase) {
            setStatus("Add your Supabase URL and publishable key to .env.local first.");
            return;
        }

        setIsSubmitting(true);
        const { error } = await supabase.from("bookings").insert({
            name: name.trim(),
            tickets: Number(tickets),
            stand,
            venue,
        });

        setIsSubmitting(false);
        if (error) {
            console.error("Booking failed:", error);
            setStatus(error.code === "42P01" || error.code === "PGRST205"
                ? "The bookings table is missing. Run supabase/schema.sql in the Supabase SQL Editor."
                : "We couldn't save your booking. Check your Supabase connection and try again.");
            return;
        }

        setStatus("Booking confirmed. Your ticket request has been saved.");
        setName("");
        setTickets("");
        setStand("");
    }

    return (
        <main className="booking-page">
            <header className="page-heading">
                <p className="eyebrow">MATCH DAY STARTS HERE</p>
                <h1>Book your seat</h1>
                <p>Choose your ground and stand. We’ll take care of the rest.</p>
            </header>

            <form className="booking-form" onSubmit={handleBooking}>
                <label htmlFor="name">Full name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the ticket holder's name"
                    autoComplete="name"
                    maxLength="100"
                    required
                />

                <label htmlFor="tickets">Tickets</label>
                <input
                    id="tickets"
                    type="number"
                    min="1"
                    max="10"
                    value={tickets}
                    onChange={(e) => setTickets(e.target.value)}
                    placeholder="Up to 10 tickets"
                    required
                />

                <label htmlFor="stand">Stand</label>
                <select
                    id="stand"
                    value={stand}
                    onChange={(e) => setStand(e.target.value)}
                    required
                >
                    <option value="">Select a stand</option>
                    <option value="General Stand">General Stand</option>
                    <option value="VIP Stand">VIP Stand</option>
                </select>

                <label htmlFor="venue">Ground</label>
                <select
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    required
                >
                    <option value="">Select a ground</option>
                    <option value="Wankhede Stadium">Wankhede Stadium</option>
                    <option value="M. Chinnaswamy Stadium"> M. Chinnaswamy Stadium</option>

                </select>

                <button className="primary-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving booking..." : "Confirm booking"}
                </button>
                {status && <p className="form-status" role="status">{status}</p>}
            </form>

            <section className="booking-details">
                <h2>Your selection</h2>
                <p><span>Ticket holder</span><strong>{name || "Not selected"}</strong></p>
                <p><span>Tickets</span><strong>{tickets || "Not selected"}</strong></p>
                <p><span>Stand</span><strong>{stand || "Not selected"}</strong></p>
                <p><span>Ground</span><strong>{venue || "Not selected"}</strong></p>
            </section>
        </main>
    );
}

export default Booking;

