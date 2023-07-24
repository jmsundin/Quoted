import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex flex-row items-center justify-start w-50 h-40">
      <Link
        className="flex-none bg-white sm:h-20 sm:w-20"
        href="/"
      >
        <span className="sr-only">Home</span>
        <Image
          width={60}
          height={60}
          src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Quote_Mining_Fallacy_Icon.png"
          alt="Quoted"
          className="rounded-full"
        />
        </Link>
        <Link href="/" className="flex-auto justify-start ml-2 text-2xl font-bold text-gray-700">
        <span >Quoted!</span>
      </Link>
    </div>
  );
}

export default Logo;
