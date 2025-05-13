import { FC } from "react";
import { Button, ButtonProps } from "@/app/components/Button/Button";

export const ButtonSecondary: FC<ButtonProps> = ({
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
      className={`bg-[#00ff9d] hover:bg-[#33ffb1] text-[#0a0a1a] font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,255,157,0.2)] ${className}`}
    >
      {children}
    </Button>
  );
};
