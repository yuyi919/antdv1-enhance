/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { extractProps } from "@yuyi919/vue-shared-decorators";
import { InheritHooks, useInherit, useNamedRef } from "@yuyi919/vue-use";
import { VueComponent2 } from "@yuyi919/vue2.7-helper";
import { Button as AntButton, IButtonEvents } from "ant-design-vue";
import { defineComponent } from "vue-demi";
import { HintFlag } from "../HintFlag";
import { ButtonProps } from "./ButtonProps";
import { useThemedButton } from "./ThemeButton";

export const Button: VueComponent2<ButtonProps, IButtonEvents> =
  defineComponent({
    props: extractProps(ButtonProps),
    setup(props, context) {
      const hintRef = useNamedRef<HintFlag>("hint");
      const [getInherit] = useInherit(context) as InheritHooks;
      const nativeOn = {
        mouseover: () => {
          hintRef.value?.display();
        },
        mouseleave: () => {
          hintRef.value?.hidden();
        },
      };
      const themed = useThemedButton(props);
      return () => {
        const { children, scopedSlots, on } = getInherit();
        const { hint, hintTitle, type, ...other } = props;
        return (
          <AntButton
            mergeJsxProps={[
              {
                scopedSlots,
                on,
                nativeOn: hint ? nativeOn : {},
                props: other,
              },
              themed.value,
            ]}
          >
            <span>
              {children}
              {hint && <HintFlag ref={hintRef} hint={hint} title={hintTitle} />}
            </span>
          </AntButton>
        );
      };
    },
  });

export { ButtonProps };
export type { ButtonProps as IButtonProps };
