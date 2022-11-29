// @ts-nocheck TODO 待处理
import Vue, {
  CreateElement,
  getCurrentInstance,
  PropOptions,
  VueConstructor,
} from "vue";
import { defineComponent, h, SetupContext } from "vue-demi";
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
  LoadData,
  Props extends ICommonModalProps<LoadData>,
  AppendProps extends Record<string, any>,
  Setup extends (props: Props & AppendProps, context: SetupContext) => {},
  RawBindings extends ReturnType<Setup>,
>(options: {
  mixins?: any[];
  extends?: any;
  props?: AppendProps;
  components?: {
    [key: string]: VueConstructor;
  };
  setup: Setup;
}) {
  const Component = defineComponent({
    components: {
      ...(options.components || {}),
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
      ...(options.props || {}),
    },
  });
  console.log(Component);
  return Object.assign(Component, {
    render<Self extends Vue & Props & AppendProps & RawBindings>(
      renderer: (this: Self, handle: Self, h: CreateElement) => any,
    ) {
      return defineComponent({
        extends: Component,
        setup(props: Props & AppendProps, context) {
          const ctx = options.setup(props as Props & AppendProps, context);
          console.log("setup", ctx);
          return ctx
        },
        render() {
          return renderer.call(this, this, h);
        }
      }) as LoaderModalComponent<LoadData, RawBindings>;
    },
  });
}
