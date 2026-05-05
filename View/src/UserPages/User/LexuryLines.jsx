import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";

function LuxuryLines() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    {
      title: "Explore Our Luxury Lines",
      description:
        "Discover our premium collection of high-end vehicles for the discerning driver",
      // path: "/premium-luxury",
      video: "/videos/lux.mp4",
      accentColor: "#B45309", // Warm gold accent
      badge: "LUXURY",
    },
    {
      title: "For The Tracks",
      description:
        "Experience our high-performance models designed for racing enthusiasts",
      // path: "/trackspec",
      video: "/videos/m2cs.mp4",
      accentColor: "#DC2626", // Rich red accent
      badge: "PERFORMANCE",
    },
    {
      title: "Explore Our All-Terrains",
      description:
        "Discover our rugged yet luxurious vehicles for any adventure",
      // path: "/Allterains",
      video: "/videos/dune.mp4",
      accentColor: "#059669", // Nature green accent
      badge: "ADVENTURE",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              <span className="font-serif italic text-amber-600 mx-2">
                Collections
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">COMING 🔜</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-0 top-0 w-72 h-72 bg-amber-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute right-0 top-0 w-72 h-72 bg-red-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/4 bottom-0 w-72 h-72 bg-emerald-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Collections Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => navigate(section.path)}
              >
                {/* Video container */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onError={(e) => { e.target.style.display = 'none'; }}
                  >
                    <source src={section.video} type="video/mp4" />
                  </video>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>

                  {/* Badge */}
                  <div
                    className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${section.accentColor}15`,
                      color: section.accentColor,
                    }}
                  >
                    {section.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    {section.title}
                    <span className="ml-2 transition-all duration-300 group-hover:translate-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </h3>

                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {section.description}
                  </p>

                  <button
                    className="w-full py-2.5 rounded-lg transition-all duration-300 text-sm font-medium flex items-center justify-center border"
                    style={{
                      backgroundColor: `${section.accentColor}10`,
                      borderColor: `${section.accentColor}20`,
                      color: section.accentColor,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = `${section.accentColor}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = `${section.accentColor}10`;
                    }}
                  >
                    <span>Explore Collection</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            Exclusively Crafted Automotive Experiences • By Appointment Only
          </p>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default LuxuryLines;
