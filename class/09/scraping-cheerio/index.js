import axios from 'axios'
import cheerio from 'cheerio'

async function createBoardAPI(mydata){
    // 1. 입력된 컨텐츠에서 http로 시작하는 글자 있는지 찾기
    const myurl = mydata.contents.split(" ").filter((ele)=>(ele.includes("http")))[0]
    // 2. 만약 있다면, 찾은 주소로 axios.get 요청해서 html 코드 받아오기 (스크래핑)
    const result = await axios.get(myurl)
    // 3. 스크래핑 결과에서 OG 태그 골라내서 변수에 저장하기 -> 쉽게 골라낼 수 있게 하는 툴 cheerio
    const $ = cheerio.load(result.data)
    $("meta").each((_, ele) => {
        if ($(ele).attr("property")) {
            const key = $(ele).attr("property").split(":")[1]
            const value = $(ele).attr("content")
            console.log(`${key}: ${value}`)
        }
    })
}

const frontendData = {
    title: "안녕하세요",
    contents: "여기 정말 좋은 것 같네요. https://daum.net 에서 만나요"
}
createBoardAPI(frontendData)