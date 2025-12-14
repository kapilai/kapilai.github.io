import React from "react";

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 px-6 py-12">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        {/* Certificates (TEXT ONLY, NO LINK) */}
        <span className="text-emerald-700 font-semibold text-lg">
          📜 Certificates
        </span>

        {/* Back to Portfolio */}
        <a
          href="/"
          className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition"
        >
          ← Visit Kapil’s Portfolio
        </a>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-14">
        Achievements & Profiles
      </h1>

      {/* ================= TECH SECTION ================= */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-semibold text-slate-800 mb-8">
          🚀 Tech Achievements
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* ⭐ MOST IMPORTANT */}
          <Card
            title="TCS – Special Initiative Award"
            subtitle="Awarded for driving innovation that significantly improved project efficiency at Tata Consultancy Services."
            link="https://drive.google.com/file/d/1Sj6U-HU6BD1mfVVCfCjLBPlO8e8cpB2I/view"
            highlight
          />

          <Card
            title="NASA Space Apps Challenge"
            subtitle="Semi Finalist — Global hackathon organized by NASA."
            link="https://drive.google.com/file/d/1Dm_7sxSjr4_DOD_YIXbzWwleYTEh19_d/view"
          />

          <Card
            title="IICC Coding Championship"
            subtitle="Semi Finalist in national-level competitive programming contest."
            link="https://drive.google.com/file/d/1RreOq7KYbB_PY-JbJqcnBTemO7fggHHM/view"
          />

          <Card
            title="Accio Wars"
            subtitle="Secured 911 rank among 11,000+ participants."
            link="https://drive.google.com/file/d/1H_LMXSKI61__2kO4UBCBB9gWyDUZrJwT/view"
          />

          <Card
            title="TCS Japan Delivery Center"
            subtitle="1st Rank — Chess Tournament."
            link="https://drive.google.com/file/d/1SoF746R2iGvSkH0jIFeP-_fbXpcVmxdT/view"
          />
        </div>
      </section>

      {/* ================= GAMES SECTION ================= */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-8">
          ♟ Games & Chess Profiles
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Card
            title="Lichess"
            subtitle="gangMemberGM · 2100+ · Arena FIDE Master"
            link="https://lichess.org/@/gangMemberGM"
          />

          <Card
            title="Chess.com"
            subtitle="kapilchn · 2100+ Rapid & Blitz"
            link="https://www.chess.com/member/kapilchn"
          />

          <Card
            title="Hobbies"
            subtitle="Chess, Table Tennis"
          />
        </div>
      </section>
    </div>
  );
}

/* ================= REUSABLE CARD ================= */
function Card({ title, subtitle, link, highlight }) {
  return (
    <div
      className={`p-6 rounded-xl border flex flex-col justify-between transition ${
        highlight
          ? "bg-emerald-50 border-emerald-200 shadow-md hover:shadow-xl"
          : "bg-white border-slate-100 shadow-sm hover:shadow-xl"
      }`}
    >
      <div>
        <h3 className="font-semibold text-lg text-slate-800 mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block text-sm font-medium text-emerald-700 hover:text-emerald-900 transition"
        >
          View Certificate →
        </a>
      )}
    </div>
  );
}
