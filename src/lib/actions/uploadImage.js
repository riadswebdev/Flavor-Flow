const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;


export const uploadToImgBB = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (data.success) {
    return data.data.url;
  } else {
    throw new Error("Image upload failed to ImgBB");
  }
};
