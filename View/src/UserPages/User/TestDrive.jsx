import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Nav from "../Common/Nav";
import Footer from "../Common/Footer";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", 
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

export default function TestDrive() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get day names for the calendar
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Generate calendar days with proper day of week
  const calendarDays = [];
  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long.");
      return false;
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }
    if (!selectedDate) {
      toast.error("Please select a date.");
      return false;
    }
    if (!selectedTime) {
      toast.error("Please select a time.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    toast.success(
      `Test drive booked for ${selectedDate} at ${selectedTime}. We'll contact you shortly to confirm.`
    );
    setTimeout(() => navigate("/"), 2000);
  };

  const isFormValid = 
    name.trim().length >= 3 && 
    /^\d{10}$/.test(phone) && 
    selectedDate && 
    selectedTime;

  const nextStep = () => {
    if (currentStep === 1 && name.trim().length >= 3 && /^\d{10}$/.test(phone)) {
      setCurrentStep(2);
    } else if (currentStep === 1) {
      toast.error("Please complete your contact information first.");
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <Nav />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Schedule Your <span className="text-blue-600">Test Drive</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the thrill of driving your dream car. Select your preferred date and time for a personalized test drive.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center">
              <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <span className="text-sm mt-2">Your Details</span>
              </div>
              <div className="w-16 h-1 mx-2 bg-gray-300"></div>
              <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <span className="text-sm mt-2">Date & Time</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            {/* Left Panel - Info Card */}
            <div className="lg:w-2/5 w-full">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Personalized Experience</h3>
                    <p className="text-sm text-gray-600">Tailored to your preferences</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No obligation to purchase</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Expert guidance from our team</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Convenient scheduling</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Need assistance?</h4>
                  <p className="text-sm text-blue-700">Call us at <span className="font-semibold">1-800-RIVUS-TD</span></p>
                </div>
              </div>
            </div>

            {/* Right Panel - Booking Form */}
            <div className="lg:w-3/5 w-full">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                {currentStep === 1 ? (
                  /* Step 1: Contact Information */
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email (optional)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter your 10-digit phone number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
                      <button 
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition"
                        onClick={() => navigate(-1)}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={nextStep}
                        disabled={!name.trim() || !/^\d{10}$/.test(phone)}
                        className={`px-6 py-3 rounded-lg transition ${
                          name.trim() && /^\d{10}$/.test(phone)
                            ? "bg-blue-600 text-white hover:bg-blue-700" 
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Continue to Scheduling
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Step 2: Date & Time Selection */
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
                    
                    <div className="mb-8">
                      <h3 className="font-semibold mb-4 text-gray-900">Choose a Date:</h3>
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <div className="grid grid-cols-7 gap-2 mb-3 text-center text-sm text-gray-600 font-medium">
                          {dayNames.map(day => (
                            <div key={day} className="py-2">{day}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center text-sm">
                          {calendarDays.map((day, index) => {
                            const isSelected = selectedDate === day;
                            const isAvailable = day !== null;
                            return (
                              <button
                                key={index}
                                disabled={!isAvailable}
                                className={`py-3 rounded-xl transition duration-200 ${
                                  !isAvailable 
                                    ? "bg-transparent" 
                                    : isSelected
                                      ? "bg-blue-600 text-white font-semibold shadow-md"
                                      : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                                }`}
                                onClick={() => isAvailable && setSelectedDate(day)}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="font-semibold mb-4 text-gray-900">Available Time Slots:</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            className={`py-3 px-2 rounded-xl border text-center transition duration-200 ${
                              selectedTime === time
                                ? "bg-blue-600 text-white border-blue-600 font-semibold shadow-md"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2">Your Test Drive Details:</h4>
                      <div className="text-sm text-blue-700">
                        <p><span className="font-semibold">Name:</span> {name}</p>
                        <p><span className="font-semibold">Phone:</span> {phone}</p>
                        {selectedDate && <p><span className="font-semibold">Date:</span> {selectedDate}</p>}
                        {selectedTime && <p><span className="font-semibold">Time:</span> {selectedTime}</p>}
                      </div>
                    </div>

                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                      <button 
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition"
                        onClick={prevStep}
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className={`px-8 py-3 rounded-lg transition ${
                          isFormValid 
                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" 
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Confirm Test Drive
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}