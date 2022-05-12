import express from 'express';
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//API 서버를 실행, 접속을 기다린다 (계속 대기상태)
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})