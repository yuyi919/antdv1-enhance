import { as, isThenable } from "@yuyi919/shared-types";
import { useInheritEvents } from "@yuyi919/vue-use";
import { computed, defineComponent, h } from "vue-demi";
import { extractProps } from "../../helper";
import { extractRecord } from "../../utils";
import { injectLocale } from "../context";
import { CommonConfirm } from "../createAction";
import { ConfirmButtonProps } from "../interface";
import { BaseActionProps } from "./BaseActionProps";
import { getActionExcutingHint, getActionTitle } from "./component";
import { useClasses, useStyles } from "./style";

export const BaseAction = defineComponent({
  props: extractProps(BaseActionProps, {}),
  emits: {
    click(e: PointerEvent) {
      console.log("click", e);
    },
    ok(e?: any) {},
    cancel(e?: PointerEvent) {},
    /**
     *
     * @param e
     */
    cancelConfirm(e?: any) {},
  } as const,
  setup(props, context) {
    const classes = useClasses(useStyles(props));
    const injectedLocale = injectLocale();
    const [events, handles] = useInheritEvents(context, ["click", "ok"]);
    const locale = computed(() => props.locale || injectedLocale);
    const confirmContent = computed(() => {
      const { confirm } = props;
      return (
        confirm &&
        (confirm === true
          ? getActionExcutingHint(props, locale.value)
          : confirm.title)
      );
    });
    function handleClick(e: PointerEvent) {
      handles.click(e);
      const result = props.action?.();
      return isThenable(result)
        ? result.then((e) => handles.ok(e))
        : handles.ok(result);
    }
    return () => {
      const {
        component: Button,
        confirm,
        buttonProps: btnProps = {},
        buttonClass,
        buttonStyle,
        buttonAttrs,
        spinning,
        hidden,
        flex,
      } = props;
      const btn = h(
        as(Button),
        {
          style: buttonStyle,
          class: [
            classes.root,
            hidden && classes.hidden,
            buttonClass,
            flex && classes.flex,
          ],
          attrs: buttonAttrs,
          props: {
            hidden,
            ...btnProps,
            loading: btnProps.loading === false ? false : spinning,
          },
          on: props.confirm ? {} : { click: handleClick },
        },
        [getActionTitle(props, spinning, locale.value) as any],
      );
      return (
        <>
          {props.confirm
            ? h(
                as(CommonConfirm),
                {
                  props: {
                    ...extractRecord(confirm!)?.props,
                    loading: props.spinning,
                    disabled: btnProps.disabled,
                    confirm: confirmContent.value,
                  } as ConfirmButtonProps,
                  on: {
                    click: handleClick,
                    ...events(),
                  },
                },
                [btn],
              )
            : btn}
        </>
      );
    };
  },
});
export interface ActionBase extends InstanceType<typeof BaseAction> {}
