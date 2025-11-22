import React from "react";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const ThankYou = () => {
  return (
    <div
      className="relative flex h-screen items-center justify-center bg-cover bg-center text-center"
      style={{ backgroundImage: "url('/bannerdubai.jpeg')" }}
    >
      <div className="absolute inset-0 -z-10 bg-black opacity-60 blur-[0.5px]"></div>
      <div className="relative z-10 w-[550px] overflow-hidden rounded-lg border-2 border-[#fcf5d6] bg-black bg-opacity-80 p-6 text-white">
        <div className="absolute inset-0 -z-10 m-1 rounded-lg bg-gradient-to-r from-black to-[#01112b]"></div>
        <h2 className="mb-4 font-serif text-2xl font-bold uppercase tracking-widest text-[#b59770]">
          Thank you for your interest
        </h2>
        <p className="mb-5 font-sans text-lg font-medium tracking-wide">
          We’ve received your request, and our team will connect with you soon.
        </p>
        <div className="mb-2 flex items-center justify-center gap-4">
          <div className="h-1 w-12 bg-gradient-to-r from-transparent to-[#d4a760]" />
          <div className="text-xl font-bold uppercase tracking-wider text-white">
            MEANWHILE,
          </div>
          <div className="h-1 w-12 bg-gradient-to-l from-transparent to-[#d4a760]" />
        </div>
        <div className="mb-5 text-sm uppercase tracking-wider text-[#b8b8b8]">
          stay ahead in Dubai’s real estate market with{" "}
          <span className="font-bold text-[#c7a57a]">
            expert insights and trends!
          </span>
        </div>
        <a
          className="inline-block w-[300px] rounded-full border-2 border-[#e5d191] bg-[#b59770] px-6 py-2.5 font-bold text-black transition-all hover:bg-[#c7a57a]"
          href="https://www.silveroakglobal.com/blogs"
        >
          READ LATEST UPDATES
        </a>
        <div className="mt-5 flex justify-center gap-10">
          <div className="flex flex-col items-center">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#fcf5d6] bg-transparent">
              <a href="tel:+97180055555">
                <FaPhoneAlt className="rotate-[107deg] transform text-lg text-[#fcf5d6]" />
              </a>
            </div>
            <a className="mt-2 text-xs text-white" href="tel:+97180055555">
              Call Us
            </a>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#fcf5d6] bg-transparent">
              <a href="mailto:info@silveroakglobal.com">
                <FaEnvelope className="text-lg text-[#fcf5d6]" />
              </a>
            </div>
            <a
              className="mt-2 text-xs text-white"
              href="mailto:info@silveroakglobal.com"
            >
              Email
            </a>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#fcf5d6] bg-transparent">
              <a href="https://wa.aisensy.com/74Xxd4">
                <FaWhatsapp className="text-lg text-[#fcf5d6]" />
              </a>
            </div>
            <a
              className="mt-2 text-xs text-white"
              href="https://wa.aisensy.com/74Xxd4"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
