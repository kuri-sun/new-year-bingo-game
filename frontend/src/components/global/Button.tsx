import React from "react";
import { getBGColor } from "../../utils/Utility";

export type ButtonBGColor = "orange" | "green" | "gray" | "red";

type ButtonProps = {
  title: string;
  color: ButtonBGColor;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
};

export default function Button({ title, color, onClick }: ButtonProps) {
  const bgcolor = getBGColor(color);
  return (
    <button
      onClick={onClick}
      className={`px-[16px] py-[8px] ${bgcolor} text-white text-xl font-bold rounded `}
    >
      {title}
    </button>
  );
}
