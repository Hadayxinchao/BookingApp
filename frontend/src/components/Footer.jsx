import React from 'react';
import { footer } from './Constants.jsx';

const Footer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-y-10 px-8 sm:px-16 py-14 bg-gray-100 text-gray-600 footer border-t">
      {footer.map((item) => (
        <div key={item.title} className="space-y-4 text-xs text-gray-800 pl-20">
          <h5 className="font-bold text-lg">{item.title}</h5>
          {item.content.map((itemContent) => (
            <p
              key={String(itemContent)}
              className="cursor-pointer hover:underline"
            >
              {itemContent}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Footer;