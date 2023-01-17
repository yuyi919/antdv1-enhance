/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-empty-interface */
import "ant-design-vue/es/style.js";
// import "ant-design-vue/es/vc-dialog/assets/index.less";
import "@yuyi919/antdv1-plus-theme/index.less";
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue-demi";
import { Button, Modal } from "../src";
import Demo from "./demo.vue";
import { FormDemo } from "./demos/Form";
// import "../shared/src/env.d";
import { Action, ActionGroup } from "@yuyi919/antdv1-plus-action";
import { MATERIAL_DEFAULT_THEME } from "@yuyi919/antdv1-plus-theme";

function sleep(num = 10000) {
  console.log("sleep")
  return new Promise((res) => setTimeout(res, num, true));
}

console.log(MATERIAL_DEFAULT_THEME);

export let manager: Modal.ModalManager;
export default defineComponent({
  name: "App",
  setup() {
    // useTransitions({});
    const store = reactive({
      closeIcon: (
        <span class={`${"ant-modal"}-close-x`}>
          {
            <a-icon
              type="close"
              theme="outlined"
              class={`${"ant-modal"}-close-icon`}
            />
          }
        </span>
      ),
      prefixCls: "ant-modal",
      visible: false,
      title: "dialog",
      transitionName: "zoom",
      maskTransitionName: "fade",
      footer: "footer",
      centered: false,
      scrollBehavior: "outside",
      maskProps: {
        attrs: {
          "data-key": 1,
        },
      },
      afterClose() {
        // dialog.beforeUnmount();
        console.log("afterClose");
      },
    });
    const dialogData = {
      on: {
        close() {
          console.log("close");
          store.visible = false;
        },
      },
    };
    onMounted(() => {
      // Modal.Dialog
      manager = Modal.ModalManager.getInstance(getCurrentInstance()!.proxy);
      globalThis.manager = manager;
      // dialog.mounted();
      // setTimeout(() => {
      //   store.visible = true
      // }, 1000);
      // setTimeout(() => {
      //   store.visible = false
      // }, 2000);
    });
    // dialog.linkWatch();
    const radioOptions = [
      {
        label: "default",
        value: { centered: false, scrollBehavior: "outside" },
      },
      {
        label: "default+inset",
        value: { centered: false, scrollBehavior: "inside" },
      },
      {
        label: "centered",
        value: { centered: true, scrollBehavior: "outside" },
      },
      {
        label: "centered+inset",
        value: { centered: true, scrollBehavior: "inside" },
      },
    ];
    const radio = ref<string>();
    watch(radio, (data) => {
      const find = radioOptions.find((o) => o.label === data)?.value;
      if (find) {
        console.log(store, find);
        store.centered = find.centered;
        store.scrollBehavior = find.scrollBehavior;
      }
    });
    const hidden = ref(false);
    return () => {
      return (
        <>
          <div style={{ width: "80vw", margin: "0 auto" }}>
            {/* {dialog.render()} */}
            {/* <CommonModal placement="left" visible={store.visible} onClose={dialogData.on.close}></CommonModal> */}
            <Modal.Dialog props={store} {...dialogData}>
              <a-radio-group
                vModel={{
                  value: radio.value,
                  callback: (v: any) => (radio.value = v),
                }}
              >
                {radioOptions.map((o) => (
                  <a-radio value={o.label}>{o.label}</a-radio>
                ))}
              </a-radio-group>
              <div style="height: 1000px"></div>
            </Modal.Dialog>
            <Button
              onClick={() => {
                store.visible = true;
              }}
            >
              点击
            </Button>
            <Button
              type="second"
              ghost
              hint="test"
              onClick={async (e) => {
                const result = await manager.callModal(
                  {
                    title: "测试",
                    placement: "left",
                    confirmSubmit: true,
                    confirmCancel: true,
                  },
                  "aaaaaaaaa",
                );
                console.log("result", result); //.log("clicl", e);
              }}
            >
              点击确认
            </Button>
            <Button type="second" ghost hint="test">
              点击确认
            </Button>
            <Button type="second" hint="test">
              点击确认
            </Button>
            <Button type="link" color="red" size="small" hint="test">
              color link
            </Button>
            <Button color="red" size="small" hint="test">
              color link
            </Button>
            <Button color="red" size="small" ghost hint="test">
              color link
            </Button>
            <ActionGroup
              spinning
              actions={[
                {
                  name: "query",
                  props: { icon: "search" },
                  action: () => sleep(),
                  confirm: true,
                },
                {
                  name: "add",
                  props: { icon: "plus", color: "red" },
                },
              ]}
              defaultProps={{ size: "small", type: "link" }}
              align="left"
              on={{
                add: () => sleep()
              }}
            />
            <ActionGroup
              spinning
              actions={[
                {
                  name: "query",
                  props: { icon: "search" },
                  action: () => sleep(),
                  confirm: true,
                  hidden: true,
                },
                {
                  name: "add",
                  props: { icon: "plus", hint: "新增" },
                  action: () => sleep(),
                },
              ]}
              primary="add"
              align="left"
              defaultProps={{ size: "small" }}
              flex
            />
            <Action
              color="red"
              class="test"
              confirm
              size="small"
              ghost
              hint="test"
              name="add"
              handle={() => {
                hidden.value = true;
              }}
              hidden={hidden.value}
            >
              color link
            </Action>
            <Action
              color="red"
              class="test"
              confirm
              size="small"
              ghost
              hint="test"
              name="add"
              handle={() => sleep()}
            >
              color link
            </Action>
            <Demo title="测试" desc="测试">
              {(
                [
                  "left",
                  "right",
                  "default",
                  "center",
                  "top",
                  "bottom",
                  null,
                ] as const
              ).map((placement) => (
                <Button
                  onClick={() =>
                    manager.callModal(
                      {
                        title: "测试",
                        placement,
                        confirmSubmit: true,
                        confirmCancel: true,
                        confirmClose: true,
                      },
                      () => import("./readme.txt?raw"),
                    )
                  }
                >
                  {placement || "None"}
                </Button>
              ))}
            </Demo>
            <FormDemo />
            {/* <ModalDialogDemo />
          <GridDemo /> */}
          </div>
        </>
      );
    };
  },
}) as any;
