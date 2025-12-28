export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          LocalWorks
        </h1>
        <div className="space-x-6">
          <a href="/login" className="hover:underline">Login</a>
          <a
            href="/signup"
            className="bg-white text-indigo-700 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Sign Up
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center px-6 py-20">
        <h2 className="text-5xl font-extrabold leading-tight mb-6">
          Connecting Local Talent <br /> with Local Opportunities
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-indigo-100">
          A community-driven platform where students and skilled individuals
          can showcase their work and get hired locally — without middlemen.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <a
            href="/explore"
            className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
          >
            Explore Jobs
          </a>
          <a
            href="/provider/register"
            className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-700 transition"
          >
            Offer Your Skills
          </a>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="bg-white text-gray-800 py-20 px-10">
        <h3 className="text-4xl font-bold text-center mb-12">
          Who Is This Platform For?
        </h3>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Providers */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 shadow">
            <h4 className="text-2xl font-bold mb-4 text-indigo-700">
              🧑‍🔧 Job Providers
            </h4>
            <p className="mb-4">
              Students, freelancers, and skilled individuals whose work often
              goes unnoticed on big platforms.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Students offering tutoring, design, tech help</li>
              <li>Local workers (electricians, plumbers, mechanics)</li>
              <li>Freelancers & part-time professionals</li>
            </ul>
          </div>

          {/* Seekers */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 shadow">
            <h4 className="text-2xl font-bold mb-4 text-pink-700">
              👥 Job Seekers
            </h4>
            <p className="mb-4">
              Individuals or families looking for reliable, nearby services
              without complex hiring processes.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>People needing local services quickly</li>
              <li>Small businesses hiring locally</li>
              <li>Anyone preferring trusted, nearby talent</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-10">
        <h3 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg">
            <h4 className="text-xl font-bold mb-3 text-indigo-700">
              1. Create an Account
            </h4>
            <p>
              Sign up as a user or a provider using your email and basic details.
            </p>
          </div>

          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg">
            <h4 className="text-xl font-bold mb-3 text-purple-700">
              2. Explore or Offer Services
            </h4>
            <p>
              Browse local jobs or list your skills, experience, and availability.
            </p>
          </div>

          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg">
            <h4 className="text-xl font-bold mb-3 text-pink-700">
              3. Connect Locally
            </h4>
            <p>
              Communicate, collaborate, and get work done within your community.
            </p>
          </div>
        </div>
      </section>

      {/* REQUIREMENTS SECTION */}
      <section className="bg-white text-gray-800 py-20 px-10">
        <h3 className="text-4xl font-bold text-center mb-12">
          What Do You Need?
        </h3>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h4 className="text-2xl font-bold mb-4 text-indigo-700">
              For Job Providers
            </h4>
            <ul className="space-y-3">
              <li>✔ Basic profile details</li>
              <li>✔ Skills & occupation</li>
              <li>✔ Optional certificates or proof</li>
              <li>✔ Availability & location</li>
            </ul>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-4 text-pink-700">
              For Job Seekers
            </h4>
            <ul className="space-y-3">
              <li>✔ Simple signup</li>
              <li>✔ Browse or search services</li>
              <li>✔ Contact or request providers</li>
              <li>✔ No complex hiring process</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-indigo-100">
        <p>
          © 2025 LocalWorks — Built for community, opportunity, and growth.
        </p>
      </footer>
    </main>
  );
}
