import React from "react";

function Head({ title }) {
  return (
    <div className="w-full lg:h-64 h-40 relative overflow-hidden rounded-md">
      <img
        src="data:image/png;base64,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"
        alt="aboutus"
        className="w-full h-full object-cover"
      />
      <div className="absolute lg:top-24 top-16 w-full flex-colo">
        <h1 className="text-2xl lg:text-h1 text-deep font-bold">
          {title && title}
        </h1>
      </div>
    </div>
  );
}

export default Head;
