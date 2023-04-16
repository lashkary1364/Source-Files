import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem, FormSelect } from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
// import { icon } from '@fortawesome/fontawesome-free'
import { icon } from "@fortawesome/fontawesome-free-solid"
import axios from 'axios'
import persian from "react-date-object/calendars/persian"
//import persian_fa from "react-date-object/locales/persian_fa"
import DatePicker, { DateObject } from "react-multi-date-picker";


export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      FinanceYear: []
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.getFinanceYear = this.getFinanceYear.bind(this);

  }

  componentDidMount() {
    this.getFinanceYear();
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }



  getFinanceYear() {

    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;

    var self = this;

    axios(
      {
        url: serverAdress + `GetAllFinanceYear`,
        method: "get",
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }).then(function (response) {

        console.log(response.data);

        const resultItems = response.data;

        resultItems.map((data) => {
          //   self.setState(state => { return { FinanceYear: [{ Id: data.salId, Name: data.salMali }] } });
          self.setState(prevState => ({
            FinanceYear: [...prevState.FinanceYear, { Id: data.salId, Name: data.salMali }]
          }));
        });

      }).catch(function (error) {
        // handle error
        console.log("axois error: ");
        console.log(error)
      })

  }

  render() {
    return (

      <NavItem className="border-right dropdown">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}>
          <div className="nav-link-icon__wrapper text-nowrap px-3 mt-2">
            <span className="mr-2">تغییر سال مالی</span>
            <FontAwesomeIcon icon={faRotate} />
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
          {this.state.FinanceYear.map((item) => (
            <DropdownItem value={item.Id} onClick={(e) =>{

              sessionStorage.setItem("SalMali", e.target.innerText);
              sessionStorage.setItem("SalId", e.target.value);
              alert("سال مالی به" + sessionStorage.getItem("SalMali") +"تغییر یافت");

            }}>{item.Name}</DropdownItem>
          ))}
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
