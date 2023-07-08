// export default function GetAllSalMali(mohitId) {
   
//     const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
  
//     const promise = axios.get(serverAdress + `GetAllSalMali?mohitId=${mohitId}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
//       }
//     });
  
//     const dataPromise = promise.then((response) => response.data);
//     console.log(dataPromise);
//     return dataPromise;
// }


   
//     axios(
//       {
//         url: serverAdress + `GetAllSalMali?mohitId=${mohitId}`,
//         method: "get",
//         headers:
//         {
//           Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
//           'Cache-Control': 'no-cache',
//           'Pragma': 'no-cache',
//           'Expires': '0',
//         }
//       }).then(function (response) {

//         console.log("get all sal mali ....")
//         const resultItems = response.data;
//         resultItems.map(data => {
//           setSalMaliItems(salMaliItems => [...salMaliItems, { SalId: data.salId, SalMali: data.salMali }]);
//         });

//       }).catch(function (error) {
//         swal("error", error.message, "error");
//       })
//   }