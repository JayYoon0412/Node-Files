const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

exports.thumbnailGCS = async (event, context) => {
  const sizes = [
    [320, "s"],
    [640, "m"],
    [1280, "l"],
  ];
  const storage = new Storage().bucket(event.bucket);

  await Promise.all(
    sizes.map(([size, dirname]) => {
      return new Promise((resolve, reject) => {
        storage
          .file(event.name)
          .createReadStream()
          .pipe(sharp().resize({ width: size }))
          .pipe(storage.file(`thumb/${dirname}/${event.name}`))
          .createWriteStream()
          .on("finish", () => resolve())
          .on("error", () => reject());
      });
    })
  );
};
