'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: '/hero/slide1.webp',
    title: 'Empowering Every Child',
    text: 'We bridge gaps in education and entrepreneurship for children and marginalized communities.',
  },
  {
    image: '/hero/slide2.webp',
    title: 'Community Literacy Programs',
    text: 'Free literacy classes in underserved rural areas.',
  },
  {
    image: '/hero/slide3.webp',
    title: 'Back-to-School Support',
    text: 'Providing school materials for children in need.',
  },
  {
    image: '/hero/slide4.webp',
    title: 'Entrepreneurship for Women',
    text: 'Training women to build sustainable livelihoods.',
  },
  {
    image: '/hero/slide5.webp',
    title: 'Together We Can',
    text: 'Join us in creating lasting change for the next generation.',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-black overflow-hidden text-white">
      
      {/* Preload images for smooth transition */}
      <div className="hidden">
        {slides.map((slide) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            width={1}
            height={1}
            quality={70}
            priority={false}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover"
            quality={80}
            priority={current === 0} // only preload first slide
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Text overlay */}
      <motion.div
        key={`text-${current}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{slides[current].title}</h1>
        <p className="text-lg md:text-xl">{slides[current].text}</p>
      </motion.div>
    </section>
  );
}
























// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';

// export default function Hero() {
//   return (
//     <section
//       id="home"
//       className="bg-[#53CAE9] text-white min-h-[80vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden"
//     >
//       <motion.h1
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="text-4xl md:text-6xl font-bold mb-4"
//       >
//         Empowering Every Child
//       </motion.h1>

//       <motion.p
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 0.7 }}
//         className="text-lg md:text-xl max-w-2xl mb-6"
//       >
//         Bridging gaps in education and entrepreneurship for children, women, and marginalized communities in Nigeria.
//       </motion.p>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//       >
//         <Link
//           href="#donate"
//           className="bg-[#FDBB3E] text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#fcae15] transition"
//         >
//           Donate Now
//         </Link>
//       </motion.div>

//       {/* Decorative element */}
//       <div className="absolute bottom-0 left-0 right-0 h-24 bg-white rounded-t-[50%]"></div>
//     </section>
//   );
// }
