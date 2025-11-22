"use client";

import { useState } from "react";
import NextImage from "@/components/elements/images/NextImage";
import Typography from "@/components/elements/texts/Typography";
import Link from "next/link";

export interface IPropertyCardProps {
  id: string | number;
  image?: string | null;
  alt?: string | null;
  title?: string | null;
  price?: string | null;
  currency?: string | null;
  location?: string | null;
  discount?: string | null;
  bed?: string | number | null;
  bath?: string | number | null;
  area?: string | number | null;
  areaUnit?: string | null;
  phone?: string | number | null;
  email?: string | null;
  slug: string | null;
  country: string | null | undefined;
  is_front_section: number | null;
}

// Contact Popup Component - BLACK THEME
const ContactPopup = ({ 
  isOpen, 
  onClose, 
  propertyTitle, 
  propertyImage,
  country 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  propertyTitle?: string | null; 
  propertyImage?: string | null;
  country?: string | null; 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  // Country wise phone code
  const getCountryCode = () => {
    return country === "in" ? "+91" : "+971";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-theme-light-golden rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        
        {/* Close Button - Inside Popup Top Right Corner */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-theme-light-golden hover:text-white transition duration-300 z-10"
        >
          ×
        </button>

        {/* Header Section */}
        <div className="text-center py-4 px-4 border-b border-theme-light-golden border-opacity-30">
          <div className="flex justify-center mb-2">
            <NextImage
              src="/images/logo/primary-logo.svg"
              alt="Company Logo"
              width={120}
              height={40}
              className="h-12 w-auto"
            />
          </div>

          <Typography as="h3" className="text-lg font-bold text-theme-light-golden mb-1">
            Interested in {propertyTitle || "this property"}?
          </Typography>
          <Typography as="p" className="text-gray-300 text-sm">
            Get the best deal with our expert consultation
          </Typography>
        </div>

        <div className="flex flex-col md:flex-row">
          
          {/* Left Side - Property Image - HIDDEN ON MOBILE */}
          <div className="hidden md:flex md:w-2/5 p-2">
            <div className="flex-1 flex items-center justify-center">
              <NextImage
                src={propertyImage || "/images/dubai-property.jpg"}
                alt={propertyTitle || "Property"}
                width={500}
                height={500}
                className="w-full h-full max-h-96 object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="w-full md:w-3/5 p-3 md:m-3">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 ">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-theme-light-golden text-white placeholder-gray-400 text-sm"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number *
                </label>
                <div className="flex">
                  <div className="flex items-center px-2 bg-gray-700 border border-r-0 border-gray-600 rounded-l-md text-gray-300 text-xs">
                    {getCountryCode()}
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-r-md focus:outline-none focus:ring-1 focus:ring-theme-light-golden text-white placeholder-gray-400 text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-theme-light-golden text-white placeholder-gray-400 text-sm"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-theme-light-golden text-gray-900 py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300 font-semibold text-sm mt-2"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyCard = ({
  image,
  alt,
  title,
  price,
  currency,
  location,
  discount,
  bed,
  bath,
  area,
  areaUnit,
  phone,
  email,
  slug,
  country,
  is_front_section,
}: IPropertyCardProps) => {
  const [showContactPopup, setShowContactPopup] = useState(false);

  // Property detail URL
  const propertyUrl = country === "in" 
    ? `/${country}/properties/${slug ?? ""}`
    : `/properties/${slug ?? ""}`;

  const handleContactClick = (type: "phone" | "email" | "whatsapp") => {
    setShowContactPopup(true);
  };

  const shareProperty = () => {
    if (typeof window === "undefined") return;
    const url = window.location.origin + propertyUrl;

    if (navigator.share) {
      navigator.share({
        title: title || "Property",
        text: `Check out this property: ${title}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between border border-theme-light-golden relative group cursor-pointer bg-transparent hover:shadow-lg hover:shadow-theme-light-golden/10 transition duration-300">
        {/* Image Section */}
        <Link 
          href={propertyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative overflow-clip border-b border-b-theme-light-golden block"
        >
          <NextImage
            src={image || "/images/default-property.jpg"}
            alt={alt || title || "Property"}
            width={350}
            height={250}
            className="!z-0 transition duration-500 group-hover:scale-105 w-full"
          />
        </Link>

        <div className="flex h-full flex-col justify-between p-4">
          {/* Title & Price Section */}
          <Link
            href={propertyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-3"
          >
            <div className="flex flex-col gap-2">
              <Typography
                as="h4"
                className="text-wrap break-words text-base font-medium leading-tight text-theme-light-golden line-clamp-2 min-h-[2.5rem]"
              >
                {title}
              </Typography>

              <div className="flex flex-col gap-1">
                <Typography
                  as="h5"
                  className="text-wrap break-words font-roboto text-xl font-semibold tracking-wide text-theme-off-white"
                >
                  {currency}{" "}
                  {price ? new Intl.NumberFormat('en-US').format(Number(price)) : ""}
                </Typography>

                <div className="flex items-center gap-1 text-theme-off-white">
                  <NextImage
                    src="/svg-icons/property/location-pointer.svg"
                    alt="location-pointer"
                    width={12}
                    height={12}
                    disableBlur
                    className="h-3 w-3 shrink-0"
                  />
                  <Typography
                    as="p"
                    className="text-xs font-light text-theme-off-white truncate"
                  >
                    {location}
                  </Typography>
                </div>
              </div>
            </div>
          </Link>

          {/* Property Features */}
          <div className="flex items-center justify-between px-2 py-3 mb-2 border-t border-b border-theme-light-golden border-opacity-30">
            <div className="flex flex-col items-center text-center flex-1">
              <NextImage
                src="/svg-icons/property/bed.svg"
                alt="Bedrooms"
                width={24}
                height={24}
                disableBlur
                className="size-5 mb-1 text-theme-off-white"
              />
              <Typography
                as="p"
                className="text-sm font-medium text-theme-off-white"
              >
                {bed}
              </Typography>
            </div>

            <div className="flex flex-col items-center text-center flex-1">
              <NextImage
                src="/svg-icons/property/bath.svg"
                alt="Bathrooms"
                width={20}
                height={20}
                disableBlur
                className="size-5 mb-1 text-theme-off-white"
              />
              <Typography
                as="p"
                className="text-sm font-medium text-theme-off-white"
              >
                {bath}
              </Typography>
            </div>

            <div className="flex flex-col items-center text-center flex-1">
              <NextImage
                src="/svg-icons/property/area.svg"
                alt="Area"
                width={17}
                height={15}
                disableBlur
                className="size-5 mb-1 text-theme-off-white"
              />
              <Typography
                as="p"
                className="text-sm font-medium text-theme-off-white"
              >
                {area}
                {area ? areaUnit : ""}
              </Typography>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between px-1 gap-1">
            <button
              onClick={() => handleContactClick("phone")}
              className="flex flex-col items-center text-center flex-1 p-2 hover:bg-theme-light-golden hover:bg-opacity-10 rounded transition duration-300 group"
            >
              <NextImage
                src="/svg-icons/property/phone.svg"
                alt="Call"
                width={24}
                height={24}
                disableBlur
                className="size-5 mb-1 text-theme-off-white group-hover:animate-wiggle"
              />
              <span className="text-xs font-medium text-theme-off-white">Call</span>
            </button>

            <button
              onClick={() => handleContactClick("email")}
              className="flex flex-col items-center text-center flex-1 p-2 hover:bg-theme-light-golden hover:bg-opacity-10 rounded transition duration-300 group"
            >
              <NextImage
                src="/svg-icons/property/email.svg"
                alt="Email"
                width={24}
                height={24}
                disableBlur
                className="size-5 mb-1 text-theme-off-white group-hover:animate-bounce"
              />
              <span className="text-xs font-medium text-theme-off-white">Email</span>
            </button>

            <button
              onClick={() => handleContactClick("whatsapp")}
              className="flex flex-col items-center text-center flex-1 p-2 hover:bg-theme-light-golden hover:bg-opacity-10 rounded transition duration-300 group"
            >
              <NextImage
                src="/svg-icons/property/WhatsappIcon.svg"
                alt="WhatsApp"
                width={24}
                height={24}
                disableBlur
                className="size-5 mb-1 text-theme-off-white group-hover:scale-110"
              />
              <span className="text-xs font-medium text-theme-off-white">WhatsApp</span>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                shareProperty();
              }}
              className="flex flex-col items-center text-center flex-1 p-2 hover:bg-theme-light-golden hover:bg-opacity-10 rounded transition duration-300 group"
            >
              <NextImage
                src="/svg-icons/property/ShareIcon.svg"
                alt="Share Property"
                width={50}
                height={50}
                disableBlur
                className="size-5 mb-1 text-theme-off-white group-hover:scale-110"
              />
              <span className="text-xs font-medium text-theme-off-white">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Popup */}
      <ContactPopup
        isOpen={showContactPopup}
        onClose={() => setShowContactPopup(false)}
        propertyTitle={title}
        propertyImage={image}
        country={country}
      />
    </>
  );
};

export default PropertyCard;
