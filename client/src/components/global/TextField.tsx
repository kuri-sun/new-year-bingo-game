import React from "react";

type TextFieldProps = {
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  invalid?: boolean;
  invalidMessage?: string;
};

export default function TextField({
  label,
  onChange,
  invalid = false,
  invalidMessage = "",
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      {label.length > 0 && <div className="font-semibold">{label}</div>}
      <input
        className="p-[8px] border border-gray-500 rounded"
        onChange={onChange}
      />
      {invalid && (
        <div className="font-semibold text-red-500">{invalidMessage}</div>
      )}
    </div>
  );
}
