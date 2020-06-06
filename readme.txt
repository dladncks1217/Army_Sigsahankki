회원가입
requset => localhost:8010/auth/join (post)

(성공)
status: 200
response =>
{
    "id": 2,
    "email": "asdfasdfasdf@naver.com",
    "location": "화천",
    "phoneNumber": "01012312323",
    "username": "이재성",
    "password": "$2a$12$C.ytWmkRJe54PDWz04EhRu0394amdNa4mGaffcUKN0dm40SvfKwBS",
    "updatedAt": "2020-06-06T08:02:42.866Z",
    "createdAt": "2020-06-06T08:02:42.866Z"
}

실패(이미 가입된 아이디)
status: 403
response =>
"이미 가입된 아이디입니다."



