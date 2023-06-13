function isTokenExpired(accessToken) {
    const tokenExpiration = new Date(accessToken);
    const currentTime = new Date();
  
    return tokenExpiration.getTime() < currentTime.getTime();
  }

export default isTokenExpired;