import React from "react";

interface MainPageBackgroundProps {
  children: React.ReactNode;
}

const MainPageBackground: React.FC<MainPageBackgroundProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-[url('/images/fire.gif')] bg-cover bg-center bg-fixed flex-col overflow-y-scroll">
      {children}
    </div>
  );
};

export default MainPageBackground;
