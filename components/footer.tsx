import Link from "next/link";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const footerItems = [
    { href: "/prayer-times", label: "مواقيت الصلاة" },
    { href: "/quran", label: "القرآن الكريم" },
    { href: "/azkar", label: "الأذكار" },
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=61552702670893",
      icon: (
        <FontAwesomeIcon icon={faFacebook} className="text-3xl sm:text-2xl" />
      ),
      className: "text-sky-500 transition",
    },
    {
      href: "https://www.instagram.com/youssef_mohamed.93",
      icon: (
        <FontAwesomeIcon icon={faInstagram} className="text-3xl sm:text-2xl" />
      ),
      className: "text-pink-500 transition",
    },
    {
      href: "https://www.linkedin.com/in/youssef-mohammed-6893a031b/",
      icon: (
        <FontAwesomeIcon icon={faLinkedin} className="text-3xl sm:text-2xl" />
      ),
      className: "text-white transition",
    },
  ];

  return (
    <footer className="bg-[#1c3f39] py-12 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">حول</h3>
            <p className="text-sm text-white leading-7">
              مرحباً بكم في موقعنا, حيث تجدون كل ما يخص القرآن الكريم ومواقيت
              الصلاة مع أدوات مميزة تساعدكم على التذكير اليومي بالأذكار.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">روابط سريعة</h3>
            <ul className="space-y-2">
              {footerItems.map((item) => (
                <li
                  key={item.href}
                  className="text-white hover:text-gray-400 transition duration-200"
                >
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">تابعنا</h3>
            <ul className="flex gap-x-5">
              {socialLinks.map((link, index) => (
                <li
                  key={index}
                  className="hover:scale-125 transition-all duration-200"
                >
                  <Link
                    href={link.href}
                    className={link.className}
                    target="_blank"
                  >
                    {link.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>© 2024 جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
