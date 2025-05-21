import axios from "axios";
import crypto from "crypto-js";

export const uploadImage = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "images_preset");
  data.append("cloud_name", "dmlxstk36");
  data.append("folder", "images");
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/dmlxstk36/image/upload`,
    data
  );
  return response;
};
export const deleteImage = async (picturePublicId) => {
  const cloudName = "dmlxstk36";
  const apiKey = "842566821595477";
  const apiSecret = "CBStUdl4QsNnrZF7XMYUvzYGTMo";
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto
    .SHA1(`public_id=${picturePublicId}&timestamp=${timestamp}${apiSecret}`)
    .toString();
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
  const response = await axios.post(url, {
    public_id: picturePublicId,
    signature: signature,
    api_key: apiKey,
    timestamp: timestamp,
  });
  return response;
};
