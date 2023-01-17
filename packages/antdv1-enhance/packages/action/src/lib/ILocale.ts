import { DynamicString, isStr, KeyOf, Types } from "@yuyi919/shared-types";
import { extractRecord } from "../utils";
import { InternalActionType } from "./ActionGroup/interface";

interface ILocaleConfig {
  title: string;
  excuting?: string;
  confirm?: string;
  cancel?: string;
  okButton?: string;
  cancelButton?: string;
  _full?: boolean;
}

export type ILocale<K extends string = Types.DynamicString> = Record<
  K | Exclude<keyof typeof InternalActionType, "CUSTOM$">,
  Required<ILocaleConfig>
>;
export type ILocaleConfigs<K extends string = Types.DynamicString> = Record<
  K | Exclude<keyof typeof InternalActionType, "CUSTOM$">,
  string | ILocaleConfig
>;

export function visitLocale<
  Locale extends ILocaleConfigs,
  K extends KeyOf<Locale>,
>(locale: Locale, type: K | DynamicString): Required<ILocaleConfig> {
  return (
    extractRecord(locale[type])?._full
      ? locale[type]
      : (locale[type as K] = createLocale(locale, type) as Locale[K])
  ) as Required<ILocaleConfig>;
}

function createLocale<Locale extends ILocale>(
  locale: ILocaleConfigs,
  type: KeyOf<Locale>,
): Required<ILocaleConfig> {
  const data = locale[type] as string | ILocaleConfig;
  return isStr(data)
    ? {
        title: data,
        excuting: data + "中...",
        confirm: `确认要${data}？`,
        cancel: `确认要取消${data}？`,
        okButton: "确认",
        cancelButton: "取消",
        _full: true,
      }
    : {
        title: data.title,
        excuting: data.excuting ?? data.title + "中...",
        confirm: data.confirm ?? `确认要${data.title}？`,
        cancel: data.cancel ?? `确认要取消${data.title}？`,
        okButton: data.okButton ?? "确认",
        cancelButton: data.cancelButton ?? "取消",
        _full: true,
      };
}
