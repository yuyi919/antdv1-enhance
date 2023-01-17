/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { extractProps, VueComponent2 } from "@yuyi919/antdv1-plus-helper";
import { createUseClasses, styled } from "@yuyi919/antdv1-plus-theme";
import { useNamedRef } from "@yuyi919/vue-use";
import { Popover } from "ant-design-vue";
import { computed, defineComponent, reactive } from "vue-demi";
import { HintFlagProps } from "./props";

const [classes, useClasses] = createUseClasses("hint-flag", {
  icon: "icon",
});
const useStyles = styled.makeUse`
  &${classes.root} {
    & > ${classes.icon} {
      vertical-align: top;
    }
  }
`;
// const useStyles = createUseStyles((theme) => ({
//   root: {
//     "& span": {
//       verticalAlign: "top",
//     },
//     "@global span": {
//       verticalAlign: "top",
//     },
//     "& $labelContainer": {
//       verticalAlign: "top",
//       display: "inline-block",
//       width: "100%",
//       "&:not(.disabled)": {
//         width: "calc(100% - 20px)",
//       },
//     },
//   },
//   labelContainer: {},
// }));

export function convertTextMuitiple(text: string) {
  return (
    typeof text === "string" &&
    text.split("\n").map((i, index) => [index > 0 ? <br /> : false, i])
  );
}
export const HintFlag: VueComponent2<
  HintFlagProps,
  {},
  {},
  { display(): void; hidden(): void }
> = defineComponent({
  name: "AHintFlag",
  props: extractProps(HintFlagProps),
  setup(props, context) {
    const state = reactive({
      get hintStr() {
        return convertTextMuitiple(props.hint || props.item?.hint!);
      },
    });
    const classes = useClasses(useStyles(props));
    const popoverRef = useNamedRef<Popover>("popover");
    const renderHint = computed(() => methods.renderHint());
    const methods = {
      // renderLabelAndHint: () => {
      //   const { disabled } = props;
      //   return (
      //     <span
      //       class={[
      //         classesRef.value.root,
      //         classesRef.value.labelContainer,
      //         { disabled },
      //       ]}
      //     >
      //       {/* <TextRollMatcher>
      //         {this.$slots.default}&nbsp;
      //         {hint &&
      //           !disabled && [
      //             this.renderHint({ icon, hint }),
      //             <span slot="rolling">{this.$slots.default}</span>,
      //             this.renderHint({ icon, hint, slot: "right-icon-rolling" }),
      //           ]}
      //       </TextRollMatcher> */}
      //     </span>
      //   );
      // },
      renderNative: () => {
        const children = context.slots.default?.();
        return children ? (
          <span class={classes.root}>
            {children}
            &nbsp;
            {!props.disabled && renderHint.value}
          </span>
        ) : (
          <span class={classes.root}>
            {!props.disabled && renderHint.value}
          </span>
        );
      },
      toggle(show: boolean) {
        const p = popoverRef.value;
        // console.log(p);
        p?.$refs.tooltip && ((p.$refs.tooltip as any).sVisible = show);
      },
      getPopupContainer: () => document.body,
      renderHint: () => {
        const icon = props.icon?.({ class: classes.icon });
        const { hintStr: hint } = state;
        const title = (
          <span>
            {icon}&nbsp;{props.title}
          </span>
        );
        return (
          <Popover
            ref={popoverRef}
            trigger={props.trigger}
            getPopupContainer={methods.getPopupContainer}
            title={title}
            autoAdjustOverflow
            content={
              <div style="max-width: 400px;min-width: 50px;">{hint}</div>
            }
          >
            <span>{icon}</span>
          </Popover>
        );
      },
    };
    context.expose({
      display() {
        methods.toggle(true);
      },
      hidden() {
        methods.toggle(false);
      },
    });
    return () =>
      // (props.useRoll && methods.renderLabelAndHint()) ||
      methods.renderNative();
  },
}) as any;

export interface HintFlag extends InstanceType<typeof HintFlag> {}
export * from "./props";
export { classes as HintFlagClasses };
