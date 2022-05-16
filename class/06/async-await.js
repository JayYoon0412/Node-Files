//html에서는 axios를 script 에서 설치했지만 node 환경에서는 node-modules로 설치
import axios from 'axios';
//asynchronous (비동기 -> often, default for efficiency)
function fetchPostAsync() {
    const result = axios.get("https://koreanjson.com/posts/1");
    console.log(result); //Promise ( pending )
}

fetchPostAsync();

//synchronous (동기방식 -> 순서 있음 -> similar to data hazards)
async function fetchPostSync() {
    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log(result.data);
}

fetchPostSync();