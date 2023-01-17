/* eslint-disable no-unused-expressions */
import Theme, {
  colorPalette,
  createUseClasses,
  ITheme,
  styled,
  TemplateArg,
} from "@yuyi919/antdv1-plus-theme";
import { IButtonProps } from "ant-design-vue";
import { computed } from "vue-demi";
import { HintFlagClasses } from "../HintFlag";
import { ButtonProps } from "./ButtonProps";

const [classes, useClasses] = createUseClasses("btn", {
  content: "content",
  secondary: "secondary",
  link: "link",
  secondaryGhost: ["second", "ghost"],
  custom: "custom",
  customGhost: ["custom", "ghost"],
  colorInherit: ["color", "inherit"],
  sizeSmall: ["size", "sm"],
  sizeLarge: ["size", "lg"],
  loading: ["state", "loading"],
  hidden: ["state", "hidden"],
} as const);

const btnColor = (
  color: TemplateArg<ButtonProps, ITheme>,
  backgroundColor: TemplateArg<ButtonProps, ITheme>,
  borderColor?: TemplateArg<ButtonProps, ITheme>,
): ((props: ButtonProps, theme?: ITheme) => any[]) => styled.createMixin`
  color: ${color};
  background-color: ${backgroundColor};
  border-color: ${borderColor};
`;
const getSecondary7 = Theme.pipe(
  Theme.getPalette("second"),
  (color) => color[7],
);
const getSecondary5 = Theme.pipe(
  Theme.getPalette("second"),
  (color) => color[5],
);
const getSecondary = Theme.getPalette("secondColor");

const getColor = (props: ButtonProps) => props.color;
const getColor5 = (props: ButtonProps) =>
  props.color && colorPalette(props.color, 5);
const getColor7 = (props: ButtonProps) =>
  props.color && colorPalette(props.color, 7);

const mixinLink = <Props>(
  color: TemplateArg<Props, ITheme>,
  padding: string = "0px",
) => styled.createMixin`
  position: relative;
  padding: 0;
  &[disabled] {
    color: #ccc;
  }
  &:not([disabled]) {
    color: ${color};
    &:after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      width: calc(100% - ${padding} * 2);
      height: 1px;
      background-color: ${color};
      transform-origin: center;
      transform: translate(-50%, 0) scaleX(0);
      transition: transform 0.1s ease-in-out;
    }
    &:hover {
      color: ${color};
      &:after {
        transform: translate(-50%, 0) scaleX(1);
      }
    }
  }
`;

const useStyles = styled.makeUse`
  &${classes.root} {
    ${HintFlagClasses.icon} {
      color: inherit !important;
    }
    &${classes.loading} {
      cursor: wait;
      /* 覆盖.ant-btn给内部的span元素添加的pointer-events: none */
      pointer-events: auto;
      &${classes.sizeSmall} {
        ${HintFlagClasses.root} {
          margin-left: 18px;
        }
      }
    }
    & > ${classes.content} {
      /* 覆盖.ant-btn给内部的span元素添加的pointer-events: none */
      pointer-events: auto;
    }
    &${classes.hidden} {
      padding: 0;
      width: 0;
      opacity: 0;
      margin: 0;
      overflow: hidden;
      transition-duration: 0.1s;
      flex: 0;
      &:not(${classes.link}) {
        border: 0;
      }
    }
    &:not(${classes.hidden}) + ${classes.root}:not(${classes.hidden}) {
      margin-left: 2px;
    }
    &${classes.secondary} {
      ${btnColor("white", getSecondary, getSecondary)}
      &:hover, &:focus {
        ${btnColor("white", getSecondary5, getSecondary5)}
      }
      &:active,
      &.active {
        ${btnColor("white", getSecondary7, getSecondary7)}
      }
      &${classes.secondaryGhost} {
        ${btnColor(getSecondary, "transparent", getSecondary)}
        &:hover, &:focus {
          ${btnColor(getSecondary5, "transparent", getSecondary5)}
        }
        &:active,
        &.active {
          ${btnColor(getSecondary7, "transparent", getSecondary7)}
        }
      }
    }
    &${classes.link} {
      ${mixinLink(
        Theme.defaultTo(
          (props: ButtonProps) => props.color,
          Theme.getPalette("primaryColor"),
        ),
      )}
    }
    &${classes.custom}:not(${classes.link}) {
      ${btnColor("white", getColor, getColor)}
      &:hover, &:focus {
        ${btnColor("white", getColor5, getColor5)}
      }
      &:active,
      &.active {
        ${btnColor("white", getColor7, getColor7)}
      }
      &${classes.customGhost} {
        ${btnColor(getColor, "transparent", getColor)}
        &:hover, &:focus {
          ${btnColor(getColor5, "transparent", getColor5)}
        }
        &:active,
        &.active {
          ${btnColor(getColor7, "transparent", getColor7)}
        }
      }
    }
  }
`;

const types = ["ghost", "primary", "danger", "dashed", "default", "link"];
export function useThemedButton(props: ButtonProps) {
  const classes1 = useClasses<"antv1-plus-">(useStyles(props));
  const classes = { ...classes1 };
  return [
    classes,
    computed(() => {
      const {
        type = "default",
        colorInherit,
        color,
        loading,
        size,
        ghost,
      } = props;
      // console.log(classNames, [
      //   classNames.root,
      //   classNames[type],
      //   type === "link" && colorInherit && "color-inherit",
      // ])
      return {
        props: {
          type:
            type === "second"
              ? "primary"
              : types.includes(type)
              ? type
              : "default",
          ghost: type === "link" ? false : ghost,
        } as IButtonProps,
        class: [
          classes.root,
          type === "second" && classes.secondary,
          type === "second" && ghost && classes.secondaryGhost,
          color && classes.custom,
          color && ghost && classes.customGhost,
          type === "link" && classes.link,
          type === "link" && colorInherit && classes.colorInherit,
          size === "small" && classes.sizeSmall,
          size === "large" && classes.sizeLarge,
          loading && classes.loading,
          props.hidden && classes.hidden,
        ] as string[],
      };
    }),
  ] as const;
}
