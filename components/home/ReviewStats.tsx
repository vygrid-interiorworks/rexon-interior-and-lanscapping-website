"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { apiService } from "@/lib/api";

export default function ReviewStats() {
  const [stats, setStats] = useState({
    averageRating: "4.8",
    projectCompletion: 120,
    clientSatisfaction: 98
  });

  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        const data = await apiService.getSettings();
        if (data) {
          setStats({
            averageRating: data.averageRating || "4.8",
            projectCompletion: Number(data.projectCompletion) || 120,
            clientSatisfaction: Number(data.clientSatisfaction) || 98
          });
        }
      } catch (err) {
        console.error("Failed to load settings review stats:", err);
      }
    };
    fetchReviewStats();
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16 pt-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-xl p-8 border border-[#89B036]/10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left"
      >
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-5xl font-serif font-bold text-[#89B036] mb-2">
            {stats.averageRating}
          </h3>
          <div className="flex text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <p className="text-sm text-[#4A4A4A]">Average Customer Rating</p>
        </div>

        <div className="flex flex-col items-center md:items-start border-y md:border-y-0 md:border-x border-gray-100 py-6 md:py-0 md:px-8">
          <h3 className="text-5xl font-serif font-bold text-[#3A3A3A] mb-2">{stats.projectCompletion}+</h3>
          <p className="text-sm text-[#4A4A4A]">Completed Residential & Commercial Projects</p>
        </div>

        <div className="flex flex-col items-center md:items-start md:pl-8">
          <h3 className="text-5xl font-serif font-bold text-[#546622] mb-2">{stats.clientSatisfaction}%</h3>
          <p className="text-sm text-[#4A4A4A]">Client Satisfaction & Referral Rate</p>
        </div>
      </motion.div>
    </section>
  );
}
