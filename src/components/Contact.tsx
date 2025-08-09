'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-16 px-4 bg-[#f9fafb]" id="contact">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[#53CAE9]"
        >
          Contact Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
        >
          Have questions or want to collaborate with Illmi Children’s Fund (ICF)?
          We’d love to hear from you. Reach out to us through any of the methods below.
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <Mail className="text-[#F15D69]" />
            <span className="text-gray-800">info@illmichildrenfund.org</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-[#FDBB3E]" />
            <span className="text-gray-800">+234 800 123 4567</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-[#53CAE9]" />
            <span className="text-gray-800">Abuja, Nigeria</span>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
          />
          <button
            type="submit"
            className="bg-[#F15D69] text-white font-semibold py-2 rounded-lg hover:bg-[#d94d59] transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
