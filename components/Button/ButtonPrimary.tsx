import { FC } from "react";
import { Button, ButtonProps } from "@/app/components/Button/Button";

export const ButtonPrimary: FC<ButtonProps> = ({
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
      className={`bg-[#9333ea] hover:bg-[#a855f7] text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(147,51,234,0.2)] ${className}`}
    >
      {children}
    </Button>
  );
};
