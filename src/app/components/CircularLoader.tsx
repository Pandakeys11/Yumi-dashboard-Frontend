import React from "react";

interface CircularLoaderProps {
  text?: string;
  textSize?: string;
  loaderColor?: string;
  textColor?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = ({
  text = "Loading",
  textSize = "text-2xl",
  loaderColor = "bg-prussian-dark",
  textColor = "text-prussian-dark",
}) => {
  const borderColor = loaderColor.replace("bg-", "border-");

  return (
    <div className="flex items-center space-x-3">
      <div className="relative w-6 h-6">
        <div
          className={`animate-spin rounded-full h-6 w-6 border-black border-2 border-t-transparent ${borderColor}`}
        ></div>
      </div>

      {text && <span className={`${textColor} ${textSize}`}>{text}</span>}

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CircularLoader;
