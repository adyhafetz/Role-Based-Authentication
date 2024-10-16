import React from "react";

const Pill = ({
    text,
    bgColorClass,
    textColorClass,
    widthClass,
    heightClass,
}) => (
    <div
        className={`inline-flex items-center justify-center text-xs font-medium rounded-full ${bgColorClass} ${textColorClass} ${widthClass} ${heightClass}`}
    >
        <span className="flex items-center justify-center w-full h-full">
            {text}
        </span>
    </div>
);

export default Pill;
