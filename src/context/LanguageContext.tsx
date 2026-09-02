import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface Translations {
  [key: string]: {
    en: string;
    si: string;
    ta: string;
  };
}

export const translations: Translations = {
  home: { en: 'Home', si: 'මුල් පිටුව', ta: 'முகப்பு' },
  about: { en: 'About SFCL', si: 'අප ගැන', ta: 'எங்களைப் பற்றி' },
  products: { en: 'Products & Sales', si: 'නිෂ්පාදන සහ අලෙවිය', ta: 'தயாரிப்புகள் & விற்பனை' },
  bungalows: { en: 'Circuit Bungalows', si: 'මණ්ඩල බංගලා', ta: 'சுற்றுப் பங்களாக்கள்' },
  procurement: { en: 'Procurement & Tenders', si: 'ප්‍රසම්පාදන සහ ටෙන්ඩර්', ta: 'கொள்முதல் & டெண்டர்கள்' },
  priceList: { en: 'Fertilizer Price List', si: 'පොහොර මිල ගණන්', ta: 'உர விலைப்பட்டியல்' },
  lab: { en: 'Testing Laboratory', si: 'පරීක්ෂණ පරීක්ෂණාගාරය', ta: 'பரிசோதனை ஆய்வகம்' },
  news: { en: 'News & Events', si: 'පුවත් සහ පුවත්', ta: 'செய்திகள் & நிகழ்வுகள்' },
  contact: { en: 'Contact & Inquiry', si: 'සම්බන්ධතාවය සහ විමසීම්', ta: 'தொடர்பு & விசாரணைகள்' },
  adminPortal: { en: 'Admin Portal', si: 'පරිපාලන ද්වාරය', ta: 'நிர்வாக தளம்' },
  buyFertilizer: { en: 'Buy Fertilizer Online', si: 'ඔන්ලයින් පොහොර මිලදී ගන්න', ta: 'ஆன்லைனில் உரம் வாங்கவும்' },
  bookBungalow: { en: 'Book Circuit Bungalow', si: 'මණ්ඩල බංගලාවක් වෙන්කරන්න', ta: 'சுற்று பங்களா முன்பதிவு செய்ய' },
  viewTenders: { en: 'View Active Tenders', si: 'සක්‍රිය ටෙන්ඩර් බලන්න', ta: 'செயலில் உள்ள டெண்டர்களைப் பார்க்கவும்' },
  govtSeal: { en: 'State Fertilizer Company Limited — Ministry of Agriculture', si: 'රාජ්‍ය පොහොර සමාගම — කෘෂිකර්ම අමාත්‍යාංශය', ta: 'அரசாங்க உர நிறுவனம் — விவசாய அமைச்சு' },
  callUs: { en: 'Hotline: +94 11 292 2100', si: 'ක්ෂණික ඇමතුම්: +94 11 292 2100', ta: 'உடனடி அழைப்பு: +94 11 292 2100' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
