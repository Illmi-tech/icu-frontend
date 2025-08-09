'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { FacebookLogoIcon, InstagramLogoIcon, XLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#F15D69] mb-12"
        >
          Contact Us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-6 text-gray-700">
            <div className="flex items-start gap-4">
              <MapPin className="text-[#F15D69] w-6 h-6 mt-1" />
              <span>Suite 409, Capital Hub Plaza, Ahmadu Bello Way, Mabushi, Abuja</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-[#F15D69] w-6 h-6" />
              <span>+234 XXX XXX XXXX</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-[#F15D69] w-6 h-6" />
              <span>info@illmifund.org</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-5 pt-4">
              <a href="https://www.facebook.com/share/16eGV6FYiy/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                <FacebookLogoIcon size={24} weight="fill" className="text-[#1877F2] hover:scale-110 transition" />

              </a>
              <a href="https://x.com/illmifund?s=21" target="_blank" rel="noopener noreferrer">
                <XLogoIcon size={24} weight="fill" className="text-[#1877F2] hover:scale-110 transition" />
              </a>
              <a href="https://www.instagram.com/illmichildrensfund?igsh=MWFqOWd4djQ4cHA0MQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                <InstagramLogoIcon size={24} weight="fill" className="text-[#1877F2] hover:scale-110 transition" />
              </a>
              <a href="https://www.linkedin.com/company/illmi-children-s-fund-icf/" target="_blank" rel="noopener noreferrer">
                <LinkedinLogoIcon size={24} weight="fill" className="text-[#1877F2] hover:scale-110 transition" />
              </a>
            </div>

            {/* Google Map */}
            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.6958693585484!2d7.442992375056646!3d9.066320890985095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0d8dbd1e80ed%3A0xc273b08b5b30ae44!2sThe%20Capital%20Hub%2C%20Ahmadu%20Bello%20Way%2C%20Mabushi%20900108%2C%20Abuja!5e0!3m2!1sen!2sng!4v1699989999999!5m2!1sen!2sng"
                width="100%"
                height="250"
                loading="lazy"
                allowFullScreen
                className="rounded-xl border"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F15D69]"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F15D69]"
            />
            <textarea
              placeholder="Your Message..."
              rows={5}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F15D69]"
            ></textarea>
            <button
              type="submit"
              className="bg-[#F15D69] hover:bg-[#e04e5b] text-white w-full rounded-xl py-2 font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
