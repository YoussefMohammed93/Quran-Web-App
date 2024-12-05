import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image src="/logo.png" alt="logo" width={48} height={48} />
      <p className="text-2xl sm:text-3xl font-bold">نبض القرآن</p>
    </Link>
  );
};
