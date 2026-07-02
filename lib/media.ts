// Cloudinary can serve any video frame as an image — swap the
// extension and ask for the first frame. Used as <video poster>.
export function videoPoster(videoUrl: string) {
  return videoUrl
    .replace("/video/upload/", "/video/upload/so_0/")
    .replace(/\.mp4$/, ".jpg");
}
