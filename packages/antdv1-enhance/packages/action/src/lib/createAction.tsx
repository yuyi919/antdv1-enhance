import { extractProps, VueComponent2 } from "@yuyi919/antdv1-plus-helper";
import { as, isStr, isThenable, Recordable } from "@yuyi919/shared-types";
import { isBool, stubFunction } from "@yuyi919/shared-utils";
import { Popconfirm } from "ant-design-vue";
import { computed, defineComponent, ref } from "vue-demi";
import { useEventSourceHandle } from "../use";
import { ActionGroup } from "./ActionGroup";
import { ConfirmButtonProps } from "./interface";

export const StaticProps = {
  okButtonProps: { style: "display: none" },
  cancelButtonProps: { style: "display: none" },
};

export function createConfirmButton2(
  initialConfirm: any,
): VueComponent2<ConfirmButtonProps> {
  return defineComponent({
    functional: true,
    render(
      _,
      {
        props: {
          getContainer = null,
          loading = false,
          disabled = undefined,
          confirm = initialConfirm,
          okText = "确认",
          cancelText = "取消",
          contentSpinning = false,
        } = {} as ConfirmButtonProps,
        data,
        children,
        listeners = {},
      }: any,
    ) {
      const isDisabled = [disabled, confirm === undefined].find(isBool);
      // console.log(data, listeners, isDisabled);
      listeners.click = listeners.click || stubFunction;
      return (
        <Popconfirm
          {...data}
          arrowPointAtCenter
          getPopupContainer={() => document.body}
          title={
            contentSpinning ? (
              <a-spin spinning={loading}>{confirm}</a-spin>
            ) : (
              confirm
            )
          }
          onConfirm={listeners.click}
          okText={okText}
          props={{
            okButtonProps: { props: { loading } },
            cancelButtonProps: loading ? StaticProps.cancelButtonProps : {},
            ...(isDisabled ? { visible: false } : {}),
          }}
          cancelText={cancelText}
        >
          {children}
        </Popconfirm>
      );
    },
  }) as VueComponent2<ConfirmButtonProps>;
}

export function createConfirmButton(initialConfirm: any): ConfirmComponent {
  return as(
    defineComponent({
      props: extractProps(ConfirmButtonProps),
      emits: ["click", "cancel", "cancelConfirm"],
      setup(props, context) {
        const popconfirmRef = ref<{
          setVisible(visible: boolean): void;
        } | null>(null);
        const visible = ref<boolean | undefined>();
        const onConfirm = () => {
          // console.log(context.listeners.click, props.handleOnClick?.());
          return useEventSourceHandle("click", context)?.();
        };

        // console.log("setup confirm", initialConfirm);
        let canceled = false;
        let cancelRafId: any;
        const actionHandlers = {
          ok: async () => {
            try {
              cancelAnimationFrame(cancelRafId);
              popconfirmRef.value?.setVisible(true);
              visible.value = true;
              const proc = onConfirm();
              await proc;
              visible.value = undefined;
              if (!canceled && props.closeOnSuccess) {
                isThenable(proc) &&
                  console.log("closeOnSuccess", popconfirmRef.value);
                cancelAnimationFrame(cancelRafId);
                cancelRafId = requestAnimationFrame(() => {
                  popconfirmRef.value?.setVisible(false);
                });
              }
              canceled = false;
            } catch (error) {
              if (visible.value === true) {
                visible.value = undefined;
              }
              cancelAnimationFrame(cancelRafId);
              popconfirmRef.value?.setVisible(true);
              throw error;
            }
          },
          cancel: async (e) => {
            console.error("cancel", e);
            if (visible.value === true) {
              visible.value = undefined;
            }
            popconfirmRef.value?.setVisible(false);
            context.emit("cancel");
          },
          cancel$: (e) => {
            console.error("cancel$", e);
            context.emit("cancelConfirm");
            canceled = true;
          },
        };
        const content = computed(() => {
          const { okText = "确认", cancelText = "取消" } = props;
          return [
            props.contentSpinning ? (
              <a-spin spinning={props.loading}>
                {props.confirm || initialConfirm}
              </a-spin>
            ) : (
              props.confirm || initialConfirm
            ),
            <ActionGroup
              primary="ok"
              defaultProps={{ size: "small" }}
              defaultActionHandler={actionHandlers}
              style={{
                marginBottom: "-12px",
                marginTop: "12px",
                marginLeft: "-22px",
              }}
              align="center"
              actions={{
                cancel: cancelText,
                ok: okText,
              }}
            />,
          ];
        });
        return () => {
          const {
            getContainer = null,
            disabled = undefined,
            confirm = initialConfirm,
          } = props;
          return (
            <Popconfirm
              visible={visible.value}
              ref={popconfirmRef}
              {...{ props: StaticProps }}
              getPopupContainer={getContainer!}
              disabled={[disabled, confirm === undefined].find(isBool)}
              title={content.value}
            >
              {context.slots.default?.()}
            </Popconfirm>
          );
        };
      },
    }),
  );
}

export type ConfirmComponent = VueComponent2<
  ConfirmButtonProps,
  { click: any; cancel: void },
  {},
  {
    setVisible(visible: boolean): void;
  }
>;
export interface IConfirmComponent extends InstanceType<ConfirmComponent> {}

export const CommonConfirm = createConfirmButton("确认要进行此操作？");

const _CommonConfirmButtons: Recordable<ConfirmComponent> = {};
export function generateConfirmComponent(config: any): ConfirmComponent {
  return _CommonConfirmButtons[config] || isStr(config)
    ? (_CommonConfirmButtons[config] = createConfirmButton(config))
    : createConfirmButton(config);
}
