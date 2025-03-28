import Image from "next/image";
import Link from "next/link";

// next.js by default is cache

export default function Home() {

  const time = new Date()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {time.toString()}

      <Link href="/dynamic">Link to dynamic page</Link>
    </div>
  );
}
