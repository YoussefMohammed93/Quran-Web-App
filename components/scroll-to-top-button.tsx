"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed cursor-pointer flex z-50 items-center opacity-100 sm:opacity-80 justify-center border-none w-16 h-16 text-xl bottom-12 sm:bottom-5 text-white transition-all bg-primary hover:bg-primary/90 hover:opacity-100 rounded-full duration-300 ${
        showButton ? "right-4" : "-right-16"
      }`}
      onClick={scrollToTop}
    >
      <ChevronUp className="size-8" />
    </button>
  );
};

export default ScrollToTopButton;
