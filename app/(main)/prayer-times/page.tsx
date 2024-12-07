"use client";

import { Loader } from "lucide-react";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import ScrollToTopButton from "@/components/scroll-to-top-button";

function convertTo12HourFormat(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  let suffix = "ص";
  let newHours = hours;

  if (newHours >= 12) {
    suffix = "م";
    if (newHours > 12) {
      newHours -= 12;
    }
  } else if (newHours === 0) {
    newHours = 12;
  }

  return `${newHours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
}

function convertTo24HourFormat(time: string): number {
  const [timePart, suffix] = time.split(" ");
  const [hours, minutes] = timePart.split(":").map(Number);
  let newHours = hours;

  if (suffix === "م" && newHours !== 12) {
    newHours += 12;
  } else if (suffix === "ص" && newHours === 12) {
    newHours = 0;
  }

  return newHours * 60 + minutes;
}

function calculateTimeDifference(
  nextPrayerTime: number,
  currentMinutes: number
): string {
  let difference = nextPrayerTime - currentMinutes;

  if (difference < 0) {
    difference += 24 * 60;
  }

  const hours = Math.floor(difference / 60);
  const minutes = Math.floor(difference % 60);
  const seconds = 60 - new Date().getSeconds();

  return `${hours} ساعة : ${minutes} دقيقة : ${seconds} ثانية`;
}

type PrayerTime = {
  prayer_times: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  date: {
    date_en: string;
  };
  meta: {
    timezone: string;
  };
};

export default function PrayerTimes() {
  const [prayerData, setPrayerData] = useState<PrayerTime | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        const response = await fetch(
          "https://alquran.vip/APIs/getPrayerTimes.php"
        );
        const data: PrayerTime = await response.json();

        setPrayerData(data);

        calculateNextPrayer(data);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    }

    function calculateNextPrayer(data: PrayerTime) {
      const currentTime = new Date();
      const currentMinutes =
        currentTime.getHours() * 60 + currentTime.getMinutes();

      const prayerTimes = [
        { name: "الفجر", time: convertTo24HourFormat(data.prayer_times.Fajr) },
        {
          name: "الشروق",
          time: convertTo24HourFormat(data.prayer_times.Sunrise),
        },
        { name: "الظهر", time: convertTo24HourFormat(data.prayer_times.Dhuhr) },
        { name: "العصر", time: convertTo24HourFormat(data.prayer_times.Asr) },
        {
          name: "المغرب",
          time: convertTo24HourFormat(data.prayer_times.Maghrib),
        },
        { name: "العشاء", time: convertTo24HourFormat(data.prayer_times.Isha) },
      ];

      for (let i = 0; i < prayerTimes.length; i++) {
        if (prayerTimes[i].time > currentMinutes) {
          setNextPrayer(prayerTimes[i].name);
          startCountdown(prayerTimes[i].time, currentMinutes);
          break;
        }
      }
    }

    function startCountdown(nextPrayerTime: number, currentMinutes: number) {
      const interval = setInterval(() => {
        const newCountdown = calculateTimeDifference(
          nextPrayerTime,
          currentMinutes
        );
        setCountdown(newCountdown);

        currentMinutes = new Date().getHours() * 60 + new Date().getMinutes();

        if (countdown === "0 ساعة : 0 دقيقة : 0 ثانية") {
          clearInterval(interval);
        }
      }, 1000);
    }

    fetchPrayerTimes();
  }, [countdown]);

  if (!prayerData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24">
        <h1 className="text-2xl font-bold text-center mb-8">
          مواقيت الصلاة حسب التوقيت المحلي لبلدك
        </h1>
        <div className="max-w-5xl mx-auto px-5">
          <table className="w-full text-center">
            <thead>
              <tr className="bg-primary/80 text-white">
                <th>الصلاة</th>
                <th>الوقت</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={`text-lg font-semibold ${
                  nextPrayer === "الفجر" ? "bg-yellow-100" : ""
                }`}
              >
                <td>الفجر</td>
                <td>{convertTo12HourFormat(prayerData.prayer_times.Fajr)}</td>
              </tr>
              <tr
                className={`text-lg font-semibold ${
                  nextPrayer === "الشروق" ? "bg-yellow-100" : ""
                }`}
              >
                <td>الشروق</td>
                <td>
                  {convertTo12HourFormat(prayerData.prayer_times.Sunrise)}
                </td>
              </tr>
              <tr
                className={`text-lg font-semibold ${
                  nextPrayer === "الظهر" ? "bg-yellow-100" : ""
                }`}
              >
                <td>الظهر</td>
                <td>{convertTo12HourFormat(prayerData.prayer_times.Dhuhr)}</td>
              </tr>
              <tr
                className={`text-lg font-semibold ${
                  nextPrayer === "العصر" ? "bg-yellow-100" : ""
                }`}
              >
                <td>العصر</td>
                <td>{convertTo12HourFormat(prayerData.prayer_times.Asr)}</td>
              </tr>
              <tr
                className={`text-lg font-semibold ${
                  nextPrayer === "المغرب" ? "bg-yellow-100" : ""
                }`}
              >
                <td>المغرب</td>
                <td>
                  {convertTo12HourFormat(prayerData.prayer_times.Maghrib)}
                </td>
              </tr>
              <tr
                className={`text-lg font-semibold ${
                  nextPrayer === "العشاء" ? "bg-yellow-100" : ""
                }`}
              >
                <td>العشاء</td>
                <td>{convertTo12HourFormat(prayerData.prayer_times.Isha)}</td>
              </tr>
            </tbody>
          </table>
          {nextPrayer && (
            <h2 className="text-xl text-center mt-4">
              العد التنازلي للصلاة التالية : {nextPrayer}
            </h2>
          )}
          <div className="flex justify-center">
            <h3 className="text-lg text-center mt-2">
              {countdown || <Skeleton className="w-56 h-10 rounded-sm" />}
            </h3>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
