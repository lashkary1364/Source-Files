import React  , { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export const GridViewEdit = (props) => {
    const [parameters,setParameters]=useState({OperationType:"edit" , data:props.data})

    return (
        <Link size="sm" theme="warning" className="mb-2 mr-1"  title="ویرایش" to={props.path+"?id="+props.data.soratID+"&operation=edit"}  style={{color:'orange'}} >
            <FontAwesomeIcon icon={faEdit} />
        </Link>



    )
}
