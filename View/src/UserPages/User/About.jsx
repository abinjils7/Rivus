import React from "react";
import Navbar from "../Common/Nav";
import Footer from "../Common/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="relative w-full min-h-screen overflow-hidden bg-black">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
        >
          <source src="/videos/mec1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Container */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 py-16 lg:py-24 text-white">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
              About <span className="text-blue-500">Rivus</span>
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeInUp delay-150">
              Excellence, integrity, and a deep passion for automobiles since 1999
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Welcome Text */}
            <div className="space-y-8">
              <div className="animate-fadeInUp delay-200">
                <h2 className="text-3xl font-semibold mb-4 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  Our Story
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Welcome to <span className="font-semibold text-white">Rivus</span> — 
                  a brand built on <span className="text-blue-400 font-semibold">excellence</span>, 
                  <span className="text-blue-400 font-semibold"> integrity</span>, 
                  and a deep passion for automobiles. For over 
                  <span className="font-bold"> 25 years</span>, we've proudly served 
                  communities by connecting people to cars that fit their lives, budgets, and aspirations.
                </p>
              </div>

              <div className="animate-fadeInUp delay-400">
                <h2 className="text-3xl font-semibold mb-4 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  Our Mission
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  At Rivus, our mission is simple: to make car ownership enjoyable, affordable, 
                  and trustworthy. Whether you're buying your first car or your fifth, 
                  we ensure every journey starts with confidence.
                </p>
              </div>
            </div>

            {/* Right Column - Core Values */}
            <div className="animate-fadeInUp delay-600">
              <h2 className="text-3xl font-semibold mb-6 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                Our Core Values
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Customer First</h3>
                  <p className="text-gray-300">We put your needs at the center of everything we do.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Transparency</h3>
                  <p className="text-gray-300">No hidden fees, no false promises. Just honest deals.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Quality Assurance</h3>
                  <p className="text-gray-300">Every vehicle is carefully inspected for safety and performance.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Innovation</h3>
                  <p className="text-gray-300">We embrace technology to make buying and owning a car easier than ever.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fadeInUp delay-800">
            <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">25+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-300">Quality Vehicles</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16 animate-fadeInUp delay-900">
            <a
              href="/marketplace"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="mr-2">Browse Our Collection</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-200 {
          animation-delay: 0.3s;
        }
        .delay-300 {
          animation-delay: 0.45s;
        }
        .delay-400 {
          animation-delay: 0.6s;
        }
        .delay-450 {
          animation-delay: 0.75s;
        }
        .delay-600 {
          animation-delay: 0.9s;
        }
        .delay-750 {
          animation-delay: 1.05s;
        }
        .delay-800 {
          animation-delay: 1.2s;
        }
        .delay-900 {
          animation-delay: 1.35s;
        }
      `}</style>
    </>
  );
}