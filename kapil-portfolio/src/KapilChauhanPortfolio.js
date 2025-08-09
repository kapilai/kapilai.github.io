import React from "react";

export default function KapilChauhanPortfolio() {
  const profile = {
    name: "Kapil Chauhan",
    title: "Software Developer at TCS — New Delhi, India",
    email: "kapilchn7@gmail.com",
    phone: "+91 78348 20637",
    github: "https://github.com/Kapil-chn7",
    leetcode: "https://leetcode.com/u/kapilchn7/",
    linkedin: "https://www.linkedin.com/in/kapilchauhan200/",
    twitter: "https://x.com/ninjacoder404",
    resume:
      "https://drive.google.com/file/d/1Y9MOdYXq7jseC80FMW7oGnNEIdMxDSEC/view?usp=sharing", // Replace with actual resume link
    summary:
      "I build backend microservices, full-stack applications, and AI-powered systems. Currently working on group post-booking management systems for Japan Airlines at TCS. I’m passionate about AI — exploring RAG, MCP, LangChain, and other emerging technologies to create cutting-edge intelligent solutions.",
    location: "New Delhi, India",
    education: "B.Tech, Information & Technology — GGSIPU (CGPA: 8.4)",
    availability: "Open to new opportunities",
  };

  const experiences = [
    {
      role: "Software Engineer — Digital, TCS",
      period: "Nov 2023 — Present | Chennai",
      tech: "Java, Spring Boot, Node.js, AWS (ECS, Lambda, Aurora, DynamoDB), Kafka, Docker",
      points: [
        "Working on group post-booking management system for Japan Airlines (PNR retrieval, seat upgrades, email notifications, fire-and-forget processing).",
        "Built and optimized backend microservices using Java, Spring Boot and Node.js; used ECS, DynamoDB and Aurora.",
        "Implemented a rule engine with ~99% automated testing, reducing manual QA effort.",
        "Improved system performance by 40% via SQL tuning, indexing, and Ehcache API caching.",
        "Refined Java libraries — reduced JAR size by 40% and improved AWS Lambda execution time (~100ms).",
        "Ensured 85%+ JUnit test coverage; produced Swagger docs and supported end-to-end testing with SoapUI/Postman.",
      ],
    },
    {
      role: "Software Engineer (Intern) — NeonFlake",
      period: "Sep 2022 — Mar 2023 | Hyderabad",
      tech: "React, Node.js, MongoDB, Vercel, Cloudinary",
      points: [
        "Led end-to-end development of a web platform for an NGO (frontend, backend, CMS).",
        "Built a custom payment gateway API that enabled ₹15L+ in donations and onboarded 100+ users.",
        "Implemented an interactive map with custom location navigation without third-party mapping services.",
        "Designed authentication, role management and database ERDs; prototyped UI in Figma.",
        "Deployed on Vercel and integrated Cloudinary & AWS for media management.",
      ],
    },
  ];

  const projects = [
    {
      title: "Emotion Detection using Deep Neural Network",
      description:
        "Facial emotion detection model to recognize seven emotions using image processing and CNNs. Mentored a team of three.",
      tech: "Python, PyTorch, Keras, TensorFlow, OpenCV",
      link: "https://github.com/Kapil-chn7/Emotion-Detection-using-Deep-neural-network-and-Open-Cv",
    },
    {
      title: "NGO Web Platform (NeonFlake)",
      description:
        "Complete platform with custom payment gateway and CMS to manage donations and users. Deployed on Vercel with Cloudinary integration.",
      tech: "React, Node.js, MongoDB, Cloudinary, AWS",
    },
  ];

  const skills = {
    languages: ["Java", "JavaScript", "C++", "Python", "C"],
    backend: ["Spring Boot", "Node.js", "JPA", "Hibernate", "Prisma"],
    databases: ["PostgreSQL", "MongoDB", "DynamoDB", "Redis"],
    cloud: ["AWS (ECS, ECR, Lambda, S3, CloudWatch)", "Docker", "Kafka"],
    tools: ["JUnit", "SoapUI", "Postman", "Jenkins", "Bitbucket", "Jira"],
    frontend: ["React.js", "Vue.js", "Material UI", "Figma"],
  };

  const achievements = [
    {
      text: "NASA Space Apps — Semi Finalist",
      link: "https://drive.google.com/file/d/1Dm_7sxSjr4_DOD_YIXbzWwleYTEh19_d/view",
    },
    {
      text: "IICC Coding Championship — Semi Finalist",
      link: "https://drive.google.com/file/d/1RreOq7KYbB_PY-JbJqcnBTemO7fggHHM/view",
    },
    {
      text: "Accio Wars — 911 rank among 11k+ contestants",
      link: "https://drive.google.com/file/d/1H_LMXSKI61__2kO4UBCBB9gWyDUZrJwT/view",
    },
    {
      text: "1st rank — Chess Tournament (TCS Japan Delivery Center)",
      link: "https://drive.google.com/file/d/1SoF746R2iGvSkH0jIFeP-_fbXpcVmxdT/view",
    },
    {
      text: "Chess: 2100+ rating on Chess.com & lichess; Arena FIDE Master title on FIDE",
      link: "https://ratings.fide.com/",
    },
    { text: "Hobbies: Chess, Table Tennis", link: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 shadow">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-sm opacity-90">{profile.title}</p>
          </div>
          <nav className="flex gap-4 items-center text-sm">
            {[
              "About",
              "Contact",
              "Experience",
              "Projects",
              "Skills",
              "Achievements",
            ].map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className="hover:underline hover:opacity-80 transition"
              >
                {section}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* About */}
      <section
        id="about"
        className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 items-center"
      >
        <div className="md:col-span-2">
          <h2 className="text-4xl font-bold leading-tight">
            Hi — I’m {profile.name}
          </h2>
          <p className="mt-4 text-gray-700 text-lg">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition text-sm"
            >
              Download Resume
            </a>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow border border-gray-100">
          <h3 className="text-lg font-medium">Profile</h3>
          <ul className="mt-4 text-sm space-y-2">
            <li>
              <strong>Location:</strong> {profile.location}
            </li>
            <li>
              <strong>Education:</strong> {profile.education}
            </li>
            <li>
              <strong>Availability:</strong> {profile.availability}
            </li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6">Contact</h3>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm">
              Email:{" "}
              <a
                href={`mailto:${profile.email}`}
                className="hover:underline text-indigo-600"
              >
                {profile.email}
              </a>
            </p>
            <p className="text-sm">
              Phone:{" "}
              <a
                href={`tel:${profile.phone}`}
                className="hover:underline text-indigo-600"
              >
                {profile.phone}
              </a>
            </p>
          </div>
          <div className="flex gap-3">
            {[
              { label: "GitHub", href: profile.github },
              { label: "LeetCode", href: profile.leetcode },
              { label: "LinkedIn", href: profile.linkedin },
              { label: "Twitter", href: profile.twitter },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6">Experience</h3>
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <article
              key={idx}
              className="bg-white p-6 rounded-lg shadow border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-indigo-700">
                    {exp.role}
                  </h4>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </div>
                <span className="text-sm text-gray-500">Tech: {exp.tech}</span>
              </div>
              <ul className="mt-4 list-disc pl-5 text-sm space-y-2 text-gray-700">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6">Selected Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow border border-gray-100"
            >
              <h4 className="font-medium text-indigo-700">{proj.title}</h4>
              <p className="mt-2 text-sm text-gray-700">{proj.description}</p>
              <p className="mt-1 text-xs text-gray-500">Tech: {proj.tech}</p>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-indigo-600 hover:underline"
                >
                  Source on GitHub
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6"
      >
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 md:col-span-3">
          <h4 className="font-medium text-indigo-700">Skills</h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {Object.entries(skills).map(([category, list]) => (
              <div key={category}>
                <strong className="block capitalize mb-1">{category}:</strong>
                <ul className="text-sm text-gray-700 list-disc pl-5">
                  {list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section
        id="achievements"
        className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow border border-gray-200"
      >
        <h3 className="text-3xl font-bold text-center text-indigo-700 mb-12">
          Achievements & Hobbies
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {achievements.map((ach, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-1 border border-gray-100 flex flex-col justify-between min-h-[180px]"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-200 to-purple-200 text-indigo-800 flex items-center justify-center rounded-full font-bold text-lg">
                    {idx + 1}
                  </div>
                  <h4 className="font-semibold text-lg text-gray-800 leading-snug">
                    {ach.text.split(" — ")[0]}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {ach.text.includes("—") ? ach.text.split("—")[1].trim() : ""}
                </p>
              </div>
              {ach.link && (
                <a
                  href={ach.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-block text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition"
                >
                  View Details →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {profile.name} — Built with ♥
      </footer>
    </div>
  );
}
