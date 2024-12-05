"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

  const navItems = [
    { href: "/", label: "الرئيسية" },
    { href: "/quran", label: "القرآن الكريم" },
    { href: "/prayer-times", label: "مواقيت الصلاة" },
    { href: "/azkar", label: "الأذكار" },
    { href: "/duas", label: "الأدعية" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 py-2.5 px-5 border-b shadow-sm z-50 transition-transform duration-300 bg-white ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        <nav className="hidden md:block">
          <ul className="inline-flex gap-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    pathname === item.href
                      ? "text-lg font-bold text-primary"
                      : "text-lg font-bold hover:text-primary transition duration-200"
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="size-6" />
        </button>
      </div>
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-secondary shadow-md transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible -translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 left-4 p-2 text-muted-foreground"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
        <ul className="h-full flex flex-col items-center justify-center gap-8 py-10 px-5">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={
                  pathname === item.href
                    ? "text-xl font-bold text-primary"
                    : "text-xl font-bold hover:text-primary transition duration-200"
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
