import express from 'express';

const app = express();

app.get('/stocks', (req, res) => {
    res.send("주식가격 조회 요청에 성공하였습니다.")
});

app.get('/stocks/max', (req, res) => {
    res.send("주식 최대가격 조회 요청에 성공하였습니다.")
});

app.post('/stocks', (req, res) => {
    res.send("신규 주식 등록 요청에 성공하였습니다.")
})

app.listen(3002);