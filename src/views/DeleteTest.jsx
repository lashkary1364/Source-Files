import { Button } from "shards-react";

import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash } from "@fortawesome/fontawesome-free-solid";

const DeleteTest = (props) => {
    return (<div>

        <Button size="sm" theme="danger" className="mb-2 mr-1" title="حذف" >  
        <FontAwesomeIcon icon={faTrash} />
        </Button>

    </div>)
}



export default DeleteTest;