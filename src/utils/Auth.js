import isTokenExpired from "./ExpirationChecker";

function getNewToken()
{
    fetch('http://localhost:5000/api/newAccessToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refreshToken:localStorage.getItem("refreshToken") })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("expiresIn")
          localStorage.setItem("accessToken",data.access_token)
          localStorage.setItem("refreshToken",data.refresh_token)
          localStorage.setItem("expiresIn",data.expiryTime)
        })
}

export function Auth()
{   
    console.log("inside auth")
    console.log(localStorage)
    if(typeof window !== 'undefined' && localStorage.getItem("expiresIn")!==null && localStorage.getItem("expiresIn")!==undefined){
        if(isTokenExpired(localStorage.getItem("expiresIn"))){
            getNewToken()
            return true
        }else{
            return true
        }
    }else{
        return false
    }
}

export function Logout()
{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("expiresIn")
    Auth()
}