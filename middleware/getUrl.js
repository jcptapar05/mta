const IS_SERVER = typeof window === "undefined";

export default function getURL(path) {
  const baseURL = IS_SERVER ? process.env.APIBASEURL : window.location.origin;
  return new URL(path, baseURL).toString();
}
