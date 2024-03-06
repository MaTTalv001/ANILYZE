import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-black shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link legacyBehavior href="/">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </Link>
      </div>
      <div className="flex gap-4">
        <Link legacyBehavior href="/">
          <a className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            作品
          </a>
        </Link>
        <Link legacyBehavior href="/people">
          <a className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            声優
          </a>
        </Link>
        <Link legacyBehavior href="#">
          <a className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            ログイン
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
