import { Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileService {

    async upload({ files }) {
        const waitedFiles = await Promise.all(files);
        //구글 스토리지에 파일 업로드하기
       
        const storage = new Storage({
            projectId: "celestial-math-352613",
            keyFilename: "gcp-file-storage.json"
        }).bucket("test-account-03");

        // await new Promise((resolve, reject) => {
        //     firstImg.createReadStream().pipe(storage.createWriteStream())
        //     .on('finish', ()=> resolve("success"))
        //     .on('error', ()=> reject("failed"))
        // //이 요청은 Promise가 아니기 때문에 await사용 불가능
        // })

        const urls = await Promise.all(waitedFiles.map((element)=> {
            return new Promise((resolve, reject) => {
                element.createReadStream().pipe(storage.file(element.filename).createWriteStream())
                .on('finish', ()=> resolve(`test-account-03/${element.filename}`))
                .on('error', ()=> reject("이미지 업로드를 실패했습니다"))
            })
        })); //이제 배열은 [Promise, Promise] 형태

        //관련 이미지 URL 반환
        return urls;
    }
}