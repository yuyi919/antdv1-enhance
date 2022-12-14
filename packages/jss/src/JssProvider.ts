// import {shallowEqualObjects} from 'shallow-equal'
import {
  createGenerateId,
  CreateGenerateIdOptions,
  GenerateId,
  Jss,
  SheetsRegistry,
} from "jss";
import {
  computed,

  // FunctionalComponent,
  defineComponent,
  PropType,
  provide,

  // reactive,
  ref,
  SetupContext,

  // Ref,
  watch,
} from "vue-demi";
// import { Context, Managers } from './types'
import JssContext from "./JssContext";

// interface Props {
//   jss?: Jss
//   registry?: SheetsRegistry
//   generateId?: GenerateId
//   classNamePrefix?: string
//   disableStylesGeneration?: boolean
//   media?: string
//   id?: CreateGenerateIdOptions
//   // children: Node
// }

interface JssContent {
  manager: Record<string, any>;
  id?: CreateGenerateIdOptions;
  generateId?: GenerateId;
  classNamePrefix?: string;
  media?: string;
  jss?: Jss;
  disableStylesGeneration?: boolean;
  registry?: SheetsRegistry;
}

const JssProvider = defineComponent({
  props: {
    jss: {
      type: Object as PropType<Jss>,
      required: false,
    },
    registry: {
      type: Object as PropType<SheetsRegistry>,
      required: false,
    },
    generateId: {
      type: Function as PropType<GenerateId>,
      required: false,
    },
    classNamePrefix: {
      type: String,
      required: false,
    },
    disableStylesGeneration: {
      type: Boolean,
    },
    media: {
      type: String,
    },
    id: {
      type: Object as PropType<CreateGenerateIdOptions>,
    },
  },
  setup(props, { slots }: SetupContext) {
    // const registry: Ref<null | object> = ref(null)
    const manager = ref({});
    const generateId = ref({});

    const context = computed(() => {
      return createContextInstance(props, manager);
    });

    watch(
      () => props.generateId,
      () => {
        if (props.generateId) {
          generateId.value = props.generateId;
        } else {
          generateId.value = createGenerateId();
        }
      },
    );

    watch(
      () => props.registry,
      () => {
        manager.value = {};
      },
    );

    provide(JssContext, context);

    return () => slots.default && slots.default();
  },
});

// ;(JssProvider as any).props = [
//   'jss',
//   'registry',
//   'generateId',
//   'classNamePrefix',
//   'disableStylesGeneration',
//   'media',
//   'id',
// ]

export default JssProvider;

function createContextInstance(
  props: {
    disableStylesGeneration: boolean;
    media?: string;
    generateId?: GenerateId;
    classNamePrefix?: string;
    jss?: Jss;
    registry?: SheetsRegistry;
    id?: unknown;
  },
  manager: any,
) {
  const {
    classNamePrefix,
    jss,
    generateId,
    disableStylesGeneration,
    media,
    id,
    registry,
  } = props;

  const context: JssContent = {
    manager,
  };

  if (registry) {
    context.registry = registry;
  }

  if (id !== undefined) {
    context.id = id;
  }

  context.generateId = generateId;

  if (classNamePrefix) {
    context.classNamePrefix =
      (context.classNamePrefix ? context.classNamePrefix : "") +
      classNamePrefix;
  }

  if (media !== undefined) {
    context.media = media;
  }

  if (jss) {
    context.jss = jss;
  }

  if (disableStylesGeneration !== undefined) {
    context.disableStylesGeneration = disableStylesGeneration;
  }

  return context;
}
