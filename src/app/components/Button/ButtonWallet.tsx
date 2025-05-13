import { FC } from "react";
import { Button, ButtonProps } from "@/app/components/Button/Button";

export const WalletButton: FC<ButtonProps> = ({
  className,
  children,
  size,
  customStyle = "",
  ...props
}) => {
  return (
    <Button
      size={size}
      {...props}
      className={`lg:w-56 w-full text-[#0a0a1a] bg-[#00ff9d] hover:bg-[#33ffb1] disabled:opacity-50 disabled:cursor-not-allowed 
      shadow-[0_0_15px_rgba(0,255,157,0.2)] hover:shadow-[0_0_25px_rgba(0,255,157,0.4)] transition-all duration-300 
      border border-[#00ff9d]/30
      ${className}`}
    >
      {children}
    </Button>
  );
};
