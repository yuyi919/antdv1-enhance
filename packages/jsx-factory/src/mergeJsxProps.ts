/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VNodeData as VNodeData2 } from "vue-demi";
export interface VNodeData extends VNodeData2 {
  [key: string]: any;
}
export function mergeJsxProps(...data: VNodeData[]): VNodeData {
  return data.reduce((c, a) => {
    for (var b in a)
      if (!c[b]) c[b] = a[b];
      else if (normalMerge.includes(b)) c[b] = Object.assign({}, c[b], a[b]);
      else if (toArrayMerge.includes(b)) {
        var d = c[b] instanceof Array ? c[b] : [c[b]],
          e = a[b] instanceof Array ? a[b] : [a[b]];
        c[b] = d.concat(e);
      } else if (functionalMerge.includes(b)) {
        for (var f in a[b])
          if (c[b][f]) {
            var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]],
              h = a[b][f] instanceof Array ? a[b][f] : [a[b][f]];
            c[b][f] = g.concat(h);
          } else c[b][f] = a[b][f];
      } else if ("hook" == b)
        for (var i in a[b])
          c[b]![i] = c[b]![i] ? mergeFn(c[b]![i], a[b]![i]) : a[b]![i];
      else c[b] = a[b];
    return c;
  }, {});
}
const normalMerge = ["attrs", "props", "domProps"],
  toArrayMerge = ["class", "style", "directives"],
  functionalMerge = ["on", "nativeOn"];
function mergeFn(a: any, b: any) {
  return function (this: any) {
    a && a.apply(this, arguments), b && b.apply(this, arguments);
  };
}
