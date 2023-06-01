import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }



  render() {

    const handleLogout = () => {
      console.log("log out")
      const user = JSON.parse(sessionStorage.getItem("LoginTocken"))
      
      console.log("user:");
      console.log(JSON.parse(sessionStorage.getItem("LoginTocken")))
      
      
      console.log(user.userFirstName);
      console.log(user.userLastName);
      sessionStorage.clear();
      localStorage.clear();
      console.log("user")
      console.log(sessionStorage.getItem("LoginTocken"))

     
      window.location.replace('/')
      window.location.clear()

     //  window.location.href='http://localhost:3000/'
     //  window.location.assign('http://localhost:3000/')
       //window.open('http://localhost:3000/blog-overview')
    }
    return (
      <NavItem>
          <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img onClick={handleLogout}
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/download.jpg")}
            alt="خروج از سیستم"
            title="خروج از سیستم"
           // tag={Link} to="/"
          />
          <span className="d-none d-md-inline-block">{ JSON.parse(sessionStorage.getItem("LoginTocken")).userFirstName } { JSON.parse(sessionStorage.getItem("LoginTocken")).userLastName }</span>
        </DropdownToggle>
        {/* <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img onClick={handleLogout}
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/download.jpg")}
            alt="خروج از سیستم"
          />{" "}
          <span className="d-none d-md-inline-block">{ JSON.parse(sessionStorage.getItem("LoginTocken")).userFirstName } { JSON.parse(sessionStorage.getItem("LoginTocken")).userLastName }</span>
        </DropdownToggle> */}
        {/* <Collapse tag={DropdownMenu} right small open={this.state.visible}> */}
          {/* <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>
          <DropdownItem divider /> */}
          {/* <DropdownItem className="text-danger" onClick={handleLogout} tag={Link} to="/">
            <i className="material-icons text-danger">&#xE879;</i> خروج
          </DropdownItem> */}
          {/* <DropdownItem tag={Link} to="/" className="text-danger" >
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem> */}
        {/* </Collapse> */}
        
      </NavItem>
    );
  }
}
