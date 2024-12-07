"use client";

import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import { Loader, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";

type Ayah = {
  id: number;
  text: string;
  number_in_surah: string;
  number: string;
};

type Surah = {
  id: string;
  name_ar: string;
};

export default function SurahPage() {
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [surahName, setSurahName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { surahId } = useParams();

  const surahNumber = parseInt(
    Array.isArray(surahId) ? surahId[0] : surahId || "1"
  );

  const previousSurah = surahNumber > 1 ? surahNumber - 1 : null;
  const nextSurah = surahNumber < 114 ? surahNumber + 1 : null;

  useEffect(() => {
    if (!surahId) return;

    const fetchSurahName = async () => {
      try {
        const response = await fetch("https://alquran.vip/APIs/surahs");
        if (!response.ok) {
          throw new Error("Failed to fetch surahs.");
        }

        const data: Surah[] = await response.json();
        const surah = data.find((surah) => parseInt(surah.id) === surahNumber);

        if (surah) {
          setSurahName(surah.name_ar);
        } else {
          setSurahName("غير معروف");
        }
      } catch (error) {
        console.error(error);
        setError("حدث خطأ أثناء تحميل اسم السورة.");
      }
    };

    const fetchAyahs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://alquran.vip/APIs/ayah?number=${surahId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ayahs.");
        }

        const data = await response.json();
        setAyahs(data);
      } catch (error) {
        console.error(error);
        setError("حدث خطأ أثناء تحميل الآيات.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurahName();
    fetchAyahs();
  }, [surahId, surahNumber]);

  const handleNavigation = (surahId: number | null) => {
    if (surahId) {
      router.push(`/quran/surah/${surahId}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="size-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col space-y-3 items-center justify-center">
        <AlertTriangle className="size-8 text-destructive" />
        <p className="text-lg text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative pt-[88px] pb-12 px-5">
        <div className="max-w-7xl mx-auto">
          {ayahs.length === 0 ? (
            <div className="h-[50vh] flex items-center justify-center">
              <div className="flex items-center flex-col space-y-3 text-center text-lg text-muted-foreground">
                <AlertTriangle className="text-destructive size-8" />
                <p>تأكد من صحة الرابط.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="text-3xl font-semibold text-primary border p-5 rounded-md">
                  {surahName}
                </h2>
              </div>
              <ul className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-3">
                {ayahs.map((ayah, index) => (
                  <li
                    key={ayah.id}
                    className="flex items-center flex-wrap gap-3"
                  >
                    <span className="contents sm:w-max text-lg font-semibold">
                      <p>{ayah.text}</p>
                      <span
                        className="inline-flex items-center justify-center w-[35px] h-[35px] bg-primary/20 text-primary"
                        style={{
                          clipPath:
                            "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
                        }}
                      >
                        {index + 1}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="h-[10vh] sm:h-[30vh] flex justify-between items-end border-t mt-5">
                <Button
                  onClick={() => handleNavigation(previousSurah)}
                  disabled={!previousSurah}
                  className="disabled:opacity-50"
                >
                  <ChevronRight />
                  السورة السابقة
                </Button>

                <Button
                  onClick={() => handleNavigation(nextSurah)}
                  disabled={!nextSurah}
                  className="text-base disabled:opacity-50"
                >
                  السورة التالية <ChevronLeft />
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
