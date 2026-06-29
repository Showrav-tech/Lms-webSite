import React from "react";
import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    <div className="pt-8 md:pt-10 text-center">
      <p className="text-base text-gray-500">Trusted by learners from</p>

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-8">
        <img src={assets.microsoft_logo} alt="Microsoft" className="w-20 md:w-28 object-contain" />
        <img src={assets.walmart_logo} alt="Walmart" className="w-20 md:w-28 object-contain" />
        <img src={assets.accenture_logo} alt="Accenture" className="w-20 md:w-28 object-contain" />
        <img src={assets.adobe_logo} alt="Adobe" className="w-20 md:w-28 object-contain" />
        <img src={assets.paypal_logo} alt="Paypal" className="w-20 md:w-28 object-contain" />
      </div>
    </div>
  );
};

export default Companies;