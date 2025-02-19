import axios from "axios";

const BASE_URL = "https://hairgg.duckdns.org";
const REDIRECT_URI = "http://localhost:3000/main";
const CLIENT_ID = "541500219001-ftaggvf5pl3u4cbmr8fe0dq4rdm2bnv4.apps.googleusercontent.com";
const GOOGLE_LOGIN_LINK = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;

export const apiTest = async () => {
   const response = await axios.get(`${BASE_URL}/reservation/test1`);
   console.log(response.data);
};

export const loginTest = async () => {
      window.location.href = GOOGLE_LOGIN_LINK;
};

export const sendCode = async (code: string|null) => {
   console.log("sendCode 호출");
   console.log(code);
   // const response = await axios.post(`${BASE_URL}/login`, {
   //       code : code
   //    });
   // console.log(response);
   try {
      const response = await axios.post(`${BASE_URL}/login`, {
         code : code
      });
      console.log(response.data);
      //response.data에 토큰이 들어있으면 로컬스토리지에 저장
      localStorage.setItem("token", response.data.token);
      //잘 저장됐는지 확인
      console.log(localStorage.getItem("token"));

      //첫 로그인이면 signUp 호출
      if (response.data.firstLogin) {
         //회원가입 페이지로 이동
         console.log("첫 로그인 입니다.")
         window.location.href = "/signup";
      } else {
         console.log("첫 로그인이 아닙니다.")
      }
   } catch (error) {
      console.log(error);
   }
}

export const signUp = async (nickname: string, gender: string, phoneNumber: string) => {
   try {
      const token = localStorage.getItem("token"); 

      const response = await axios.post(`${BASE_URL}/signup`, {
         nickname: nickname,
         gender: gender,
         phoneNumber: phoneNumber
      }, {
         headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
         }
      });

      console.log(response.data);
   } catch (error) {
      console.log(error);
   }
};
