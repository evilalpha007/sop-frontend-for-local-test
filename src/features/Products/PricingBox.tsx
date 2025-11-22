"use client";
import { nextFetch } from "@/library/utils/next-fetch";
import { useEffect, useMemo, useState } from "react";
import env from "@/config/env";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import { IoClose } from "react-icons/io5";
import BrochureForm from "../Experts/BrochureForm";

interface IPricingProps {
  data: any;
  info?: {
    title: string;
    price: string;
    size: string;
    bedrooms: number;
    washrooms: number;
    address: string;
  };
  country?: string;
  id?: number;
  slug?: string;
}

const PricingBox = ({ data, country = "uae", id, slug }: IPricingProps) => {
  // ✅ useMemo used to avoid re-creation of arrays on every render
  const originalCurrencies = useMemo(() => ["INR", "AED", "USD"], []);
  const currencies = useMemo(
    () => [...originalCurrencies, ...originalCurrencies],
    [originalCurrencies]
  );

  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(
    country === "in" ? 0 : 1
  );
  const [dragStartY, setDragStartY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState<number | null>(null);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  // Fetch converted price
  const fetchConvertedPrice = async (
    from: string,
    to: string,
    amount: number
  ) => {
    try {
      const res = await nextFetch<any>(
        `v1/auth/convert-currency?from=${from}&to=${to}&amount=${amount}`,
        {
          next: {
            revalidate: env.NEXT_PUBLIC_API_CACHE_TIME_IN_SECONDS,
          },
        }
      );
      if (res?.converted_amount) {
        setConvertedPrice(res.converted_amount);
      }
    } catch (error) {
      console.error("Failed to fetch converted price:", error);
      setConvertedPrice(null);
    }
  };

  // Handle currency change
  useEffect(() => {
    const currentCurrency =
      currencies[currentCurrencyIndex % originalCurrencies.length];
    const baseCurrency = country === "in" ? "INR" : "AED";
    const basePrice = data?.property_information?.price || 0;

    if (currentCurrency !== baseCurrency) {
      fetchConvertedPrice(baseCurrency, currentCurrency, basePrice);
    } else {
      setConvertedPrice(null);
    }
  }, [
    currentCurrencyIndex,
    country,
    data?.property_information?.price,
    currencies,
    originalCurrencies.length,
  ]);

  // Infinite loop effect
  useEffect(() => {
    if (currentCurrencyIndex === originalCurrencies.length * 2 - 1) {
      setCurrentCurrencyIndex(originalCurrencies.length - 1);
    } else if (currentCurrencyIndex === 0) {
      setCurrentCurrencyIndex(originalCurrencies.length);
    }
  }, [currentCurrencyIndex, originalCurrencies.length]);

  // Mouse dragging events
  const handleMouseDown = (event: React.MouseEvent) => {
    setDragStartY(event.clientY);
    setDragging(true);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragging) return;

    const dragDistance = event.clientY - dragStartY;

    if (dragDistance > 50) {
      handlePreviousCurrency();
      setDragging(false);
    } else if (dragDistance < -50) {
      handleNextCurrency();
      setDragging(false);
    }
  };

  const handleMouseUp = () => setDragging(false);
  const handleNextCurrency = () =>
    setCurrentCurrencyIndex((prevIndex) => prevIndex + 1);
  const handlePreviousCurrency = () =>
    setCurrentCurrencyIndex((prevIndex) => prevIndex - 1);

  // Booking form handlers
  const openBookingForm = () => setIsBookingFormOpen(true);
  const closeBookingForm = () => setIsBookingFormOpen(false);

  // Determine displayed price and currency
  const displayPrice =
    convertedPrice !== null
      ? convertedPrice
      : data?.property_information?.price || 0;

  const displayCurrency =
    currencies[currentCurrencyIndex % originalCurrencies.length];

  return (
    <div className="flex w-full items-center justify-between">
      {/* Pricing Section */}
      <div className="flex flex-col">
        <span className="text-xs font-light md:text-sm">Starting From</span>
        <div className="-mt-1 flex w-full flex-row items-center justify-start gap-5 md:mt-0">
          <span className="min-w-[90px] text-[16px] font-light md:min-w-[180px] md:text-xl lg:min-w-[220px] lg:text-2xl 2xl:min-w-[300px] 2xl:text-4xl">
            {displayCurrency}{" "}
            {new Intl.NumberFormat("en-US", { style: "decimal" }).format(
              displayPrice
            )}
          </span>

          <div className="flex w-fit flex-row items-center justify-center">
            {/* Currency Selector */}
            <div
              className="relative ml-4 flex h-[40px] w-[30px] cursor-move select-none flex-col items-center justify-center overflow-hidden text-center md:h-[50px] md:w-[50px]"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Shadow fade effect */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[30px] bg-gradient-to-b from-theme-black to-transparent"></div>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[20px] bg-gradient-to-t from-theme-black to-transparent md:h-[30px]"></div>

              <div
                className="absolute left-0 top-1/2 -translate-y-[50%] transform transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateY(calc(-${currentCurrencyIndex * 16}% - 10%))`,
                }}
              >
                {currencies.map((currency, index) => (
                  <div
                    key={index}
                    className={`flex h-[20px] items-center justify-center text-center text-[10px] uppercase md:h-[20px] md:text-sm ${
                      index % originalCurrencies.length ===
                      currentCurrencyIndex % originalCurrencies.length
                        ? "text-theme-light-golden"
                        : "text-gray-400"
                    }`}
                  >
                    {currency}
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <div className="flex flex-col">
              <button
                onClick={handlePreviousCurrency}
                className="text-[10px] text-white hover:text-yellow-500 md:text-[18px]"
              >
                ↑
              </button>
              <button
                onClick={handleNextCurrency}
                className="text-[10px] text-white hover:text-yellow-500 md:text-[18px]"
              >
                ↓
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {isBookingFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-theme-black/80 p-5">
          <div className="relative w-full max-w-[500px] rounded-lg bg-theme-black p-6">
            <button
              onClick={closeBookingForm}
              className="absolute right-4 top-4 text-2xl text-theme-off-white"
              aria-label="Close modal"
            >
              <IoClose />
            </button>

            <BrochureForm
              country={country}
              slug={slug!}
              id={data?.id}
              closeForm={closeBookingForm}
            />
          </div>
        </div>
      )}

      {/* Button to open form */}
      <PrimaryButton onClick={openBookingForm} className="ml-4 px-6 py-2">
        Request Brochure
      </PrimaryButton>
    </div>
  );
};

export default PricingBox;
