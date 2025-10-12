import React from "react";

function Footer() {
  return (
    <footer className="bg-[#f0ebfa] text-gray-800 py-6 mt-10">
      <div className="container mx-auto px-4">
        {/* Top navigation links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm font-medium mb-4">
          <a href="#" className="hover:text-purple-600 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-purple-600 transition-colors">
            Features
          </a>
          <a href="#" className="hover:text-purple-600 transition-colors">
            Pricing
          </a>
          <a href="#" className="hover:text-purple-600 transition-colors">
            FAQs
          </a>
          <a href="#" className="hover:text-purple-600 transition-colors">
            About
          </a>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 mb-4" />

        {/* Copyright text */}
        <div className="text-center text-sm text-gray-600">
          © 2025 Company, Inc
        </div>
      </div>
    </footer>
  );
}

export default Footer;
