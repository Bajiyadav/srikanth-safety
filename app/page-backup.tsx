import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold">
          Srikanth Lecture for Safety
        </h1>

        <div className="flex gap-8">
          <a href="#">Home</a>
          <a href="#">Courses</a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-blue-500 font-semibold mb-4">
              PETROLEUM & INDUSTRIAL SAFETY TRAINING
            </p>

            <h2 className="text-6xl font-bold mb-6">
              Srikanth Lecture
              <br />
              for Safety
            </h2>

            <p className="text-xl text-zinc-400 mb-8">
              Helping students build successful careers in
              Petroleum, Oil & Gas, HSE and Industrial Safety.
            </p>

            <div className="flex gap-4">
              <button className="bg-blue-600 px-6 py-3 rounded-xl">
                Join Next Batch
              </button>

              <button className="border border-zinc-700 px-6 py-3 rounded-xl">
                WhatsApp
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/image/srikanth-profile.jpg"
              alt="Srikanth Sir"
              width={600}
              height={700}
              className="rounded-3xl"
            />
          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="bg-zinc-950 py-24 px-8">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-bold text-center mb-6">
            About Srikanth Sir
          </h2>

          <p className="text-zinc-400 text-center max-w-4xl mx-auto leading-8 mb-16">
            With years of experience in Petroleum,
            Industrial Safety and HSE training,
            Srikanth Sir is dedicated to helping students
            gain practical knowledge, confidence and
            industry-ready skills through structured learning
            and career-focused mentoring.
          </p>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">
                10+
              </h3>
              <p className="text-zinc-400">
                Years Experience
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">
                500+
              </h3>
              <p className="text-zinc-400">
                Students Guided
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">
                100%
              </h3>
              <p className="text-zinc-400">
                Career Support
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
              <h3 className="text-4xl font-bold text-blue-500 mb-2">
                Live
              </h3>
              <p className="text-zinc-400">
                Online Classes
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-bold text-center mb-16">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-zinc-900 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">
                Petroleum Industry Training
              </h3>

              <p className="text-zinc-400">
                Industry-focused learning designed for
                petroleum and oil & gas careers.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">
                Industrial Safety Programs
              </h3>

              <p className="text-zinc-400">
                Learn practical safety standards and
                workplace safety procedures.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">
                Career Guidance
              </h3>

              <p className="text-zinc-400">
                Guidance for freshers and professionals
                looking to advance their careers.
              </p>
            </div>

            <div className="bg-zinc-900 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">
                Interview Preparation
              </h3>

              <p className="text-zinc-400">
                Practical interview support and career
                readiness training.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}