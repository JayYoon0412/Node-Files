
// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  const phoneNumber = document.getElementById("PhoneNumber01").value+document.getElementById("PhoneNumber02").value+document.getElementById("PhoneNumber03").value
  await axios.post("http://localhost:3000/tokens/phone", {
    phone: phoneNumber
  })
  console.log('인증 번호 전송')
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const phoneNumber = document.getElementById("PhoneNumber01").value+document.getElementById("PhoneNumber02").value+document.getElementById("PhoneNumber03").value
  const userName = document.getElementById("SignupName").value
  const userSite = document.getElementById("SignupPrefer").value
  const userEmail = document.getElementById("SignupEmail").value
  await axios.post("http://localhost:3000/users", {
      user: {
        name: userName,
        phone: phoneNumber,
        site: userSite,
        email: userEmail
      }
    })
}
