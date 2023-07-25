import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex flex-auto flex-row flex-wrap items-center justify-start gap-2">
      <div className="flex flex-auto flex-row flex-wrap items-center justify-center gap-2">
      <Link
        className="flex-initial"
        href="/home"
      >
        <span className="sr-only">Home</span>
        <Image
          width={64}
          height={64}
          src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Quote_Mining_Fallacy_Icon.png"
          alt="Quoted"
          className="shrink-0 h-16 w-16 flex-none justify-center items-center rounded-full object-cover"
        />
        </Link>
        <Link href="/home" className="flex flex-auto justify-center text-2xl font-bold text-gray-700">
        <span >Quoted!</span>
      </Link>
      </div>
    </div>
  );
}

export default Logo;
