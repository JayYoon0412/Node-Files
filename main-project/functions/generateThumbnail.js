const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

exports.thumbnailGCS = async (event, context) => {
  //이미 생성된 thumbnail 이미지들이 존재한다면 또 생성하지 않는다
  if (event.name.includes("thumb/")) return;
  //사이즈 옵션 배열로 담아주기 (반복 피하기 위해)
  const sizes = [
    [320, "s"],
    [640, "m"],
    [1280, "l"],
  ];
  //event.name 변수에 담아줘서 고정 시키기
  const name = event.name;
  //스토리지 위치 확인
  const storage = new Storage().bucket(event.bucket);

  await Promise.all(
    //사이즈 옵션 배열 각각 불러오기
    sizes.map(([size, dirname]) => {
      return new Promise((resolve, reject) => {
        storage
          .file(name)
          //파일 읽기
          .createReadStream()
          //sharp 이용해서 사이즈 옵션대로 바꾸기
          .pipe(sharp().resize({ width: size }))
          //저장 경로 명시하기
          .pipe(storage.file(`thumb/${dirname}/${name}`))
          //저장
          .createWriteStream()
          //이 과정이 끝나면 Promise resolve
          .on("finish", () => resolve())
          //또는 에러가 뜨면 Promise error
          .on("error", () => reject());
      });
    })
  );
};
