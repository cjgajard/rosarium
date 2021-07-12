import React from "react";

export type IProps = {
  children?: React.ReactNode;
};

export const I = ({ children }: IProps): JSX.Element => {
  const className = "i";
  return <div className={className}>{children}</div>;
};
