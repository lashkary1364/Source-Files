import React , {useState} from 'react'
import { Button } from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import CustomerContext from './CustomeContexct';
import { useContext , useEffect } from 'react';
import { Component, ServerSideTransactionResultStatus } from 'ag-grid-community';



export const GridDataDetail = (props) => {

  //  const state = useContext(CustomerContext)
  //  const [stateStatus,setStateStatus]=useState(state);

  // const handleClick = () => {
  //   props.api.startEditingCell({
  //     rowIndex: props.rowIndex,
  //     colKey: props.column.getId(),
  //   });

  //   // console.log("prop:");
  //   // console.log(props);
  //   // console.log("props data");
  //   // console.log(props.data)
  //   // console.log("make:");
  //   // console.log(props.data.make)
  //   // alert("row index: " + props.rowIndex);
  //   // alert("col index: " + props.column.getId());


  //   // console.log("state :")
  //   // console.log(state)
  //   state.StateCrud = "detail"

  //   setStateStatus(state.StateCrud)

  // };


// useEffect(() => {
  
//   console.log("component did mount")

//   return () => {
//     //second
//   }
// }, [])


//   useEffect(() => {
    
  
//     console.log("componentdidUpdate")
    
//     return () => {
//       console.log("componrDidUnmpount")
//     }

//   }, [stateStatus])
  

  // console.log("props detail:")
  // console.log(props);

  const [parameters,setParameters]=useState({OperationType:"detail" , data:props.data})

  return (
    <div>
      <Button size="sm" theme="primary" className="mb-2 mr-1" title="جزئیات" onClick={event => props.handleClick(parameters)}  >
        <FontAwesomeIcon icon={faCircleInfo} />
      </Button>
    </div>)

}
