import { ICallableActionConfig } from "@yuyi919/antdv1-plus-action";
import { ButtonProps } from "@yuyi919/antdv1-plus-shared";
import { castComputed } from "@yuyi919/shared-utils";
import { unwrap, useLoader } from "@yuyi919/vue-use";
import { Skeleton } from "ant-design-vue";
import { defaultsDeep, isEqual } from "lodash";
import Vue from "vue";
import {
  computed,
  CreateElement,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  VNode,
  watch,
} from "vue-demi";
import { IModalAction, ModalContext } from "./context";
import { Modal } from "./modal";
import { IModalProps } from "./props";
import { IModalOptionsAdapter } from "./utils";

export interface IPortalModalOptions
  extends Omit<IModalProps, "okButtonProps" | "cancelButtonProps">,
    IModalOptionsAdapter<ButtonProps> {
  /**
   * Modal content
   * @type string | VNode | (h) => VNode
   */
  content?:
    | string
    | VNode
    | ((h?: CreateElement) => VNode)
    | (() => Promise<VNode | ((h?: CreateElement) => VNode)>);
  // dialogStyle?: string | CSSProperties;
  // dialogClass?: string;

  /**
   * 父组件，提供以传递context
   */
  parentContext?: Vue;
  /**
   * 确认按钮配置，参照ActionButton
   */
  okButtonProps?: Omit<ICallableActionConfig<"ok">, "action">;
  /**
   * 取消按钮配置，参照ActionButton
   */
  cancelButtonProps?: Omit<ICallableActionConfig<"cancel">, "action">;
  cycleOnly?: boolean;
  onOk?: (close?: () => void) => any;
  onCancel?: (close?: () => void) => any;
  onClose?: (close?: () => void) => any;
}

/**
 * 生成动态组件
 * @param config
 * @param parent
 */
export function createProtalModal(
  config: IPortalModalOptions,
  parent: Vue,
): IModalAction {
  let CONTAINER = document.createElement("div");
  const ModalAction: IModalAction & {
    closed?: boolean;
  } = {
    close() {
      if (!confirmDialogInstance) throw Error("组件已经被卸载！");
      ModalAction.update({ visible: false });
    },
    destroy() {
      if (!ModalAction.closed) return ModalAction.close();
      if (!confirmDialogInstance) throw Error("组件已经被卸载！");
      confirmDialogInstance.$destroy();
      confirmDialogInstance = null!;
      CONTAINER.remove();
      CONTAINER = null!;
    },
    update(newConfig: IPortalModalOptions) {
      const { content, ...props } = newConfig;
      if (!confirmDialogInstance) throw Error("组件已经被卸载！");
      currentProps = defaultsDeep({}, props, currentProps);
      confirmDialogProps.props = currentProps;
      if (content !== void 0 && !isEqual(content, confirmDialogProps.content)) {
        confirmDialogProps.content = content;
      }
    },
    closed: false,
  };
  const { content, ...props } = config;
  const confirmDialogProps = {
    content,
    props: {
      ...props,
      visible: true,
      afterClose() {
        ModalAction.closed = true;
        ModalAction.destroy?.();
        config.afterClose?.();
      },
    } as IPortalModalOptions,
  };
  let currentProps = confirmDialogProps.props;
  function render() {
    return new Vue({
      // store: parent?.$store,
      // router: parent?.$router,
      parent,
      setup() {
        const self = reactive(confirmDialogProps) as unknown as {
          props: IPortalModalOptions;
          content: any;
        };
        ModalContext.provide(ModalAction);
        return () => (
          <ModalProtal
            options={self.props}
            content={self.content}
            actions={ModalAction}
          />
        );
      },
    });
  }
  let confirmDialogInstance = render();
  if (currentProps.cycleOnly) {
    const el = document.createElement("div");
    CONTAINER.appendChild(el);
    confirmDialogInstance.$mount(el);
    document.body.appendChild(CONTAINER);
  } else {
    confirmDialogInstance.$mount(CONTAINER);
  }
  return ModalAction;
}

const ModalProtal = defineComponent({
  props: {
    actions: {
      type: Object as PropType<IModalAction>,
      required: true,
    },
    options: {
      type: Object as PropType<Omit<IPortalModalOptions, "content">>,
      required: true,
    },
    content: {
      type: null,
      required: true,
    },
  },
  setup(props, context) {
    // const Modal = useComponentLoader(() => import("./modal"), "Modal");
    const render = useLoader<any>(() => unwrap(props.content), void 0, true);
    const events = {
      ok() {
        const { onOk } = props.options;
        return onOk ? onOk(props.actions.close) : props.actions.close();
      },
      cancel() {
        const { onCancel } = props.options;
        return onCancel ? onCancel(props.actions.close) : props.actions.close();
      },
      close() {
        const { onClose } = props.options;
        return onClose ? onClose(props.actions.close) : props.actions.close();
      },
    };
    const modalProps = computed(() => {
      const { title, cancelButtonProps, okButtonProps, cycleOnly, ...other } =
        props.options;
      return {
        ...other,
        cancelButtonProps: {
          ...cancelButtonProps,
          action: events.cancel,
        },
        okButtonProps: {
          ...okButtonProps,
          action: events.ok,
        },
        title: title !== false && (title || ""),
        loading: render.loading.value,
      };
    });
    onMounted(() => {
      render.load();
    });
    watch(() => props.content, render.load);
    return () => {
      const vdom = castComputed(render.data.value);
      if (props.options.cycleOnly) {
        return vdom;
      }
      return (
        <Modal
          {...{
            props: modalProps.value,
            on: events,
          }}
        >
          <Skeleton
            paragraph={{ rows: 4 }}
            title={false}
            active
            loading={render.loading.value}
          >
            {vdom}
          </Skeleton>
        </Modal>
      );
    };
  },
});

// export function useAsyncRender<T>(get: T | (() => T | Promise<T>)): () => T {
//   const renderer = ref<T>();
//   function render() {
//     const children = typeof get === "function" ? (get as () => T | Promise<T>)() : get;
//     if (children instanceof Promise) {
//       children.then((r) => renderer.value !== r && (renderer.value = r));
//       return;
//     }
//     return children;
//   }
//   return () => render() || renderer.value;
// }
