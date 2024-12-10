import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY_IMGKIT,
  privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY_IMGKIT,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT_IMGKIT,
});

export default imagekit;
