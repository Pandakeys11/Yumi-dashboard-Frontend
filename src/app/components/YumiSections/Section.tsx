import { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  titleNumber?: string;
}

export const Section = ({ id, title, children, titleNumber }: SectionProps) => {
  return (
    <div
      id={id}
      className="border border-[#00ff9d]/30 bg-[#0a0a1a] p-6 rounded-lg shadow-[0_0_15px_rgba(0,255,157,0.2)] mb-6"
    >
      <div className="flex items-start gap-4 mb-6">
        {titleNumber && (
          <div className="bg-[#9333ea] text-white px-3 py-1 rounded-md font-mono text-sm">
            {titleNumber}
          </div>
        )}
        <h2 className="text-xl md:text-2xl font-bold text-[#00ff9d]">
          {title}
        </h2>
      </div>
      <div className="w-16 h-1 bg-[#00ff9d] mb-6"></div>
      {children}
    </div>
  );
};
