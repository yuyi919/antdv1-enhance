/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { extractProps } from "@yuyi919/antdv1-plus-helper";
import { createUseStyles } from "@yuyi919/antdv1-plus-theme";
import { useNamedRef } from "@yuyi919/vue-use";
import { Popover } from "ant-design-vue";
import { defineComponent, reactive } from "vue-demi";
import { HintFlagProps } from "./props";

const useStyles = createUseStyles((theme) => ({
  root: {
    "& span": {
      verticalAlign: "top",
    },
    "@global span": {
      verticalAlign: "top",
    },
    "& $labelContainer": {
      verticalAlign: "top",
      display: "inline-block",
      width: "100%",
      "&:not(.disabled)": {
        width: "calc(100% - 20px)",
      },
    },
  },
  labelContainer: {},
}));
export function convertTextMuitiple(text: string) {
  return (
    typeof text === "string" &&
    text.split("\n").map((i, index) => [index > 0 ? <br /> : false, i])
  );
}
export const HintFlag = defineComponent({
  name: "AHintFlag",
  props: extractProps(HintFlagProps),
  setup(props, context) {
    const state = reactive({
      get hintStr() {
        return convertTextMuitiple(props.hint || props.item?.hint!);
      },
    });
    const classesRef = useStyles(props);
    const popoverRef = useNamedRef<Popover>("popover");
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
        return (
          <span class={classesRef.value.root}>
            {context.slots.default?.()}&nbsp;
            {!props.disabled && methods.renderHint()}
          </span>
        );
      },
      toggle(show: boolean) {
        const p = popoverRef.value;
        console.log(p);
        p?.$refs.tooltip && ((p.$refs.tooltip as any).sVisible = show);
      },
      renderHint: () => {
        const icon = props.icon?.();
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
            getPopupContainer={() => document.body}
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
    return {
      display() {
        methods.toggle(true);
      },
      hidden() {
        methods.toggle(false);
      },
      renderer() {
        return (
          // (props.useRoll && methods.renderLabelAndHint()) ||
          methods.renderNative()
        );
      },
    };
  },
  render() {
    return (this as any).renderer();
  },
});

export interface HintFlag extends InstanceType<typeof HintFlag> {}
export * from "./props";
