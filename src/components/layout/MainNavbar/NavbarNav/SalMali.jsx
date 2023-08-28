import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem, FormSelect } from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
// import { icon } from '@fortawesome/fontawesome-free'
import { icon } from "@fortawesome/fontawesome-free-solid"
import axios from 'axios'
import swal from 'sweetalert';
import persian from "react-date-object/calendars/persian"
//import persian_fa from "react-date-object/locales/persian_fa"
import DatePicker, { DateObject } from "react-multi-date-picker";


export default class SalMali extends React.Component {
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
    console.log(serverAdress + `GetAllFinanceYear?mohitId=${sessionStorage.getItem("mohitId")}`)
    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;

    var self = this;

    axios(
      {
        url: serverAdress + `GetAllSalMali?mohitId=${sessionStorage.getItem("mohitId")}`,
        method: "get",
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }).then(function (response) {

        console.log("get all sal mali ....")
        const resultItems = response.data;
        resultItems.map(data => {
          //   setSalMaliItems(salMaliItems => [...salMaliItems, { SalId: data.salId, SalMali: data.salMali }]);

          self.setState(prevState => ({
            FinanceYear: [...prevState.FinanceYear, { SalId: data.salId, SalMali: data.salMali }]
          }));

        });

      }).catch(function (error) {
        console.log(error)
        swal("error", error.message + " " + "getFinanceYear", "error");

      })

  }

  changeSalMali(e) {
    sessionStorage.setItem("salMali", e.target.innerText);
    sessionStorage.setItem("salId", e.target.value);
    swal("سال مالی به" +e.target.innerText + "تغییر یافت");
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
          className="dropdown-menu dropdown-menu-small">
          {this.state.FinanceYear.map((item) => (
            <DropdownItem value={item.SalId} onClick={(e) => this.changeSalMali(e)}>{item.SalMali}</DropdownItem>
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
