import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import ScrollToTopButton from "@/components/scroll-to-top-button";

interface AzkarItem {
  id: number;
  text: string;
  count: number;
}

interface AzkarData {
  wake_up_azkar: AzkarItem[];
  evening_azkar: AzkarItem[];
  adhan_azkar: AzkarItem[];
  food_azkar: AzkarItem[];
  home_azkar: AzkarItem[];
  khala_azkar: AzkarItem[];
  morning_azkar: AzkarItem[];
  mosque_azkar: AzkarItem[];
  prayer_azkar: AzkarItem[];
  sleep_azkar: AzkarItem[];
  prayer_later_azkar: AzkarItem[];
}

export default async function Azkar() {
  const response = await fetch("https://alquran.vip/APIs/azkar");
  const data: AzkarData = await response.json();

  const categoryNames: { [key: string]: string } = {
    wake_up_azkar: "أذكار الاستيقاظ",
    evening_azkar: "أذكار المساء",
    adhan_azkar: "أذكار الأذان",
    food_azkar: "أذكار الطعام",
    home_azkar: "أذكار المنزل",
    khala_azkar: "أذكار الخلاء",
    morning_azkar: "أذكار الصباح",
    mosque_azkar: "أذكار المسجد",
    prayer_azkar: "أذكار الصلاة",
    prayer_later_azkar: "أذكار بعد الصلاة",
    sleep_azkar: "أذكار النوم",
    hajj_and_umrah_azkar: "أذكار الحج والعمرة",
    miscellaneous_azkar: "أذكار متنوعة",
    wudu_azkar: "أذكار الوضوء",
  };

  const azkarCategories = Object.keys(data);

  return (
    <>
      <Navbar />
      <main className="pt-[70px] pb-20 px-5">
        <div className="max-w-7xl mx-auto">
          {azkarCategories.map((category) => {
            const azkarList = data[category as keyof AzkarData];
            return (
              <div key={category} className="my-4">
                <h2 className="text-xl font-semibold bg-primary/90 py-2.5 px-4 text-white">
                  {categoryNames[category] || category.replace(/_/g, " ")}
                </h2>
                <table className="min-w-full border-collapse mt-4">
                  <thead>
                    <tr>
                      <th className="border-b-2 px-4 py-2 text-right">الذكر</th>
                      <th className="border-b-2 px-4 py-2 text-center">عدد</th>
                    </tr>
                  </thead>
                  <tbody>
                    {azkarList.map((azkar) => (
                      <tr key={azkar.id}>
                        <td className="border-b px-4 py-2 text-lg">
                          {azkar.text}
                        </td>
                        <td className="border-b px-4 py-2 text-center text-lg">
                          {azkar.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
