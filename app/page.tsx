import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import EventList from '../components/EventList';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Events</h1>
        <EventList />
      </div>
    </div>
  );
}
