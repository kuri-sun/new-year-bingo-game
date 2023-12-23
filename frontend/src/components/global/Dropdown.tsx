import React from "react";

export type OptionItem = {
  label: string;
  value: string;
};

type DroppdownProps = {
  label: string;
  optionItems: OptionItem[];
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  invalid?: boolean;
  invalidMessage?: string;
};

export default function Dropdown({
  label,
  optionItems,
  onChange,
  invalid = false,
  invalidMessage = "",
}: DroppdownProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="font-semibold">{label}</div>
      <select
        name="cars"
        className="p-[8px] border border-gray-500"
        defaultValue={undefined}
        onChange={onChange}
      >
        <option disabled selected value={undefined}></option>
        {optionItems.map((optionItem) => {
          return <option value={optionItem.value}>{optionItem.label}</option>;
        })}
      </select>
      {invalid && (
        <div className="font-semibold text-red-500">{invalidMessage}</div>
      )}
    </div>
  );
}
