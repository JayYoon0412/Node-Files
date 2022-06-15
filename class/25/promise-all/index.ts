const fetchData = async () => {
    console.time("Promise Time Tester")
    await new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve("success1")
        }, 2000)
    })
    await new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve("success2")
        }, 3000)
    })
    await new Promise((resolve, reject)=> {
        setTimeout(()=> {
            resolve("success3")
        }, 1000)
    })
    console.timeEnd("Promise Time Tester")

    console.log("모두 마쳤습니다.")
}

fetchData();

//각각 개별적으로 await하는 것이 아니라 하나로 묶어서 전체를 기다리는 것
//이게 훨씬 더 효율적이다 (끝나는 애들은 빨리 끝낼 수 있음)
const fetchDataArray = async () => {
    console.time("Promise Time Tester2")
    await Promise.all([
        new Promise((resolve, reject)=> {
            setTimeout(()=> {
                resolve("success1")
        }, 2000)}),

        new Promise((resolve, reject)=> {
            setTimeout(()=> {
                resolve("success1")
        }, 3000)}),

        new Promise((resolve, reject)=> {
            setTimeout(()=> {
                resolve("success1")
        }, 1000)}),
    ])
    console.timeEnd("Promise Time Tester2")
    console.log("모두 마쳤습니다.")
}

fetchDataArray();