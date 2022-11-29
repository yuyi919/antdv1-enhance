import { LayoutProps } from "./Layout";
import { Component, Prop } from "@yuyi919/antdv1-plus-helper";

@Component()
export class FormLayoutProps extends LayoutProps {
  @Prop()
  prefixCls?: string;
}
