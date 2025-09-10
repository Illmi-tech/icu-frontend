"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function IWDPage() {
  return (
    <main className="pt-24 bg-gradient-to-b from-pink-50 to-white text-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="text-center px-4 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
        >
          International Women’s Day 2025
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-gray-700"
        >
          ICF Hosts Inspiring Webinar on Women’s Leadership and Empowerment
        </motion.p>
      </section>

      {/* Event Recap */}
      <section className="max-w-5xl mx-auto mb-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <p className="text-lg leading-relaxed text-gray-800">
            On <span className="font-semibold">March 7, 2025</span>, Illmi
            Children’s Fund (ICF) hosted a successful virtual webinar in honor
            of International Women’s Day. The event featured engaging
            discussions on gender equality, digital inclusion, and STEM
            opportunities, led by esteemed speakers{" "}
            <span className="font-semibold">
              Hansatu Adegbite, Ismail Abubakar, and Aisha Augie
            </span>
            .
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-800">
            Broadcast simultaneously on Instagram and YouTube, the webinar
            fostered active participation from audiences across different
            regions. Discussions emphasized the power of collective action in
            advancing gender equality and highlighted how empowering women
            contributes to societal growth.
          </p>
          <p className="mt-4 text-lg font-medium text-gray-700">
            ICF extends sincere gratitude to all participants and remains
            committed to continuing these vital conversations.
          </p>
        </motion.div>
      </section>

      {/* Speakers Section */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-center text-[#53CAE9] mb-10"
        >
          Featured Speakers
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Hansatu Adegbite",
              role: "Gender Equality Advocate",
              img: "/stories/iwd/speaker1.webp",
            },
            {
              name: "Ismail Abubakar",
              role: "Digital Inclusion Specialist",
              img: "/stories/iwd/speaker2.webp",
            },
            {
              name: "Aisha Augie",
              role: "STEM Opportunities Leader",
              img: "/stories/iwd/speaker3.webp",
            },
          ].map((speaker, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <Image
                src={speaker.img}
                alt={speaker.name}
                width={200}
                height={200}
                className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">
                {speaker.name}
              </h3>
              <p className="text-gray-600 mt-2">{speaker.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Audience Engagement / Quote Section */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-16 px-6 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8"
        >
          Voices of Change
        </motion.h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            "“Empowering women is not a favor, it’s a necessity for a thriving society.”",
            "“Collective action is the key to advancing gender equality worldwide.”",
          ].map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md text-lg text-gray-700 italic"
            >
              {quote}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-6xl mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-center text-[#53CAE9] mb-8"
        >
          Event Highlights
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["iwd1.webp", "iwd2.webp", "iwd3.webp"].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={`/stories/iwd/${img}`}
                alt={`IWD photo ${i + 1}`}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
