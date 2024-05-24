const IS_SERVER = typeof window === "undefined";

export default function getAwsFilesBaseUrl(path) {
  const baseURL = IS_SERVER ? process.env.S3_AWS_S3_BUCKET_BASEURL : 'https://my-top-arts.s3.ap-southeast-1.amazonaws.com/';
  return new URL(path, baseURL).toString();
}
