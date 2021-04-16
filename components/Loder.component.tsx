import React, { FC } from "react";

const Loader: FC<{ show: boolean }> = ({ show }) =>
  show ? <div className="loader" /> : null;

export default Loader;
