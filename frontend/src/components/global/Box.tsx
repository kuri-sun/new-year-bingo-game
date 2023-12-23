import { ReactElement } from "react";

type BoxProps = {
  /**
   * Title for this box
   */
  title: string;
  /**
   * Children react elements
   */
  children: ReactElement;
};

export default function Box({ children, title }: BoxProps) {
  return (
    <div className="flex flex-col w-[400px] pt-[56px] pb-[72px] px-[48px] bg-white border border-gray-500 rounded">
      <div className="mb-[48px] text-[24px] font-bold">{title}</div>
      {children}
    </div>
  );
}
