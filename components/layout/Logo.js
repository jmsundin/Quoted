import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link
      className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
      href="/"
    >
      <span className="sr-only">Home</span>
      <Image
        width="80"
        height="80"
        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Quote_Mining_Fallacy_Icon.png"
        alt="Quoted"
      />
    </Link>
  );
}

export default Logo;
