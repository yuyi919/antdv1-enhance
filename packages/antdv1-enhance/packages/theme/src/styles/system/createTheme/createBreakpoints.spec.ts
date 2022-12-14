import { createBreakpoints } from "./createBreakpoints";

describe("createBreakpoints", () => {
  const breakpoints = createBreakpoints({});
  const customBreakpoints = createBreakpoints({
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  });

  describe("up", () => {
    it("should work for xs", () => {
      expect(breakpoints.up("xs")).toEqual("@media (min-width:0px)");
    });

    it("should work for md", () => {
      expect(breakpoints.up("md")).toEqual("@media (min-width:900px)");
    });

    it("should work for custom breakpoints", () => {
      expect(customBreakpoints.up("laptop")).toEqual(
        "@media (min-width:1024px)",
      );
    });
  });

  describe("down", () => {
    it("should work", () => {
      expect(breakpoints.down("sm")).toEqual("@media (max-width:599.95px)");
    });

    it("should work for md", () => {
      expect(breakpoints.down("md")).toEqual("@media (max-width:899.95px)");
    });

    it("should work for xs", () => {
      expect(breakpoints.down("xs")).toEqual("@media (max-width:-0.05px)");
    });

    it("should accept a number", () => {
      expect(breakpoints.down(600)).toEqual("@media (max-width:599.95px)");
    });

    it("should work for xl", () => {
      expect(breakpoints.down("xl")).toEqual("@media (max-width:1535.95px)");
    });

    it("should work for custom breakpoints", () => {
      expect(customBreakpoints.down("laptop")).toEqual(
        "@media (max-width:1023.95px)",
      );
    });

    it("should work for the largest of custom breakpoints", () => {
      expect(customBreakpoints.down("desktop")).toEqual(
        "@media (max-width:1279.95px)",
      );
    });
  });

  describe("between", () => {
    it("should work", () => {
      expect(breakpoints.between("sm", "md")).toEqual(
        "@media (min-width:600px) and (max-width:899.95px)",
      );
    });

    it("should accept numbers", () => {
      expect(breakpoints.between(600, 800)).toEqual(
        "@media (min-width:600px) and (max-width:799.95px)",
      );
    });

    it("should work on largest breakpoints", () => {
      expect(breakpoints.between("lg", "xl")).toEqual(
        "@media (min-width:1200px) and (max-width:1535.95px)",
      );
    });

    it("should work for custom breakpoints", () => {
      expect(customBreakpoints.between("tablet", "laptop")).toEqual(
        "@media (min-width:640px) and (max-width:1023.95px)",
      );
    });
  });

  describe("only", () => {
    it("should work", () => {
      expect(breakpoints.only("md")).toEqual(
        "@media (min-width:900px) and (max-width:1199.95px)",
      );
    });

    it("on xl should call up", () => {
      expect(breakpoints.only("xl")).toEqual("@media (min-width:1536px)");
    });

    it("should work for custom breakpoints", () => {
      expect(customBreakpoints.only("tablet")).toEqual(
        "@media (min-width:640px) and (max-width:1023.95px)",
      );
    });
  });
});
