export const getBasePath = (): string => {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.BASE_URL) {
    const base = import.meta.env.BASE_URL;
    return base === "/" ? "" : base.replace(/\/$/, "");
  }
  return "";
};

// Backend API endpoints on Hostinger (Phusion Passenger) are served from domain root /api
export const getApiBasePath = (): string => {
  return "";
};
