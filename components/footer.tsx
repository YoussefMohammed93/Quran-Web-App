import Link from "next/link";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const footerItems = [
    { href: "/quran", label: "القرآن الكريم" },
    { href: "/prayer-times", label: "مواقيت الصلاة" },
    { href: "/azkar", label: "الأذكار" },
    { href: "/duas", label: "الأدعية" },
  ];

  const socialLinks = [
    {
      href: "",
      icon: (
        <FontAwesomeIcon icon={faFacebook} className="text-3xl sm:text-2xl" />
      ),
      className: "text-sky-500 transition",
    },
    {
      href: "",
      icon: (
        <FontAwesomeIcon icon={faLinkedin} className="text-3xl sm:text-2xl" />
      ),
      className: "text-white transition",
    },
    {
      href: "",
      icon: (
        <FontAwesomeIcon icon={faInstagram} className="text-3xl sm:text-2xl" />
      ),
      className: "text-pink-500 transition",
    },
    {
      href: "",
      icon: (
        <FontAwesomeIcon icon={faGithub} className="text-3xl sm:text-2xl" />
      ),
      className: "text-black transition",
    },
  ];

  return (
    <footer className="bg-[#1c3f39] py-12 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">حول</h3>
            <p className="text-sm text-white leading-7">
              مرحباً بكم في موقعنا, حيث تجدون كل ما يخص القرآن الكريم والأدعية
              ومواقيت الصلاة مع أدوات مميزة تساعدكم على التذكير اليومي بالأذكار.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">روابط سريعة</h3>
            <ul className="space-y-2">
              {footerItems.map((item) => (
                <li key={item.href} className="text-white">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">تابعنا</h3>
            <ul className="flex gap-x-5">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className={link.className}>
                    {link.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-300">
          <p>© 2024 جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
