// @ts-nocheck TODO 待处理
import Vue from "vue";
import {
  CreateElement,
  defineComponent,
  h,
  PropOptions,
  SetupContext,
  VueConstructor,
} from "vue-demi";
import { HasDefined } from "vue/types/common";
import {
  ComponentOptionsMixin,
  ComponentOptionsWithProps,
  ComponentPropsOptions,
  ComputedOptions,
  MethodOptions,
} from "vue/types/v3-component-options";
import { EmitsOptions } from "vue/types/v3-setup-context";
import {
  ICommonModalProps,
  LoaderModalComponent,
  SubmitModalComponent,
} from "./Manager";

// let a: SubmitModalComponent<{}, {}>["Type"];
type Resolve<T extends any> = T extends Promise<infer R> ? R : T;
/**
 * 定义模态框内容组件
 * @param options
 */

export function defineSubmitModalComponent<
  LoadData,
  Props extends ICommonModalProps<LoadData>,
  Setup extends (
    props: Props,
    context: SetupContext,
  ) => { handleSubmit: (...args: any[]) => any },
  SubmitData extends Resolve<ReturnType<ReturnType<Setup>["handleSubmit"]>>,
  RawBindings extends ReturnType<Setup>,
>(options: {
  mixins?: any[];
  extends?: any;
  components?: {
    [key: string]: VueConstructor;
  };
  setup: Setup;
}) {
  const Component = defineComponent({
    components: {
      ...(options.components || {}),
    },
    extends: options.extends,
    mixins: options.mixins,
    emits: ["close", "update"],
    props: {
      loadData: useProps<Props["loadData"]>(null).required,
      // submitData: useProps<Props["submitData"]>(null).required,
      handleOnClose: useProps<Props["handleOnClose"]>(null).required,
      forceUpdate: useProps<Props["forceUpdate"]>(null).required,
    },
    setup(props: any, context) {
      return {
        ...options.setup(props as Props, context),
      };
    },
  });
  return Object.assign(
    Component as SubmitModalComponent<LoadData, SubmitData, RawBindings>,
    {
      render<Self extends Vue & Props & RawBindings>(
        renderer: (this: Self, handle: Self, h: CreateElement) => any,
      ) {
        return defineComponent({
          extends: Component,
          render() {
            return renderer.call(this, this, h);
          },
        }) as SubmitModalComponent<LoadData, SubmitData, RawBindings>;
      },
    },
  );
}
/**
 * 定义模态框内容组件
 * @param options
 */
export function defineLoaderModalComponent<
  Props,
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  Emits extends EmitsOptions = {},
  EmitsNames extends string = string,
  PropsOptions extends ComponentPropsOptions = ComponentPropsOptions,
>(
  options: HasDefined<Props> extends true
    ? { functional?: never } & ComponentOptionsWithProps<
        PropsOptions,
        RawBindings,
        D,
        C,
        M,
        Mixin,
        Extends,
        Emits,
        EmitsNames,
        Props
      >
    : { functional?: never } & ComponentOptionsWithProps<
        PropsOptions,
        RawBindings,
        D,
        C,
        M,
        Mixin,
        Extends,
        Emits,
        EmitsNames
      >,
) {
  const Component = defineComponent({
    components: {
      ...options.components,
    },
    // extends: options.extends,
    // mixins: options.mixins,
    emits: ["close", "update"],
    props: {
      loadData: {
        type: null,
        required: true,
      } as PropOptions<Props["loadData"]>,
      // submitData: useProps<Props["submitData"]>(null).required,
      handleOnClose: {
        type: null,
        required: true,
      } as PropOptions<Props["handleOnClose"]>,
      forceUpdate: {
        type: null,
        required: true,
      } as PropOptions<Props["forceUpdate"]>,
      ...options.props,
    },
    setup: options.setup,
  });
  return Object.assign(Component, {
    render<Self extends Vue & Props & AppendProps & RawBindings>(
      renderer: (this: Self, handle: Self, h: CreateElement) => any,
    ) {
      return defineComponent({
        extends: Component,
        render() {
          return renderer.call(this, this, h);
        },
      }) as LoaderModalComponent<LoadData, RawBindings>;
    },
  }) as LoaderModalComponent<LoadData, RawBindings> & {
    render(
      renderer: (this: Self, handle: Self, h: CreateElement) => any,
    ): LoaderModalComponent<LoadData, RawBindings>;
  };
}
