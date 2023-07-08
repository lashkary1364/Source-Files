
import axios from 'axios';
import React, { useState } from 'react'
export default  function GetAllMohit ()  {
   
    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));
   

    const promise = axios.get( serverAdress + `GetAllMohit?userId=${user.UserId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
      }
    });
  
    const resultItems = promise.then((response) => response.data);
    // .catch(error => {
    //     swal("error", error.message, "error");
    //   });

    console.log(resultItems);
    // resultItems.map(data => {
    //     setMohitItems(mohitItems => [...mohitItems, { MohitId: data.mohitID, MohitOnvan: data.mohitOnvan }]);
    //   });                   
    //   console.log(mohitItems);
    
    return resultItems;
}
    
    // const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    // const [user] = useState(JSON.parse(sessionStorage.getItem("LoginTocken")));

    // axios(
    //   {
    //     url: serverAdress + `GetAllMohit?userId=${user.UserId}`,
    //     method: "get",
    //     headers:
    //     {
    //       Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
    //       'Cache-Control': 'no-cache',
    //       'Pragma': 'no-cache',
    //       'Expires': '0',
    //     }
    //   }).then(function (response) {

    //     console.log("get all mohit ....")
    //     const resultItems = response.data;
    //     console.log(resultItems);
    //     resultItems.map(data => {
    //       setMohitItems(mohitItems => [...mohitItems, { MohitId: data.mohitID, MohitOnvan: data.mohitOnvan }]);
    //     });

    //   }).catch(function (error) {
    //     swal("error", error.message, "error");
    //   })

 // }
