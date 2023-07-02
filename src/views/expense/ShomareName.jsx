import axios from 'axios'
import swal from 'sweetalert';
export default function ShomareName(listId) {
  
    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    axios(
        {
          url: serverAdress + `GetAllShomareName?list=${listId}`,
          method: "get",
          headers:
          {
            Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        }).then(function (response) {
          console.log("get all tankhah ...");
          const resultItems = response.data;
          console.log(resultItems);
          alert(resultItems);
          return resultItems;       
  
        }).catch(function (error) {
          // handle error
          console.log("axois error: ");
          console.log(error);
          swal("Error", error.message, "error");
          return null;
        })
}


