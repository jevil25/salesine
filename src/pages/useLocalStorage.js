import { useState, useEffect } from "react";

const useLocalStorage = (name,action) => {
  const [isFetched, setisFetched] = useState('')

  if(action == "getvalue")
  {
    useEffect(() => {
    setisFetched(localStorage.getItem(name));
    },[]);
  }
  else{
  useEffect(() => {
    if(localStorage.getItem(name) == 0)
    {
        console.log("setting to 1")
    setisFetched(localStorage.getItem(name))
    localStorage.setItem("isFetched",1);
    }
    // else{
    //     console.log("setting to 0")
    //     localStorage.setItem("isFetched",0);
    //     setisFetched(localStorage.getItem(name))
    // }
  }, [])
}

  return isFetched
}

export default useLocalStorage