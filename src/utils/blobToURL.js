async function blobUrlToFile(blobUrl, fileName = "profile.png") {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

export default blobUrlToFile;