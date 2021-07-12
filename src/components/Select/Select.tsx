import React from "react";

export type SelectProps = {
  options: Option[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const Select = (props: SelectProps): JSX.Element => {
  const { name, options, value = "", onChange } = props;
  const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(ev.target.value);
  };

  return (
    <select className="sel" name={name} value={value} onChange={handleChange}>
      {options.map((opt: Option) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export interface Option {
  label: string;
  value: string;
}
