"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isMobile;
}

export default function CCLMPage() {
  const isMobile = useIsMobile();
  return (
    <main className="pt-24 px-4 md:px-12 lg:px-24 bg-white text-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-[#53CAE9] mb-4"
        >
          Community Cluster Learning Model (CCLM)
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl max-w-3xl mx-auto"
        >
          Literacy, vocational training, and financial inclusion for underserved
          families.
        </motion.p>
      </section>

      {/* Image Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <Image
          src="/projects/cclm/hero.webp" // Replace with real image
          alt="CCLM Project"
          width={1200}
          height={500}
          className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
        />
      </motion.div>

      {/* About Section */}
      <section className="max-w-6xl mx-auto mb-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          key={isMobile ? "about-left-mobile" : "about-left-desktop"} 
          initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: -50 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
          viewport={isMobile ?  { once: true, amount: 0.2 } : { once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-[#53CAE9] mb-4">
            Tackling Barriers to Education & Empowerment
          </h2>
          <p className="text-lg leading-relaxed">
            The Community Cluster Learning Model (CCLM) tackles barriers to
            education and economic empowerment by providing literacy, vocational
            training, and financial inclusion programs tailored to the needs of
            underserved communities, including Fulani settlements and IDP camps.
          </p>
        </motion.div>

        <motion.div
          key={isMobile ? "about-right-mobile" : "about-right-desktop"}
          initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: 50 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
          viewport={isMobile ?  { once: true, amount: 0.2 } : { once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/projects/cclm/training.webp" // Replace with real image
            alt="CCLM Training"
            width={600}
            height={400}
            className="w-full rounded-2xl shadow-lg object-cover"
          />
        </motion.div>
      </section>

      {/* Impact Section */}
      <section className="max-w-6xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-[#53CAE9] text-center mb-8"
        >
          Impact So Far
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-50 rounded-2xl shadow-md"
          >
            <h3 className="text-4xl font-bold text-[#53CAE9] mb-2">1,500+</h3>
            <p className="text-lg">
              Fulani women trained in dairy production, achieving a{" "}
              <span className="font-semibold">63% increase in profits</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="p-6 bg-gray-50 rounded-2xl shadow-md"
          >
            <h3 className="text-4xl font-bold text-[#53CAE9] mb-2">712</h3>
            <p className="text-lg">
              Women and adolescent girls certified in literacy, with nearly half
              enrolling in formal schools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="p-6 bg-gray-50 rounded-2xl shadow-md"
          >
            <h3 className="text-4xl font-bold text-[#53CAE9] mb-2">650+</h3>
            <p className="text-lg">
              Women in IDP camps (Adamawa & Abuja) gained vocational skills that
              improved livelihoods and self-reliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-semibold text-[#53CAE9] text-center mb-8"
        >
          Project in Action
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["cclm1.webp", "cclm2.webp", "cclm3.webp"].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <Image
                src={`/projects/cclm/${img}`} // Replace with real images
                alt={`CCLM photo ${i + 1}`}
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
