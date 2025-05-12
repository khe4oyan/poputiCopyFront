async function blobUrlToURL(blobUrl, fileName = "profile.png") {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

export default blobUrlToURL;