
import { Link } from "react-router-dom";

function MatchCard(props) {
    return (
    <div className="match-card">
        <p className="eyebrow">FEATURED FIXTURE</p>
        <h2>
        {props.team1} vs {props.team2}
        </h2>

        <p className="match-venue">{props.venue}</p>
        <p className="match-date">Fixture date to be announced</p>
        <Link className="text-link" to={`/booking?venue=${encodeURIComponent(props.ground)}`}>
            Book at this ground <span aria-hidden="true">→</span>
        </Link>
        </div>
    );
}

function Matches() {
    return (
    <main className="matches-page">

        <header className="page-heading">
            <p className="eyebrow">THE FIXTURES</p>
            <h1>Pick your match</h1>
            <p>Choose a featured fixture and reserve your ground.</p>
        </header>

        <div className="matches-grid">
                <MatchCard
                team1="RCB"
                team2="CSK"
                venue="M. Chinnaswamy Stadium · Bengaluru"
                ground="M. Chinnaswamy Stadium"
            />

            <MatchCard
                team1="MI"
                team2="KKR"
                venue="Wankhede Stadium · Mumbai"
                ground="Wankhede Stadium"
            />
        </div>



        </main>
    );
}
export default Matches;

