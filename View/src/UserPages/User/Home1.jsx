import React, { useState, useEffect } from "react";
import Nav from "../Common/Nav";
import CarCards from "./Luxs";
import Footer from "../Common/Footer";
// import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    {
      src: "/videos/bmw.mp4",
      title: "Welcome To Rivus",
      description: "Drive beyond expectations — premium performance",
    },
    {
      src: "/videos/lux.mp4",
      title: "Luxury Redefined",
      description: "Experience unparalleled comfort and style",
    },
    {
      src: "/videos/m2cs.mp4",
      title: "Performance Mastered",
      description: "Power and precision in perfect harmony",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  const goToVideo = (index) => {
    setCurrentVideo(index);
  };

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <>
      <h2>Navbar</h2>
      <Nav />

      <section className="relative w-full min-h-screen flex items-center justify-center py-8">
        {/* 90% Width and Height Video Container */}
        <div className="w-[90vw] h-[90vh] rounded-2xl overflow-hidden shadow-2xl">
          {/* Video Slides */}
          {videos.map((video, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                index === currentVideo ? "opacity-100" : "opacity-0"
              }`}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag
              </video>

              {/* Overlay Content - Centered */}
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4">
                <div className="text-center">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                    {video.title.split(" ")[0]}{" "}
                    <span className="text-green-400">
                      {video.title.split(" ").slice(1).join(" ")}
                    </span>
                  </h1>
                  <p className="mt-4 text-white text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
                    {video.description}
                  </p>
                  <a
                    href="/marketplace"
                    className="mt-6 inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full transition transform hover:scale-105 text-base md:text-lg"
                  >
                    Explore Latest Collection
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Video Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToVideo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentVideo
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
      {/* <CarCards /> */}
    </>
  );
}
