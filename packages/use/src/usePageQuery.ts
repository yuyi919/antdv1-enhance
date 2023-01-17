/* eslint-disable no-throw-literal */
/* eslint-disable no-redeclare */
import { is } from "@yuyi919/shared-types";
import { defaults } from "lodash";
import {
  computed,
  ComputedRef,
  nextTick,
  onMounted,
  reactive,
  Ref,
  ref,
} from "vue-demi";
import { useLoader } from "./useLoader";

export type InternalPageConfig = {
  pageSize?: number;
  current?: number;
  total?: number;
};

export type TReverseKV<
  Source extends Record<string, any>,
  Keys extends keyof Source = keyof Source,
> = {
  [ValueKey in Source[Keys]]: Extract<
    { [Key in Keys]: [Source[Key], Key] }[Keys],
    [ValueKey, any]
  >[1];
};

export type PageDto<
  PageNumKey extends string = "pageNum",
  PageSizeKey extends string = "pageSize",
  PageTotalKey extends string = "total",
  DataKey extends string = "list",
  T = any,
> = PageParamsDto<PageNumKey, PageSizeKey> &
  PageDataDto<PageTotalKey, DataKey, T>;

export type PageParamsDto<
  PageNumKey extends string = "pageNum",
  PageSizeKey extends string = "pageSize",
> = {
  [K in PageNumKey | PageSizeKey]: number;
};

export type PageDataDto<
  PageTotalKey extends string = "total",
  DataKey extends string = "list",
  T = any,
> = {
  [K in PageTotalKey]: number;
} & {
  [K in DataKey]: T[];
};

export function usePageQuery<
  PageNumKey extends string,
  PageSizeKey extends string,
  PageTotalKey extends string,
  DataKey extends string,
  PageParams extends PageParamsDto<PageNumKey, PageSizeKey>,
  T = any,
>(args: {
  initialLoad?: boolean;
  pageConfigKeys?: {
    pageSize?: PageSizeKey;
    current?: PageNumKey;
    total?: PageTotalKey;
    list?: DataKey;
  };
  getData: (
    page: PageParams,
  ) => Promise<(PageParams & PageDataDto<PageTotalKey, DataKey, T>) | T[]>;
  pageConfig?: Omit<PageParams, PageTotalKey>;
  debug?: boolean;
}): CommonPageQuery<PageNumKey, PageSizeKey, PageTotalKey, DataKey, T> {
  const { initialLoad = true } = args;
  const startLoad = ref(initialLoad);
  const pageConfigKeys = args.pageConfigKeys as {
    pageSize: PageSizeKey;
    current: PageNumKey;
    total: PageTotalKey;
    list: DataKey;
  };
  pageConfigKeys.list = pageConfigKeys.list ?? ("list" as DataKey);
  pageConfigKeys.pageSize =
    pageConfigKeys.pageSize ?? ("pageSize" as PageSizeKey);
  pageConfigKeys.current = pageConfigKeys.current ?? ("current" as PageNumKey);
  pageConfigKeys.total = pageConfigKeys.total ?? ("total" as PageTotalKey);

  function commonToInternal(
    sourceParam: Partial<PageParams> & Record<string, any>,
  ): InternalPageConfig {
    const { pageSize, current, total } = pageConfigKeys;
    return {
      pageSize: sourceParam[pageSize],
      current: sourceParam[current],
      total: sourceParam[total],
    };
  }
  function internalToCommon(sourceParam: InternalPageConfig): PageParams {
    const { pageSize, current } = pageConfigKeys;
    return {
      [pageSize]: sourceParam.pageSize,
      [current]: sourceParam.current,
    } as PageParams;
  }

  const pageData = reactive(
    defaults(commonToInternal(args.pageConfig as Partial<PageParams>), {
      current: 1,
      pageSize: 5,
      total: 0,
    }),
  ) as InternalPageConfig;

  function onPageConfigChange(page: InternalPageConfig) {
    pageData.current = page.current ?? 1;
    pageData.pageSize = page.pageSize ?? 5;
    pageData.total = page.total ?? 0;
  }

  const { loading, data, ...loader } = useLoader(async () => {
    const queryParams = internalToCommon(pageData);
    try {
      if (startLoad.value) {
        args.debug && console.log("query:params", queryParams);
        const res = await args.getData(queryParams);
        if (is.arr(res)) {
          return {
            [pageConfigKeys.list]: res,
            [pageConfigKeys.total]: res.length,
            [pageConfigKeys.pageSize]: res.length,
            [pageConfigKeys.current]: 0,
          } as PageParams & PageDataDto<PageTotalKey, DataKey, T>;
        }
        return res;
      }
    } catch (error) {
      console.error(error);
    }
    return {
      [pageConfigKeys.list]: [],
      [pageConfigKeys.total]: 0,
      ...queryParams,
    } as PageParams & PageDataDto<PageTotalKey, DataKey, T>;
  });

  const handleQuery = async (query?: string) => {
    try {
      const res = await loader.load();
      args.debug && console.log("query:end", query, res);
      const internalPage = commonToInternal(res);
      const lastPageNum = Math.max(
        Math.ceil(internalPage.total! / internalPage.pageSize!),
        1,
      );
      // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到最后一页
      if (
        res[pageConfigKeys.list].length === 0 &&
        internalPage.current! > lastPageNum
      ) {
        console.log(internalPage);
        onPageConfigChange({
          ...internalPage,
          current: lastPageNum,
        });
        return handleQuery();
      }
      onPageConfigChange({
        ...internalPage,
        pageSize: pageData.pageSize!,
        // current: lastPageNum,
      });
      return res;
    } catch (error) {
      return data.value;
    }
  };
  if (startLoad.value) {
    // swr.data.value &&
    onPageConfigChange(
      commonToInternal(args.pageConfig as Partial<PageParams>),
    );
  }
  // watch(
  //   () => `query:${pageData.current},${pageData.pageSize}`,
  //   (key) => handleQuery(key)
  // );

  onMounted(() => {
    handleQuery("query:initial");
  });

  return {
    loading,
    data,
    dataList: computed(() => data.value?.[pageConfigKeys.list] || []),
    pageData,
    refresh(start?: boolean | number) {
      startLoad.value = true;
      nextTick(() => {
        if (typeof start === "number" && start > 0) {
          pageData.current = start;
        } else if (start === true) {
          pageData.current = 1;
        }
        return handleQuery(); // swr.mutate(, { forceRevalidate: false });
      });
    },
    onPageConfigChange,
  };
}

export type CommonPageQuery<
  PageNumKey extends string,
  PageSizeKey extends string,
  PageTotalKey extends string,
  DataKey extends string,
  T,
> = {
  loading: Ref<boolean>;
  data: Ref<PageDto<PageNumKey, PageSizeKey, PageTotalKey, DataKey, T>>;
  dataList: ComputedRef<T[]>;
  pageData: InternalPageConfig;
  refresh(start?: boolean | number): void;
  onPageConfigChange: (page: InternalPageConfig) => void;
};
