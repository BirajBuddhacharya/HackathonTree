export default function Footer() {
    return (
      <footer className="w-full bg-gray-900 text-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">Tree</span>
            <span className="hidden md:inline text-gray-500">|</span>
            <span className="text-sm text-gray-400">Fostering Growth</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition">About</a>
            <a href="#" className="hover:text-white transition">Browse Products</a>
            <a href="#" className="hover:text-white transition">Top Startups</a>
          </div>
          <div className="text-xs text-gray-500 mt-2 md:mt-0">
            &copy; {new Date().getFullYear()} Tree. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }