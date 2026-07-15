import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-8 py-4 border-t bg-white">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="text-xs md:text-sm text-gray-500">
          Copyright 2026 © GreatStack. All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-4 mt-2 md:mt-0">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6 hover:opacity-70 transition-opacity" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6 hover:opacity-70 transition-opacity" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img src={assets.instagram_icon} alt="Instagram" className="w-6 h-6 hover:opacity-70 transition-opacity" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;