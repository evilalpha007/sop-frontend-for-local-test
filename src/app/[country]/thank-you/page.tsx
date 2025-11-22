import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const ThankYouPage = () => {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center text-center"
      style={{ backgroundImage: "url('/bann.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative w-[550px] overflow-hidden rounded-lg border-2 border-[#fcf5d6] bg-black bg-opacity-80 p-6 text-white">
        <h2 className="mb-4 text-2xl font-bold uppercase tracking-wider text-[#b59770]">
          Thank you for your interest
        </h2>
        <p className="text-lg font-medium">
          We’ve received your request, and our team will connect with you soon.
        </p>

        <div className="my-4 flex items-center justify-center gap-4">
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-[#d4a760] to-transparent"></div>
          <span className="text-lg font-bold uppercase">MEANWHILE,</span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-[#d4a760] to-transparent"></div>
        </div>

        <p className="text-sm uppercase text-gray-300">
          Stay ahead in India’s real estate market with{" "}
          <span className="font-bold text-[#c7a57a]">
            expert insights and trends!
          </span>
        </p>

        <a
          href="https://www.silveroakglobal.com/in/blogs"
          className="mt-4 inline-block rounded-full border-2 border-[#e5d191] bg-[#b59770] px-6 py-3 font-bold text-black transition-transform duration-300 hover:scale-105"
        >
          READ LATEST UPDATES
        </a>

        <div className="mt-6 flex justify-center gap-10">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#fcf5d6]">
              <a href="tel:+918884418110">
                <FaPhoneAlt className="rotate-12 transform text-lg text-[#fcf5d6]" />
              </a>
            </div>
            <a href="tel:+918884418110" className="mt-2 text-sm text-white">
              Call Us
            </a>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#fcf5d6]">
              <a href="mailto:info@silveroakglobal.in">
                <FaEnvelope className="text-lg text-[#fcf5d6]" />
              </a>
            </div>
            <a
              href="mailto:info@silveroakglobal.in"
              className="mt-2 text-sm text-white"
            >
              Email
            </a>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#fcf5d6]">
              <a href="https://wa.aisensy.com/jHtGxl">
                <FaWhatsapp className="text-lg text-[#fcf5d6]" />
              </a>
            </div>
            <a
              href="https://wa.aisensy.com/jHtGxl"
              className="mt-2 text-sm text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
