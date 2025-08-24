// src/app/projects/asis/page.tsx
"use client";
import { motion } from "framer-motion";

export default function ASISPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Heading */}
      <section className="text-center py-12 px-6">
        <motion.h1
          className="text-4xl font-bold"
          style={{ color: "#6A0DAD" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Adolescent Safety in All Spaces (ASIS)
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Protecting adolescent girls from gender-based violence in schools and online
        </motion.p>
      </section>

      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/projects/asis/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h2 className="relative text-3xl font-semibold z-10">Safer schools, safer spaces</h2>
      </section>

      {/* Project Overview */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          The Adolescent Safety in all Spaces (ASIS) project is a protection project that addresses gender-based violence
          (GBV) in schools and online, which impacts attendance and academic performance among adolescent girls. ASIS creates
          safer learning environments by equipping school stakeholders and students with the skills to prevent and respond to GBV.
          The project includes training teachers, guidance counselors, and PTA chairpersons to address threats, establishing GBV
          school clubs to create safe spaces and raise awareness, and providing education on GBV reporting protocols.
        </p>
      </section>

      {/* Impact Section - Timeline Style */}
      <section className="bg-gray-50 py-16 px-6">
        <h2
          className="text-3xl font-bold text-center mb-10"
          style={{ color: "#6A0DAD" }}
        >
          Impact so far
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-300"></div>
          <div className="space-y-12">
            <div className="relative flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <h3 className="font-semibold text-lg">22 Gender Clubs Established</h3>
                <p className="text-gray-600">Peer-to-peer platforms in schools fostering awareness, safety, and leadership.</p>
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded-full relative z-10"></div>
              <div className="w-1/2"></div>
            </div>

            <div className="relative flex items-center">
              <div className="w-1/2"></div>
              <div className="w-8 h-8 bg-purple-600 rounded-full relative z-10"></div>
              <div className="w-1/2 pl-8">
                <h3 className="font-semibold text-lg">1,100+ Student Members</h3>
                <p className="text-gray-600">Adolescent girls actively engaged in creating safe learning environments.</p>
              </div>
            </div>

            <div className="relative flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <h3 className="font-semibold text-lg">Teachers & Leaders Trained</h3>
                <p className="text-gray-600">Guidance counselors, PTA leaders, and teachers trained to prevent & respond to GBV.</p>
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded-full relative z-10"></div>
              <div className="w-1/2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Photos */}
      <section className="py-16 px-6">
        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: "#6A0DAD" }}
        >
          Project Photos
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <img src="/projects/asis/photo1.jpg" alt="ASIS photo 1" className="rounded-xl shadow-md" />
          <img src="/projects/asis/photo2.jpg" alt="ASIS photo 2" className="rounded-xl shadow-md" />
          <img src="/projects/asis/photo3.jpg" alt="ASIS photo 3" className="rounded-xl shadow-md" />
        </div>
      </section>
    </div>
  );
}
