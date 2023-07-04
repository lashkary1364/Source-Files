import axios from 'axios'
import swal from 'sweetalert';
export default function  GetAllShomareName(data) {
  const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
  
  const promise = axios.get(serverAdress + `GetAllShomareName?list=${parseInt(data)}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
    }
  });

  const dataPromise = promise.then((response) => response.data);
  console.log(dataPromise);
  return dataPromise;
}


