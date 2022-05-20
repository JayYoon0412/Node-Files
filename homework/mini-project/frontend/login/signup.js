// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  const phoneNumber = document.getElementById("PhoneNumber01").value+document.getElementById("PhoneNumber02").value+document.getElementById("PhoneNumber03").value
  await axios.post("http://localhost:3000/tokens/phone", {
    phone: phoneNumber
  })
  console.log('인증 번호 전송')
}

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  console.log("clicked!")
  const phoneNumber = document.getElementById("PhoneNumber01").value+document.getElementById("PhoneNumber02").value+document.getElementById("PhoneNumber03").value
  const tokenIn = document.getElementById("TokenInput").value
  console.log(tokenIn)
  await axios.patch("http://localhost:3000/tokens/phone", {
    phone: phoneNumber,
    token: tokenIn
  })
  console.log('핸드폰 인증 완료')
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const phoneNumber = document.getElementById("PhoneNumber01").value+document.getElementById("PhoneNumber02").value+document.getElementById("PhoneNumber03").value
  await axios.post("http://localhost:3000/user", {
    name: document.getElementById("SignupName").value,
    email: document.getElementById("SignupEmail").value,
    personal: document.getElementsByClassName("SignupInput")[1].value,
    prefer: document.getElementById("SignupPrefer").value,
    pwd: document.getElementById("SignupPwd").value,
    phone: phoneNumber
  })
  console.log('회원 가입 완료')
}
