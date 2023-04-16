import React  , { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {  Button } from "shards-react";

export const GridDataEdit = (props) => {
    
    const [parameters,setParameters]=useState({OperationType:"edit" , data:props.data})

    return (
        <Button size="sm" theme="warning" className="mb-2 mr-1"  title="ویرایش"  onClick={event => props.handleClick(parameters)} >
            <FontAwesomeIcon icon={faEdit} />
        </Button>
    )
}
