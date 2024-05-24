import React, { useEffect, useState } from "react";

const Card = ({ title, description, imageSrc, altText, categories, sizes }) => {
  const [aspectRatio, setAspectRatio] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = function () {
      setAspectRatio(this.width / this.height);
    };
  }, [imageSrc]);

  let gridClasses = ""; // Default
  let imageClasses = "w-full h-auto"; // Default: fit width, auto height

  if (aspectRatio) {
    if (aspectRatio < 1) {
      gridClasses = "col-span-2 row-span-2";
      imageClasses = "w-auto h-fit";
    } else if (aspectRatio >= 1 && aspectRatio < 2) {
      gridClasses = "col-span-2 row-span-1";
      imageClasses = "w-fit h-auto";
    } else {
      gridClasses = "col-span-4 row-span-1";
      imageClasses = "w-fit h-auto";
    }
  }

  return (
    <div className={`grid space-x-6 w-full h-fit ${gridClasses}`}>
      <div className={`flex flex-col w-full h-full overflow-hidden px-8 `}>
        <div className="w-full h-full flex justify-center">
          <img
            className={`${imageClasses} object-contain`}
            src={imageSrc}
            alt={"img"}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {categories.map((category, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
