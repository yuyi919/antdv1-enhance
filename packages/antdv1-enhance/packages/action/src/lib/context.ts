import { inject, provide } from "vue-demi";
import { ILocale, ILocaleConfigs, visitLocale } from "./ILocale";

const LOCALE_SYMBOL = Symbol("Locale");
export function provideLocale(locale: ILocale) {
  return provide(LOCALE_SYMBOL, locale);
}

const defaultLocales = defineLocale({
  CANCEL$: "取消",
  submit: { title: "提交" },
  ok: { title: "确认" },
  cancel: { title: "取消" },
  load: { title: "载入" },
  return: { title: "返回" },
  url: { title: "跳转" },
  delete: { title: "删除" },
  upload: { title: "上传" },
  query: { title: "查询" },
  add: { title: "新增" },
  view: { title: "查看" },
  detail: { title: "详情" },
  download: { title: "下载" },
  fetch: { title: "请求" },
  edit: { title: "编辑" },
});

export function injectLocale<K extends string>(
  defaultLocale: ILocale<K> = defaultLocales as ILocale<K>,
) {
  return inject(LOCALE_SYMBOL, defaultLocale);
}

export function defineLocale<K extends string>(locale: ILocaleConfigs<K>) {
  for (const type of Object.keys(locale)) {
    visitLocale(locale, type);
  }
  console.log("locales", locale);
  return locale;
}
