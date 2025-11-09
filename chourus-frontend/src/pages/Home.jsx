import Navbar from "../components/Navbar";
import ConcertCard from "../components/ConcertCard";
import ChatBox from "../components/ChatBox";
import ScheduleWidget from "../components/ScheduleWidget";
import FanProjects from "../components/FanProjects";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="grid">
        {/* Left: Concerts */}
        <section className="col concerts">
          <h2>Concerts</h2>
          <div className="cards">
            <ConcertCard
              artist="Taylor Swift"
              note="Hotels • Food • Parking"
              date="Oct 12, 2025"
              venue="AT&T Stadium"
              imageUrl="https://publish.purewow.net/wp-content/uploads/sites/2/2024/10/taylor-swift-hub.jpg?fit=2050%2C1100"
            />
            <ConcertCard
              artist="The Weeknd"
              note="Hotels • Food • Parking"
              date="Nov 3, 2025"
              venue="American Airlines Center"
              imageUrl="https://s3.amazonaws.com/sfc-datebook-wordpress/wp-content/uploads/sites/2/2020/03/MER89d1b098f418bb47fc2d58ce478ee_listen0322.jpg"
            />
          </div>
        </section>

        {/* Middle: Chat */}
        <section className="col"><ChatBox /></section>

        {/* Right: Schedule */}
        <section className="col"><ScheduleWidget /></section>
      </main>

      {/* Full-width Fan Projects (below grid) */}
      <div className="container">
        <FanProjects />
      </div>
    </>
  );
}
