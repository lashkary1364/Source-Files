import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem , FormSelect } from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faRotate } from '@fortawesome/free-solid-svg-icons'
// import { icon } from '@fortawesome/fontawesome-free'
import { icon } from "@fortawesome/fontawesome-free-solid"

export default class Mohit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (

  <NavItem className="border-right dropdown">
         <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}>
          <div className="nav-link-icon__wrapper text-nowrap px-3 mt-2">
         
            <span className="mr-2">تغییر محیط کاری</span>
            <FontAwesomeIcon icon={faHome} />
            {/* <i className="material-icons">&#xE7F4;</i> */}
            {/* <Badge pill theme="danger">
              2
            </Badge> */}
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          <DropdownItem>
           1400
          </DropdownItem>
          <DropdownItem>
           1401
          </DropdownItem>
          <DropdownItem >
           1402
          </DropdownItem>
        </Collapse>
      </NavItem>








    //   <FormSelect className="mt-2"> 
    //   <option value={""}>1400</option>
    //   <option value={""}>1401</option>
    //   <option value={""}>1402</option>
    //  </FormSelect>
      // <NavItem className="border-right dropdown notifications">
      //   <NavLink
      //     className="nav-link-icon text-center"
      //     onClick={this.toggleNotifications}
      //   >
      //     <div className="nav-link-icon__wrapper">
      //       <i className="material-icons">&#xE7F4;</i>
      //       <Badge pill theme="danger">
      //         2
      //       </Badge>
      //     </div>
      //   </NavLink>
      //   <Collapse
      //     open={this.state.visible}
      //     className="dropdown-menu dropdown-menu-small"
      //   >
      //     <DropdownItem>
      //       <div className="notification__icon-wrapper">
      //         <div className="notification__icon">
      //           <i className="material-icons">&#xE6E1;</i>
      //         </div>
      //       </div>
      //       <div className="notification__content">
      //         <span className="notification__category">Analytics</span>
      //         <p>
      //           Your website’s active users count increased by{" "}
      //           <span className="text-success text-semibold">28%</span> in the
      //           last week. Great job!
      //         </p>
      //       </div>
      //     </DropdownItem>
      //     <DropdownItem>
      //       <div className="notification__icon-wrapper">
      //         <div className="notification__icon">
      //           <i className="material-icons">&#xE8D1;</i>
      //         </div>
      //       </div>
      //       <div className="notification__content">
      //         <span className="notification__category">Sales</span>
      //         <p>
      //           Last week your store’s sales count decreased by{" "}
      //           <span className="text-danger text-semibold">5.52%</span>. It
      //           could have been worse!
      //         </p>
      //       </div>
      //     </DropdownItem>
      //     <DropdownItem className="notification__all text-center">
      //       View all Notifications
      //     </DropdownItem>
      //   </Collapse>
      // </NavItem>
    );
  }
}
