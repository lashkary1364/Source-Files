import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Test  from "./views/test";
import { CustomerList } from "./views/Customer/CustomerList";
import { Customer } from "./views/Customer/Customer";
import { CustomeParent } from "./views/Customer/CustomeParent";
import { ExpenseList } from "./views/expense/ExpenseList";
import { FundlList } from "./views/fund/FundlList";
import { Description } from "./views/description/description";
import { Fund } from "./views/fund/Fund";
import { Expense } from "./views/expense/Expense";
import { EmployeeComponent } from "./views/expense/EmployeeComponent";
import { ExpenceDetail } from "./views/expense/ExpenceDetail";
import { Home, home } from "./views/Home";
import { Designer, stimulreport } from "./views/stimulreport";
import { TestReport } from "./views/TestReport";

export default [
  // {
  //   path: "/",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: () => <Redirect to="/blog-overview" />
  // },
  {
    path: "/home",
    layout: DefaultLayout,
    component: Home
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path:"/customer-crud",
    layout: DefaultLayout,
    component: CustomeParent
  },
  {
    path:"/expense",
    layout: DefaultLayout,
    component: Expense
  },
  {
    path:"/expense-list",
    layout: DefaultLayout,
    component: Fund
  },
  {
    path:"/description",
    layout: DefaultLayout,
    component: Description
  },  
  {
    path:"/employee",
    layout: DefaultLayout,
    component: EmployeeComponent
  },  
  {
    path:"/expencelist",
    layout: DefaultLayout,
    component: ExpenseList
  },
  {
    path:"/expenceDetail",
    layout: DefaultLayout,
    component: ExpenceDetail

  },
  {
    path:"/description",
    layout: DefaultLayout,
    component: Description
  },
  {
    path:"/customerlist",
    layout: DefaultLayout,
    component: CustomerList
  },
  {
    path:"/customer",
    layout: DefaultLayout,
    component: Customer

  },
  {
    path:"/report",
    layout: DefaultLayout,
    component: TestReport
  }
 
];
