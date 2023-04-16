
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {  Button } from "shards-react";

 const CellRenderer=(props)=> {
 
  const handleClick = () => {
    props.api.startEditingCell({
      rowIndex: props.rowIndex,
      colKey: props.column.getId(),
    });
    console.log("prop:");
    console.log(props);
    console.log("props data");
    console.log(props.data)
    console.log("make:");
    console.log(props.data.make)
    alert("row index: "+props.rowIndex);
    alert("col index: "+props.column.getId());
  };
  return (
   
    <Button size="sm" theme="warning" className="mb-2 mr-1" onClick={handleClick} title="ویرایش">
    <FontAwesomeIcon icon={faEdit} />
    </Button>
     
  );
}

export default CellRenderer