import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white py-12 px-4">
      <div className="absolute inset-0">
        <img
          src="/hero-image.jpg"
          alt="Event Management"
          className="object-cover w-full h-full opacity-50"
        />
      </div>
      <div className="relative z-10 container mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to MOST Event Management</h1>
        <p className="text-xl mb-8">Discover and manage events happening around you.</p>
        <Link href="/signup" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
          Get Started
        </Link>
      </div>
    </section>
  );
}
