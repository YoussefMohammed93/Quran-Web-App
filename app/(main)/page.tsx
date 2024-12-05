import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function Main() {
  return (
    <>
      <Navbar />
      <main
        className="w-full h-screen bg-cover bg-center relative px-5"
        style={{ backgroundImage: 'url("/bg.jpg")' }}
      >
        <div className="h-screen flex items-center max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-black/50"></div>
          <div>
            <h1 className="relative text-2xl sm:text-4xl font-bold z-10 text-white">
              أهلاً بكم في موقع نبض القرآن.
            </h1>
            <p className="relative sm:text-lg font-semibold leading-8 sm:leading-10 max-w-2xl z-10 text-white mt-6">
              مرحباً بكم في موقعنا, حيث تجدون كل ما يخص القرآن الكريم والأدعية
              ومواقيت الصلاة مع أدوات مميزة تساعدكم على التذكير اليومي بالأذكار.
            </p>
            <div className="relative z-10 mt-10">
              <Link
                href="/"
                className="relative sm:text-lg font-semibold px-10 py-1.5 border-2 border-white text-white overflow-hidden group"
              >
                <span className="relative z-20 transition-colors duration-300 group-hover:text-black">
                  اٍكتشف المزيد
                </span>
                <span className="absolute inset-0 w-full h-full bg-white transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-right z-10"></span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
