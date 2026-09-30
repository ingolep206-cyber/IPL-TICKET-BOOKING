import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">THE CROWD. THE CRICKET. THE MOMENT.</p>
          <h1>Match day<br />belongs to you.</h1>
          <p>Find your ground, choose your stand, and get closer to every ball.</p>
          <Link className="primary-button hero-button" to="/matches">Explore fixtures <span aria-hidden="true">→</span></Link>
        </div>
        <div className="hero-score" aria-label="Cricket match illustration">
          <span className="score-label">INNINGS</span>
          <strong>20<span>·</span>20</strong>
          <span className="score-rule" />
          <span className="score-caption">ONE NIGHT<br />EVERYTHING</span>
        </div>
      </section>
      <section className="home-strip" aria-label="Booking information">
        <div><strong>01</strong><span>Choose a fixture</span></div>
        <div><strong>02</strong><span>Pick your stand</span></div>
        <div><strong>03</strong><span>Save your booking</span></div>
        <Link to="/history">View booking history <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}

export default Home;
