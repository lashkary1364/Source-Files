import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";
import { Dispatcher, Constants } from "../../../flux";

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  
    
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  render() {
    const { hideLogoText } = this.props;
    // return (
    //   <div className="main-navbar">
    //     <Navbar
    //       className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
    //       type="light"
    //     >
    //       <NavbarBrand
    //         className="w-100 mr-0"
    //         href="#"
    //         style={{ lineHeight: "25px" }}
    //       >
    //         {/* <div className="d-table m-auto">          
    //           <img
    //             id="main-logo"
    //             className="btn-close text-reset" data-bs-dismiss="main-sidebar" aria-label="Close"
    //            // className="d-inline-block align-top mr-1"
    //             style={{ maxWidth: "25px" }}
    //             src={require("../../../images/logo.svg")}
    //           //  src={require("../../../images/shards-dashboards-logo.svg")}
    //             //{require("../../../images/shards-dashboards-logo.svg")}
    //            alt="مدیریت تنخواه"
    //           />
    //            {/* <button type="button" class="btn btn-close text-reset" data-bs-dismiss="MainNavbar" aria-label="Close"></button> */}
    //            {/* {!hideLogoText && (
    //             <span className="d-none d-md-inline ml-1">
    //             مدیریت تنخواه
    //             </span>
    //           )}
             
    //         </div> */} 

    //         <div className="d-table m-auto">
    //           <img
    //             id="main-logo"
    //             className="d-inline-block align-top mr-1"
    //             style={{ maxWidth: "25px" }}
    //             src={require("../../../images/shards-dashboards-logo.svg")}
    //             alt="Shards Dashboard"
    //           />
    //           {!hideLogoText && (
    //             <span className="d-none d-md-inline ml-1">
    //               Shards Dashboard
    //             </span>
    //           )}
    //         </div>
    //       </NavbarBrand>
    //       {/* eslint-disable-next-line */}
    //       <a
    //         className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
    //         onClick={this.handleToggleSidebar}>
    //         <i className="material-icons">&#xE5C4;</i>
    //         تنخواه
    //       </a>
    //     </Navbar>
    //   </div>
    // );

    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100 mr-0"
            href="#"
            style={{ lineHeight: "25px" }}
          >
            <div className="d-table m-auto">
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "50px" }}
                src={require('../../../images/logo.png')}
                alt="مدیریت تنخواه"
              />
              {!hideLogoText && (
                <span className="d-none d-md-inline ml-1">
                مدیریت تنخواه
                </span>
              )}
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a   className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
               onClick={this.handleToggleSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false
};

export default SidebarMainNavbar;
