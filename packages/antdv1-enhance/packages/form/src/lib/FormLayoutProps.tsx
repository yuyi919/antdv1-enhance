import { Component, Prop } from "@yuyi919/antdv1-plus-helper";
import { LayoutProps } from "./Layout";

@Component()
export class FormLayoutProps extends LayoutProps {
  @Prop()
  prefixCls?: string;
}
