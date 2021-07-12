import React from "react";

export type CheckboxProps = {
  name: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  children?: React.ReactNode;
};

export const Checkbox = (props: CheckboxProps): JSX.Element => {
  const { name, checked, children, onChange } = props;
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(ev.target.checked);
  };

  return (
    <label className="cbx-group">
      <input
        type="checkbox"
        className="cbx-input"
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      <div className="cbx">
        <span className="cbx-check" />
        <span className="cbx-label">{children}</span>
      </div>
    </label>
  );
};
