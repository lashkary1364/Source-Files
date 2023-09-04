import React from "react";
import { NavItem, NavLink, Collapse, DropdownItem } from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import swal from 'sweetalert';

export default class Mohit extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      mohitItems: []
    };

    this.getAllMohit = this.getAllMohit.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);

  }

  componentDidMount() {
    this.getAllMohit();
  }

  getAllMohit = () => {

    console.log("get all mohit ...")
    const serverAdress = process.env.REACT_APP_SERVER_ADRESS;
    console.log(serverAdress);
    const user = JSON.parse(sessionStorage.getItem("LoginTocken"));
    console.log("user....");
    console.log(user);
    console.log(localStorage.getItem("access-tocken"));
    console.log("server address ...");
    console.log(serverAdress + `GetAllMohit?userId=${user.userId}`);
    var self = this;


    axios(
      {
        url: serverAdress + `GetAllMohit?userId=${user.userId}`,
        method: "get",
        headers:
        {
          Authorization: `Bearer ${localStorage.getItem("access-tocken")}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }).then(function (response) {

        console.log("get all mohit ....")
        const resultItems = response.data;
        console.log(resultItems);
        resultItems.map((data, index) =>
          // this.setState({ mohitItems: [ { MohitId: data.mohitID, MohitOnvan: data.mohitOnvan }] });
          self.setState(prevState => ({
            mohitItems: [...prevState.mohitItems, { moMohitId: data.hitID, MohitOnvan: data.mohitOnvan }]
          })));
          

      }).catch(function (error) {
        if(error.response.status==401){
          window.location.replace('/');
          return;
        }
        // console.log(error.response.data);
        console.log("error.response.status");
        console.log(error);
         swal("error", error.message+ " "+"getAllMohit", "error");
      })
  }

  changeMohit(e) {
    console.log(e.target);   
    sessionStorage.setItem("mohitId", e.target.value);
    sessionStorage.setItem("mohitName", e.target.innerText);
    swal("محیط کاربری به " + e.target.innerText + " تغییر یافت ")
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
          className="dropdown-menu dropdown-menu-small">
          {
            this.state.mohitItems.map((item, index) => <DropdownItem key={index} value={item.MohitId} onClick={(e) => this.changeMohit(e)}>{item.MohitOnvan}</DropdownItem>)
          }
          {/* <DropdownItem>
           1400
          </DropdownItem>
          <DropdownItem>
           1401
          </DropdownItem>
          <DropdownItem >
           1402
          </DropdownItem> */}
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
