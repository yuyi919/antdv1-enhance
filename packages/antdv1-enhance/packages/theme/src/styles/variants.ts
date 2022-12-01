import { ComponentsPropsList } from "./props";
import { CSSInterpolation } from "./system";

export type ComponentsVariants = {
  [Name in keyof ComponentsPropsList]?: Array<{
    props: Partial<ComponentsPropsList[Name]>;
    style: CSSInterpolation;
  }>;
};
