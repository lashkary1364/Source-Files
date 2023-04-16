import { Button } from "shards-react";
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";


const DetailTest = (props) => {

    
    //   console.log(props);
    //   console.log("handleClick")
    //  const [values,SetValues]=useState(props.data);

    return (<div>

        <Button size="sm" theme="primary" className="mb-2 mr-1" title="جزئیات"   >
            <FontAwesomeIcon icon={faCircleInfo} />
        </Button>


    </div>)
}



export default DetailTest;