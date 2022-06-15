console.log("hello world")

const fetchData = () => {
    new Promise((resolve, reject)=> {
        // XMLHttpRequest등 실핼 -- 뭔가 API 작업들
        setTimeout(()=> {
            try {
                resolve("상공했으면 데이터 이쪽으로 들어감.")
            } catch(error) {
                reject("실패하면 여기서 인자로 사용")
            }
        }, 2000);

    }).then((res)=> {
        console.log(res)
    })
}

fetchData()