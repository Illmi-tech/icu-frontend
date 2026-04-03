"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function IDGCPage() {
  return (
    <main className="pt-24 px-4 md:px-12 lg:px-24 bg-gradient-to-b from-pink-50 to-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold text-[#F15D69] mb-4"
        >
          International Day of the Girl Child
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-xl md:text-2xl font-medium text-[#53CAE9] mb-6"
        >
          Celebrating Voices, Potential, and Leadership
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg max-w-3xl mx-auto leading-relaxed"
        >
          To mark the International Day of the Girl Child, ICF organized an{" "}
          <span className="font-semibold text-[#F15D69]">
            essay competition
          </span>{" "}
          for the presidents of ASIS GBV school clubs, recently trained as peer
          advocates and change agents against gender-based violence.
        </motion.p>
      </section>

      {/* Feature Section */}
      <section className="max-w-6xl mx-auto mb-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-[#53CAE9] mb-4">
            Empowering Girls Through Expression
          </h3>
          <p className="text-lg leading-relaxed">
            The competition offered a platform for girls to{" "}
            <span className="font-semibold">share their dreams</span>, reflect on
            challenges, and envision a{" "}
            <span className="font-semibold text-[#F15D69]">
              future free from violence and discrimination
            </span>
            . Each essay became a powerful testament to resilience, creativity,
            and the determination of adolescent girls to make their voices heard.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/stories/idgc/idgc1.webp" // Replace with real project image
            alt="IDGC Essay Competition"
            width={600}
            height={400}
            className="w-full h-72 object-cover"
          />
        </motion.div>
      </section>

      {/* Highlight Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-[#F15D69] mb-4">
            Voices for Change
          </h3>
          <p className="text-lg max-w-4xl mx-auto">
            Through their essays, participants highlighted the urgent need for{" "}
            <span className="font-semibold">safe spaces</span>,{" "}
            <span className="font-semibold">gender equity</span>, and the{" "}
            <span className="font-semibold text-[#53CAE9]">
              amplification of adolescent voices
            </span>{" "}
            in the fight against GBV.
          </p>
        </motion.div>

        {/* Project Photos Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["idgc2.webp", "idgc3.webp", "idgc4.webp"].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg"
            >
              <Image
                src={`/stories/idgc/${img}`} // Replace with real images
                alt={`IDGC photo ${i + 1}`}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing Section */}
      <section className="max-w-5xl mx-auto text-center mb-24">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg leading-relaxed"
        >
          ICF remains committed to{" "}
          <span className="font-semibold text-[#F15D69]">
            elevating the voices of girls
          </span>{" "}
          and ensuring that they are empowered as leaders, innovators, and
          change agents for a brighter, more equitable future.
        </motion.p>
      </section>
    </main>
  );
}
