import { createUseClasses, styled } from "@yuyi919/antdv1-plus-theme";

const [classes, useClasses] = createUseClasses("action-group", {
  flex: "flex",
  inline: "inline",
});

export const useStyles = styled.makeUse`
  &${classes.root} {
    &${classes.flex} {
      display: flex;
    }
    &${classes.inline} {
      display: inline;
    }
    position: relative;
  }
`;

export { useClasses };
export type Classes = ReturnType<typeof useClasses>;
