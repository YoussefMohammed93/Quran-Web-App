import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";

export default function Main() {
  const data = [
    { value: 114, label: "سورة" },
    { value: 30, label: "جزء" },
    { value: 6236, label: "آية" },
    { value: 60, label: "حزب" },
    { value: 86, label: "سورة مكية" },
    { value: 28, label: "سورة مدنية" },
  ];

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
      <section className="px-5 py-12 bg-[#1f4636]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 border-2 xl:border-none p-5"
              >
                <h2 className="text-white text-2xl sm:text-3xl font-semibold sm:font-bold">
                  {item.value}
                </h2>
                <p className="text-green-500 text-2xl font-semibold sm:font-bold">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-0">
            <div className="flex justify-center md:justify-start">
              <Image src="/quran.png" alt="quran" width={320} height={320} />
            </div>
            <p className="text-xl text-gray-600">
              القرآن الكريم هو كتاب عظيم, يُعد مصدر الهداية والإرشاد للمسلمين في
              جميع أنحاء العالم, انه ليس مجرد كتاب ديني , بل هو كنز من الحكمة
              والعلم يحتضن في آياته معانٍ عميقة ودروساً لا تنضب .
              <br />
              <br />
              كما يعتبر القرآن الكريم من المعجزات العظيمة والخالدة التي جاءت
              لتأكيد صدق نبوة سيدنا محمد صل الله عليه وسلم, لذلك هو رسالة من
              الله عز وجل الى البشرية ترشدهم الى الطريق الصحيح .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
