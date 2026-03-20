export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section - Full width on mobile, spans 2 columns on larger screens */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-900 tracking-wide">
                RIVUS
              </span>
              <span className="ml-2 text-gray-700">cars!</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Discover the finest luxury vehicles and experience unparalleled
              driving excellence. Your journey to automotive perfection starts
              here.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition duration-300"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition duration-300"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition duration-300"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/marketplace"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300"
                >
                  Our Collection
                </a>
              </li>
              <li>
                <a
                  href="/testdrive"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300"
                >
                  Book Test Drive
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-indigo-600 transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div>
                <span className="text-gray-600">info@rivuscars.com</span>
              </div>
              <div>
                <span className="text-gray-600">
                  123 Luxury Avenue<br />
                  Beverly Hills, CA 90210
                </span>
              </div>
              <div>
                <span className="text-gray-600">www.rivuscars.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Full width */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center w-full">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} RIVUS Cars. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 text-sm transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 text-sm transition duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 text-sm transition duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}