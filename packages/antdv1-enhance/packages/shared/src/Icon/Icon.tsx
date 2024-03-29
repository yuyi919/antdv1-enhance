/* eslint-disable no-use-before-define */
import {
  Component,
  extractProps,
  getPropsClass,
  Prop,
  VueComponent2,
} from "@yuyi919/antdv1-plus-helper";
import Theme, { createUseClasses, styled } from "@yuyi919/antdv1-plus-theme";
import { useInherit } from "@yuyi919/vue-use";
import { Icon } from "ant-design-vue";
import { defineComponent } from "vue-demi";

const [classes, useClasses] = createUseClasses("icon", {});
const useStyles = styled.makeUse`
  &${classes.root} {
    color: ${(props: ThemedIconProps, theme) =>
      Theme.getPalette(`${props.color}Color` as any)(props, theme) ||
      Theme.getPalette("primaryColor")(props.color, theme)};
  }
`;

@Component()
export class ThemedIconProps extends getPropsClass(Icon) {
  @Prop({ type: String, default: "primary" })
  color?: "primary" | "second";
}

export const ThemedIcon: VueComponent2<ThemedIconProps> = defineComponent({
  props: extractProps(ThemedIconProps),
  setup(props, context) {
    const classes = useClasses(useStyles(props));
    const [getInherit] = useInherit(context);
    return () => {
      const { theme, ...other } = props;
      const { on, scopedSlots, children } = getInherit();
      return (
        <Icon
          {...{ on, scopedSlots, props: other }}
          class={classes.root}
          theme="outlined"
        >
          {children}
        </Icon>
      );
    };
  },
});
