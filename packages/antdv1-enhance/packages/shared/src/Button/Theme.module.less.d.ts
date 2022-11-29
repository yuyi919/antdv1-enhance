import { IButtonProps } from "./ButtonProps";

declare const Classes: {
  root: string;
} & {
  [K in IButtonProps["type"]]?: string;
};
export default Classes;
