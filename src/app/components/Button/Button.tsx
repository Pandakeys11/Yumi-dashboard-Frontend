import { ButtonHTMLAttributes, FC } from "react";
import CircularLoader from "../CircularLoader";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customStyle?: string;
  size: "regular" | "small";
  loader?: boolean;
  isPending?: boolean;
  isProcessing?: boolean;
  pendingText?: string;
  processingText?: string;
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  size,
  customStyle = "",
  loader = false,
  isPending,
  isProcessing,
  pendingText = "Pending...",
  processingText = "Processing...",
  ...props
}) => {
  const buttonSize = size === "regular" ? "h-10 md:h-12" : "h-8 md:h-10";
  const isIdle = !isProcessing && !isPending;

  return (
    <button
      className={`text-white py-2 px-2 md:px-4 flex items-center justify-center
        bg-[#9333ea] hover:bg-[#a855f7] disabled:opacity-50 disabled:cursor-not-allowed
        transition duration-300 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.2)] ${className} ${buttonSize}`}
      {...props}
    >
      {isIdle && children}
      {isPending && loader && (
        <CircularLoader
          text={pendingText}
          textSize="2xl"
          loaderColor="bg-white"
          textColor="text-white"
        />
      )}
      {isProcessing && loader && (
        <CircularLoader
          text={processingText}
          textSize="2xl"
          loaderColor="bg-white"
          textColor="text-white"
        />
      )}
    </button>
  );
};
