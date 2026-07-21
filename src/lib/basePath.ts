export const getBasePath = (): string => {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL) {
    const base = import.meta.env.BASE_URL;
    return base === "/" ? "" : base.replace(/\/$/, "");
  }
  return "";
};
