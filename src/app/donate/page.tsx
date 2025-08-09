'use client';

import { motion } from 'framer-motion';

export default function DonatePage() {
  return (
    <main className="bg-[#f9fafb] min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#53CAE9] mb-6"
        >
          Support Our Mission
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-700 mb-10"
        >
          Your donation helps provide hope, education, and support to children in underserved communities. You can make a direct transfer to our account below.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-8"
        >
          <h2 className="text-2xl font-semibold text-[#F15D69] mb-4">Bank Details</h2>

          <div className="text-gray-800 space-y-4 text-lg">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-semibold text-[#53CAE9]">Account Name:</span>
                <span>Illmi Children’s Foundation</span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <span className="font-semibold text-[#53CAE9]">Account Number:</span>
                <span>2043159602</span>
            </div>
            <div className="flex items-center justify-between pb-2">
                <span className="font-semibold text-[#53CAE9]">Bank Name:</span>
                <span>First Bank of Nigeria</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            After donating, kindly send proof of payment to <a href="mailto:donate@icf.org" className="text-[#53CAE9] underline">donate@icf.org</a> so we can acknowledge your support.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
