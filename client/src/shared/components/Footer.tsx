import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer: React.FC = () => {
  return (
    <footer className=" text-gray-700 text-sm bg-gray-100 ">
      
      <div className=" border-gray-300">
        <div className="container mx-auto px-6  py-10 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-20">
          {/* Support */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li className="hover:text-gray-900 cursor-pointer">Help Centre</li>
              <li className="hover:text-gray-900 cursor-pointer">Cancellation options</li>
            </ul>
          </div>

          {/* Be My Guest */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3">Be My Guest</h3>
            <ul className="space-y-2">
              <li className="hover:text-gray-900 cursor-pointer">About Us</li>
              <li className="hover:text-gray-900 cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Newsroom */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-3">Newsroom</h3>
            <ul className="space-y-2">
              <li className="hover:text-gray-900 cursor-pointer">New features</li>
              <li className="hover:text-gray-900 cursor-pointer">New features</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
    <div className="w-full flex justify-center">
      <div className="border-t border-gray-300 w-11/12 mx-auto"></div>
    </div>

    <div className="container mx-auto px-16 py-6 flex flex-col md:flex-row items-center justify-between text-center">
      <p>© 2024 BeMyGuest, Inc. All Rights Reserved</p>

      <div className="flex space-x-6 items-center mt-4 md:mt-0">
        
        <span className="hover:text-gray-900 cursor-pointer">🌐 English (IN)</span>
        <span>₹ INR</span>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-900">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="hover:text-gray-900">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-gray-900">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>

    </footer>
  );
};

export default Footer;
