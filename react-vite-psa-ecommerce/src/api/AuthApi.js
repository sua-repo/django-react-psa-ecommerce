import http from './HttpCommon';



//dev_5_fruits
//http://127.0.0.1:8000/api/
// # 경로	설명
// # POST /auth/jwt/create/	로그인 (토큰 발급)
// # POST /auth/jwt/refresh/	액세스 토큰 갱신
// # POST /auth/jwt/verify/	토큰 유효성 확인
// # POST /auth/users/	회원가입
// # GET /auth/users/me/	현재 로그인된 사용자 조회

// Djoser 사용
// export const loginUser = (username,password) => {
//     return http.post("/api/auth/jwt/create/",{
//         username,
//         password
//     });
// };

// //현재 로그인된 사용자 조회
// export const getCurrentUser = () => {
//     return http.get("/api/auth/users/me/");
// };


// # http://127.0.0.1:8000/api/dj-rest-auth/login/
// # ✅ 기본 엔드포인트 목록 (JWT 기준)
// # HTTP Method    Endpoint URL    설명
// # POST    /dj-rest-auth/login/    로그인 (JWT 또는 세션)
// # POST    /dj-rest-auth/logout/    로그아웃 (세션 삭제 or 쿠키 삭제)
// # POST    /dj-rest-auth/registration/    회원가입
// # POST    /dj-rest-auth/password/change/    비밀번호 변경
// # POST    /dj-rest-auth/password/reset/    비밀번호 초기화 이메일 전송
// # POST    /dj-rest-auth/password/reset/confirm/    비밀번호 초기화 완료
// # GET    /dj-rest-auth/user/    현재 로그인된 사용자 정보 가져오기
// # PUT/PATCH    /dj-rest-auth/user/    사용자 정보 수정

export const loginUser = (username,password) => {
    return http.post("/api/dj-rest-auth/login/",{
        username,
        password
    });
};

//현재 로그인된 사용자 조회
export const getCurrentUser = () => {
    return http.get("/api/dj-rest-auth/user/");
};
