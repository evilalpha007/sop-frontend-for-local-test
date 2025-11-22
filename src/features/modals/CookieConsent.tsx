"use client";

import { useEffect, useState } from "react";
import PrimaryButton from "@/components/elements/buttons/PrimaryButton";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-theme-black/90 p-4 text-center text-theme-off-white"
        >
          <div className="mx-auto max-w-2xl">
            <p className="mb-4">
              We use cookies to enhance your experience. By continuing to visit
              this site, you agree to our use of cookies.{" "}
              <Link
                href="/privacy-policy"
                className="text-theme-primary hover:text-theme-primary-dark underline"
              >
                Learn more
              </Link>
            </p>
            <div className="flex items-center justify-center gap-4">
              <PrimaryButton onClick={handleAccept}>Accept</PrimaryButton>
              <button
                onClick={handleDecline}
                className="hover:text-theme-primary px-6 py-2 text-theme-off-white underline"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
