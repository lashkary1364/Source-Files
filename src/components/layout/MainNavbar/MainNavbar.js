import React , {useCallback, useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";
import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";
import { Dispatcher, Constants } from "../../../flux";
const MainNavbar = ({ layout, stickyTop }) => {

// const handleToggleSidebar=useState(handleToggleSidebar,()=>{},
//   // () => {
//   //   console.log('Click happened');
//   // },
//   [], // Tells React to memoize regardless of arguments.
// );
  
  // const handleToggleSidebar=()=>{
  //   console.log("clicked ....");
  
  // Dispatcher.dispatch({
  //     actionType: Constants.TOGGLE_SIDEBAR
  //   });
  // }
  // constructor(props) {
  //   super(props);

  //   this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  // }
  // this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
//  const handleToggleSidebar=()=> {

//     Dispatcher.dispatch({
//       actionType: Constants.TOGGLE_SIDEBAR
//     });
//   }

  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );


  return (
    <div className={classes}> 
   <div className="p-0">
   <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">       
        <NavbarSearch />
        <NavbarNav />
        <NavbarToggle />
      </Navbar>
   </div>
    {/* <Container className="p-0" >      
      <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">       
       <NavbarSearch />
        <NavbarNav />
        <NavbarToggle />
      </Navbar>
    </Container> */}
  </div>
 
    // <div className="form-inline">
       /* <a onClick={() =>   Dispatcher.dispatch({ actionType: Constants.TOGGLE_SIDEBAR })}
       className="toggle-sidebar d-sm-inline d-md-none d-lg-none" 
       >
        <i className="material-icons" >&#xE5C4;</i>
         dashboard
         </a> */

     
    // </div>
  
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
