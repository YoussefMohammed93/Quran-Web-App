"use client";

import Link from "next/link";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader, Search } from "lucide-react";
import ScrollToTopButton from "@/components/scroll-to-top-button";

type Surah = {
  id: string;
  number: string;
  name_ar: string;
};

export default function Quran() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://alquran.vip/APIs/surahs");

        if (!response.ok) {
          throw new Error("Failed to fetch surahs.");
        }

        const data = await response.json();
        setSurahs(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load surahs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter((surah) =>
    surah.name_ar.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <p className="text-lg text-muted-foreground">
          لقد حدث خطأ أثناء تحميل السور.
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative py-28 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-5">
            <Input
              type="text"
              placeholder="ابحث عن سورة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-2"
            />
            <Search className="absolute left-3 top-1.5" />
          </div>
          {filteredSurahs.length === 0 ? (
            <div className="h-[35vh] text-center text-lg text-muted-foreground">
              لا توجد نتائج.
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSurahs.map((surah) => (
                <li
                  key={surah.id}
                  className="flex flex-col border rounded-md shadow-sm space-y-3 p-5"
                >
                  <p className="max-w-fit text-lg font-semibold text-primary px-3.5 py-1.5 bg-primary/10 rounded-full">
                    {surah.number}
                  </p>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{surah.name_ar}</h2>
                    <Button asChild className="text-base">
                      <Link href={`/quran/surah/${surah.id}`}>
                        قراءة السورة
                      </Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
