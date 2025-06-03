import React from 'react';

export default function App() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Floating Dynamic News Ticker */}
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white z-50 shadow-md overflow-hidden">
        <div className="ticker-container whitespace-nowrap py-2 px-4 animate-ticker">
          <span className="inline-block font-medium text-sm sm:text-base">
            📰 Weekly Market Report: AI Investments Rising | 🏆 ESCP HFA Wins Best Student Finance Club 2024 |
            📊 New Research: Crypto Regulation Trends in Europe | 💼 Open Positions: Analyst Internships Now Hiring!
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(129,140,248,0.1),transparent)]"></div>
        <img src="https://placehold.co/180x60?text=ESCP+HFA" alt="Logo" className="mx-auto mb-8 drop-shadow-lg" />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl mx-auto mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
          ESCP Hedge Fund Association
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-600">
          Empowering students through hands-on experience in hedge funds, alternative investments, and global markets.
        </p>
        <a href="#join" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"> 
          Join Our Community
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                The ESCP Hedge Fund Association is a student-led organization dedicated to bridging academic knowledge with practical experience in alternative investments. Founded in 2018, we've become a leading platform for students interested in hedge funds, private equity, and quantitative finance.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to provide members with unparalleled access to industry professionals, hands-on investment experience, and exclusive networking opportunities through our annual events and partnerships with leading financial institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What We Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Educational Workshops",
                description: "Weekly sessions on portfolio management, risk assessment, and derivatives trading led by industry experts.",
                icon: "📚"
              },
              {
                title: "Live Trading Competitions",
                description: "Participate in simulated trading contests with real-time market data and cash prizes for top performers.",
                icon: "📈"
              },
              {
                title: "Industry Networking",
                description: "Exclusive access to our annual Hedge Fund Symposium and networking events with top fund managers.",
                icon: "🤝"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition-shadow duration-300 border border-gray-100 group hover:border-blue-200">
                <div className="text-3xl mb-4 text-blue-600">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Johnson", role: "President", image: "https://placehold.co/300x300?text=A" },
              { name: "Sophie Müller", role: "Vice President", image: "https://placehold.co/300x300?text=S" },
              { name: "Luca Moretti", role: "Head of Research", image: "https://placehold.co/300x300?text=L" },
              { name: "Nina Patel", role: "Events Director", image: "https://placehold.co/300x300?text=N" },
              { name: "Erik Schmidt", role: "Recruitment Lead", image: "https://placehold.co/300x300?text=E" },
              { name: "Lena Dubois", role: "Marketing Head", image: "https://placehold.co/300x300?text=L" },
              { name: "James Carter", role: "Operations Manager", image: "https://placehold.co/300x300?text=J" },
              { name: "Yuki Tanaka", role: "Quantitative Analyst", image: "https://placehold.co/300x300?text=Y" }
            ].map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative inline-block mb-4 transform transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-500 shadow-md group-hover:border-blue-700 transition-colors duration-300"
                  />
                </div>
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section id="join" className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How to Join</h2>
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-md border border-gray-100">
            <ol className="space-y-6 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-blue-600 text-white font-bold flex-shrink-0">1</span>
                <span>Eligibility: Open to all ESCP students with a strong interest in finance.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-blue-600 text-white font-bold flex-shrink-0">2</span>
                <span>Application: Submit your CV and motivation letter via our recruitment portal.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-blue-600 text-white font-bold flex-shrink-0">3</span>
                <span>Assessment: Complete our quantitative reasoning test and case study analysis.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-blue-600 text-white font-bold flex-shrink-0">4</span>
                <span>Interview: Final stage interview with our recruitment committee.</span>
              </li>
            </ol>
            <div className="mt-10 text-center">
              <a
                href="mailto:recruitment@escphfa.com"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div>
            <p>&copy; 2025 ESCP Hedge Fund Association. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-300 transition-colors">LinkedIn</a> 
            <a href="#" className="hover:text-blue-300 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-300 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      {/* CSS Animation for Ticker */}
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-ticker {
          display: inline-block;
          white-space: nowrap;
          animation: ticker 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
