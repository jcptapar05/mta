const IS_SERVER = typeof window === "undefined";

export default function ttsKey(path) {
  const baseURL = IS_SERVER ? process.env.ELEVANLABS_API : "bd83cf6b10aadb28049ccdc5b0083d17";
  return baseURL.toString();
}
