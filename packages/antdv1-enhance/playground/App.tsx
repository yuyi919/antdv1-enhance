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
import { MATERIAL_DEFAULT_THEME } from "@yuyi919/antdv1-plus-theme";
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
              ??????
            </Button>
            <Button
              type="second"
              size="large"
              ghost
              hint="test"
              onClick={async (e) => {
                const result = await manager.callModal(
                  {
                    title: "??????",
                    placement: "left",
                    confirmSubmit: true,
                    confirmCancel: true,
                  },
                  "aaaaaaaaa",
                );
                console.log("result", result); //.log("clicl", e);
              }}
            >
              ????????????
            </Button>
            <Demo title="??????" desc="??????">
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
                        title: "??????",
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
