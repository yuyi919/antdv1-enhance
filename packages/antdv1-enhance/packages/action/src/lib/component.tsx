import { defineComponent } from "vue-demi";
import { extractProps } from "../helper";
import { useActionGroup } from "./hooks";
import { ActionGroupProps } from "./Props";

import {
  createUseClasses,
  keyframes,
  styled,
} from "@yuyi919/antdv1-plus-theme";
const anim = keyframes`
  to { 
    padding: 0;
    opacity: 0;
    margin: 0;
    overflow: hidden;
    border: 0;
    width: 0;
  }
`;
const [classes, useClasses] = createUseClasses("action-group", {});
const useStyles = styled.makeUse`
  &${classes.root} .operation-bar {
    &.flex {
      display: flex;
      .ant-btn:not([role="hidden"]) {
        display: inline-flex;
        flex: auto;
        justify-content: center;
        align-items: center;
        & > * {
          display: inline-flex;
        }
      }
    }
    &.inline {
      display: inline;
    }
    position: relative;
    .ant-btn.hidden {
      animation: ${anim} 0.1s forwards;
    }
    .ant-btn:not([role="hidden"]) {
      margin-right: 4px;
      .ant-btn-link {
        margin: -1px;
        margin-top: -2px;
      }
    }
    & .ant-btn:nth-last-child(1) {
      &:not([role="hidden"]) {
        margin-right: 0 !important;
      }
    }
  }
`;

export const ActionGroup = defineComponent({
  props: extractProps(ActionGroupProps),
  setup(props: ActionGroupProps, context) {
    const hooks = useActionGroup(context, props);
    const classes = useClasses(useStyles(props));
    // console.log(hooks)
    return {
      render: () => hooks.render(),
      spinningEnd: (name) => hooks.$actionSpinning.spinningEnd(name),
      spinningStart: (name) => hooks.$actionSpinning.spinningStart(name),
      classes: classes,
    };
  },
  render() {
    return <div class={classes.root}>{this.render()}</div>;
  },
});
export interface ActionGroup extends InstanceType<typeof ActionGroup> {}
export default ActionGroup;
