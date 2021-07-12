import React from "react";

export type ActionProps = {
  children?: React.ReactNode;
};

export const Action = (props: ActionProps): JSX.Element => {
  const { children } = props;
  return <div className="action">{children}</div>;
};
