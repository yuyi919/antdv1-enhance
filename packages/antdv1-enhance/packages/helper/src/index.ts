/* eslint-disable @typescript-eslint/ban-types */
import * as DomUtils from "./dom";
export * from "@yuyi919/vue-shared-decorators";
export * from "@yuyi919/vue2.7-helper";
export * from "./KeyCode";
export * from "./mixins";
export * from "./optionResolver";
export * from "./prop-util";
export * from "./slot";
export * from "./transition";
export type { base, builtin, dom };
export { DomUtils };

import type * as base from "../tool/base";
import type * as builtin from "../tool/builtin-components";
import type * as dom from "../tool/dom";
export function noop() {}
