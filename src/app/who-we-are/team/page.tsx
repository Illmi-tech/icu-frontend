'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const boardOfTrustees = [
  { name: "Mrs. Maryam Augie A.", role: "Founder/Executive Director ICF", img: "/who-we-are/team/photo1.webp" },
  { name: "Justice Amina Augie", role: "Rtr. Justice of the Supreme Court of Nigeria (SCN)", img: "/who-we-are/team/photo2.webp" },
  { name: "Dr. Shehu Yahya", role: "Chairman, Board of Directors of Development Bank of Nigeria Plc (DBN)", img: "/who-we-are/team/photo3.webp" },
  { name: "Ms. Amina Wali-Shafeeq", role: "Development Consultant", img: "/who-we-are/team/photo4.webp" },
  { name: "Ms. Mercy Banku Abang", role: "Media Entrepreneur and Tech Investor", img: "/who-we-are/team/photo5.webp" },
  { name: "Haj. Noordina Modibbo", role: "Educationist", img: "/who-we-are/team/photo6.webp" },
];

const advisoryCouncil = [
  { name: "HE Donald Duke", role: "Former Governor of Cross River", img: "/who-we-are/team/photo7.webp" },
  { name: "Dr. Kole Shettima", role: "Director, Macarthur Foundation Nigeria", img: "/who-we-are/team/photo8.webp" },
  { name: "Muhammad Sani D.", role: "Deputy CBN Gov.", img: "/who-we-are/team/photo9.webp" },
  { name: "Ayisha Osori", role: "Lawyer, Consultant and Communication Strategist", img: "/who-we-are/team/photo10.webp" },
  { name: "Dr. Jumoke Oduwole", role: "Special Adviser to the President on PEBEC and Investment", img: "/who-we-are/team/photo11.webp" },
  { name: "Florence Ozor", role: "Manager, Government Relations, Rahamaniyya Group", img: "/who-we-are/team/photo12.webp" },
  { name: "Otto Orondaam", role: "Founder Slum2School Africa", img: "/who-we-are/team/photo13.webp" },
];

const otherRoles = [
  { name: "Nana Aisha El-Yakub", role: "M&E Officer, Education and Scholarship Lead", img: "/who-we-are/team/photo14.webp" },
  { name: "Rita Somtochukwu Eze", role: "Finance and M&E Manager", img: "/who-we-are/team/photo15.webp" },
  { name: "Abdulsamad Isah Mohd", role: "Program Officer, Community & Policy Lead", img: "/who-we-are/team/photo16.webp" },
  { name: "Confidence Albert", role: "Executive Assistant", img: "/who-we-are/team/photo17.webp" },
  { name: "Obaro Abigeal", role: "Communications Assistant", img: "/who-we-are/team/photo18.webp" },
  { name: "Muo Tovia", role: "Program Officer, Lead (Gender and Protection)", img: "/who-we-are/team/photo19.webp" },
];

function Section({ title, members }: { title: string; members: { name: string; role: string; img: string }[] }) {
  return (
    <div className="mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-center text-[#FDBB3E] mb-10"
      >
        {title}
      </motion.h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {members.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="relative w-full h-64">
              <Image
                src={member.img}
                alt={member.name}
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-[#4A148C]">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function TeamsPage() {
  return (
    <section className="py-20 px-4 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#F15D69] mb-16"
        >
          Meet Our Team
        </motion.h1>

        <Section title="Board of Trustees" members={boardOfTrustees} />
        <Section title="Advisory Council" members={advisoryCouncil} />
        <Section title="Other Roles" members={otherRoles} />
      </div>
    </section>
  );
}
