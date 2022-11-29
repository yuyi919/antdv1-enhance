import { createUseClasses, styled } from "@yuyi919/antdv1-plus-theme";

const [classes, useClasses, ClassesProps] = createUseClasses("modal", {
  wrap: "wrap",
});

export const useStyles = styled.makeUse`
  &${classes.root} {
    ${classes.wrap} {
    }
  }
`;

export { useClasses, ClassesProps };
