import { FC } from "react";

interface OwnProps {
  show: boolean;
}

const Loader: FC<OwnProps> = ({ show }) =>
  show ? <div className="loader"></div> : null;

export default Loader;
