export * from "./context";
export * from "./resizeHandler";
export * from "./shared";
export * from "./state";
export * from "./std";
export * from "./useBreakPoints";
export * from "./useElementRect";
export * from "./useInherit";
export * from "./useLoader";
export * from "./useMediaQuery";
export * from "./usePageQuery";
export * from "./useWindow";

export function useComponentLoader<T extends any, Named extends keyof T>(
  loader: () => Promise<T>,
  name: Named = "default" as Named,
) {
  return (async () => {
    const r = await loader();
    return (r as { [K in Named]: T })[name] || r;
  }) as unknown as T[Named] & Promise<T[Named]>;
}
