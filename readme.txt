디비 비번 : 1q2w3e4r!

{회원가입}
requset => localhost:8010/auth/join (post)

{
    "email": "asdfasdfasdf@naver.com",
    "location": "화천",
    "phoneNumber": "01012312323",
    "username": "이재성",
    "password": "1234",
}

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

(실패)(이미 가입된 아이디)
status: 403
response =>
"이미 가입된 아이디입니다."

(실패)(로그인 상태로 리소스에 접근)
status: 403
response =>
"로그인 상태에서 접근 불가능합니다."

{로그인}
request => localhost:8010/auth/login   (post)

{
    "email": "asdfasdfasdf@naver.com",
    "password": "1234",
}

(성공)
status : 200
response =>
{
    "id": 1,
    "phoneNumber": "0213498563120",
    "username": "가나다라마",
    "email": "dlaxodud1217@daum.net",
    "password": "$2a$12$UlbHEL/tyHeblor.79b79.gy.VxbYzIBBbtftUfd987wJhyT1PuvC",
    "Classification_address": "화천",
    "createdAt": "2020-06-28T04:55:17.000Z",
    "updatedAt": "2020-06-28T04:55:17.000Z"
}

{로그아웃}
request =>http://localhost:8010/auth/logout (get)

(성공)
status : 200
response =>
{
    "로그아웃 완료"
}

{화천 목록 접근}
requset => localhost:8010/hwacheon (get)

(성공)
status: 200
response =>
  [
    {
        "id": 1,
        "business_name": "경복원",
        "tel": "033-442-6017",
        "restaurant_type": "중식",
        "Classification_address": "화천",
        "address": "강원도 화천군 상서면 영서로 7724",
        "open_time": "11:00",
        "close_time": "22:00",
        "createdAt": "2020-06-28T05:08:51.000Z",
        "updatedAt": "2020-06-28T05:08:51.000Z"
    },
    {
        "id": 2,
        "business_name": "유촌식당",
        "tel": "033-442-5062",
        "restaurant_type": "한식",
        "Classification_address": "화천",
        "address": "강원도 화천군 간동면 느릅길 1",
        "open_time": "09:00",
        "close_time": "22:00",
        "createdAt": "2020-06-28T05:13:46.000Z",
        "updatedAt": "2020-06-28T05:13:46.000Z"
    },
    {
        "id": 3,
        "business_name": "황궁쟁반짜장",
        "tel": "033-442-5002",
        "restaurant_type": "중식",
        "Classification_address": "화천",
        "address": "강원도 화천군 화천읍 중앙로2길 8",
        "open_time": "11:30",
        "close_time": "22:00",
        "createdAt": "2020-06-28T05:16:24.000Z",
        "updatedAt": "2020-06-28T05:16:24.000Z"
     }
     ........
  ]

{특정 지역의 특정 가게 접근}
requset => localhost:8010/hwacheon/:id (get)
예) localhost:8010/hwacheon/1
status : 200
response =>
{
    "id": 1,
    "business_name": "경복원",
    "tel": "033-442-6017",
    "restaurant_type": "중식",
    "Classification_address": "화천",
    "address": "강원도 화천군 상서면 영서로 7724",
    "open_time": "11:00",
    "close_time": "22:00",
    "createdAt": "2020-06-28T05:08:51.000Z",
    "updatedAt": "2020-06-28T05:08:51.000Z"
}

{건의 메일 발송}
request => http://localhost:8010/suggestion/mailsend (post)
{
    "suggestion" : "00000가 잘 안돼요",
   "suggestion_content" : "애애애앵애애애애애애ㅐ앵",
}

response =>
(성공)
status: 200
{
      "이메일 발송에 성공했습니다!"
}



{비밀번호 찾기}
request => http://localhost:8010/auth/mailsend  (post)
{
    email : "dlaxodud1217@daum.net",
}

response
(성공)
status : 200
{
   "이메일 발송에 성공했습니다!"
}
(실패)
status : 500
{
    "새 비밀번호 암호화 과정에서 문제가 발생했습니다!"
}

{비밀번호 변경}
request => http://localhost:8010/auth/passwordchange  (post)
{
    "password" : "1234",
}

response
(성공)
status : 200
{
   "비밀번호 변경이 완료되었습니다."
}
(실패)
status : 500
{
    "비밀번호 변경에 실패하였습니다!"
}
