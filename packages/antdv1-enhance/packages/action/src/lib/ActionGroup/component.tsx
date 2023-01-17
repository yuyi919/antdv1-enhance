import { Button } from "@yuyi919/antdv1-plus-shared";
import { defineComponent } from "vue-demi";
import { extractProps } from "../../helper";
import { useAttrsStyles } from "../../use";
import { useActionGroup } from "./hooks";
import { ActionGroupProps } from "./Props";
import { useClasses, useStyles } from "./style";

const props = extractProps(ActionGroupProps, {
  hidden: [] as string[],
  component: Button,
  align: "right",
} as const);

export const ActionGroup = defineComponent({
  props,
  setup(props, context) {
    props.component;
    const hooks = useActionGroup(context, props);
    const classes = useClasses(useStyles(props));
    // console.log(hooks)
    context.expose({
      spinningEnd: (name: string) => hooks.$actionSpinning.spinningEnd(name),
      spinningStart: (name: string) =>
        hooks.$actionSpinning.spinningStart(name),
    });
    const attrStyle = useAttrsStyles();
    // const actionList = computed(() => {
    //   const list = hooks.actionList
    //   console.error("hooks.actionList", list)
    //   return list
    // })
    return () => {
      const content = hooks.getSpinningContentSlot("content");
      const { inline, flex, align } = props;
      // console.error(actionList.value)
      const bar = (
        <div
          // tag="div"
          class={[
            classes.root,
            {
              [classes.inline]: inline,
              [classes.flex]: flex,
            },
            attrStyle.classes(),
          ]}
          style={{
            textAlign: flex || inline ? undefined! : align,
            ...attrStyle.styles(),
          }}
        >
          {hooks.renderer}
          {hooks.getSpinningContentSlot("default")}
        </div>
      );
      return content ? (
        <>
          {content}
          {bar}
        </>
      ) : (
        bar
      );
    };
  },
});
export interface ActionGroup extends InstanceType<typeof ActionGroup> {}
export default ActionGroup;
