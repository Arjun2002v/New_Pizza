import { useEffect, useState } from "react";

const useRest = (resID) => {
  const [resData, setResData] = useState(null);
  const API_URL =
    "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.992311712735347&lng=77.70354036655421&restaurantId=";

 useEffect(()=>{
    const fetching = async() =>{
        const res = await fetch(API_URL+resID);
        const data= await res.json()
        setResData(data.data)
    };
    fetching();
  }, []);

export default useRest;