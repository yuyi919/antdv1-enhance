import { createUseClasses, styled } from "@yuyi919/antdv1-plus-theme";

const [classes, useClasses] = createUseClasses("action", {
  hidden: "hidden",
  flex: "flex",
});

export const useStyles = styled.makeUse`
  &${classes.root} {
    &${classes.flex}:not(${classes.hidden}) {
      display: inline-flex;
      flex: auto;
      justify-content: center;
      align-items: center;
      & > * {
        display: inline-flex;
      }
    }
  }
`;

export { useClasses };
export type Classes = ReturnType<typeof useClasses>;
