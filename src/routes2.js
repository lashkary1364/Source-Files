import React from "react"
const TankhahReportListExpense =React.lazy(() => import( "./views/TankhahReportListExpense"))
const DefaultLayout = React.lazy(() => import("./layouts"))
const BlogOverview = React.lazy(() => import("./views/BlogOverview"))
const UserProfileLite = React.lazy(() => import("./views/UserProfileLite"))
const AddNewPost = React.lazy(() => import("./views/AddNewPost"))
const Errors = React.lazy(() => import("./views/Errors"))
const ComponentsOverview = React.lazy(() => import("./views/ComponentsOverview"))
const Tables = React.lazy(() => import("./views/Tables"))
const BlogPosts = React.lazy(() => import("./views/BlogPosts"))
const CustomerList = React.lazy(() => import("./views/Customer/CustomerList"))
const Customer = React.lazy(() => import("./views/Customer/Customer"))
const CustomeParent = React.lazy(() => import("./views/Customer/CustomeParent"))
const ExpenseList = React.lazy(() => import("./views/expense/ExpenseList"))
const Description = React.lazy(() => import("./views/description/description"))
const Fund = React.lazy(() => import("./views/fund/Fund"))
const Expense = React.lazy(() => import("./views/expense/Expense"))
const EmployeeComponent = React.lazy(() => import("./views/expense/EmployeeComponent"))
const ExpenceDetail = React.lazy(() => import("./views/expense/ExpenceDetail"))
const Home = React.lazy(() => import("./views/Home"))
const TestReport = React.lazy(() => import("./views/TestReport"))
const TankhahMoror = React.lazy(() => import("./views/TankhahMoror"))
const MororListHaineha = React.lazy(() => import("./views/MororListHaineha"))
const MororListDaryaftiha = React.lazy(() => import("./views/MororListDaryaftiha"))
const MororListExpenseType = React.lazy(() => import("./views/MororListExpenseType"))
const TankhahSodoreName = React.lazy(() => import("./views/TankhahSodoreName"))
const MororRizHazine = React.lazy(() => import("./views/MororRizHazine"))
const TankhahReportListHazineha = React.lazy(() => import("./views/TankhahReportListHazineha"))

export default [
  // {
  //   path: "/",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: () => <Redirect to="/blog-overview" />
  // },
  // {
  //   path: "/home",
  //   layout: DefaultLayout,
  //   component: Home
  // },
  // {
  //   path: "/blog-overview",
  //   layout: DefaultLayout,
  //   component: BlogOverview
  // },
  // {
  //   path: "/user-profile-lite",
  //   layout: DefaultLayout,
  //   component: UserProfileLite
  // },
  // {
  //   path: "/add-new-post",
  //   layout: DefaultLayout,
  //   component: AddNewPost
  // },
  // {
  //   path: "/errors",
  //   layout: DefaultLayout,
  //   component: <Errors/>
  // },
  // {
  //   path: "/components-overview",
  //   layout: DefaultLayout,
  //   component: <ComponentsOverview></ComponentsOverview>
  // },
  // {
  //   path: "/tables",
  //   layout: DefaultLayout,
  //   component: <Tables/>
  // },
  // {
  //   path: "/blog-posts",
  //   layout: DefaultLayout,
  //   component: <BlogPosts/>
  // },
  // {
  //   path: "/customer-crud",
  //   layout: DefaultLayout,
  //   component: <CustomeParent/>
  // },
  {
    path: "/expense",
    layout: DefaultLayout,
    component: Expense
  },
  // {
  //   path: "/expense-list",
  //   layout: DefaultLayout,
  //   component: <Fund/>
  // },
  // {
  //   path: "/description",
  //   layout: DefaultLayout,
  //   component: <Description/>
  // },
  // {
  //   path: "/employee",
  //   layout: DefaultLayout,
  //   component: <EmployeeComponent/>
  // },
  {
    path: "/expencelist",
    layout: DefaultLayout,
    component: ExpenseList
  },
  {
    path: "/expenceDetail",
    layout: DefaultLayout,
    component: ExpenceDetail

  },
  // {
  //   path: "/description",
  //   layout: DefaultLayout,
  //   component: <Description/>
  // },
  // {
  //   path: "/customerlist",
  //   layout: DefaultLayout,
  //   component: <CustomerList/>
  // },
  // {
  //   path: "/customer",
  //   layout: DefaultLayout,
  //   component: <Customer/>

  // },
  // {
  //   path: "/report",
  //   layout: DefaultLayout,
  //   component: <TestReport/>
  // },
  {
    path: "/moror",
    layout: DefaultLayout,
    component: TankhahMoror
  },
  {
    path: "/listExpense",
    layout: DefaultLayout,
    component: MororListHaineha
  },
  {
    path: "/daryaftiha",
    layout: DefaultLayout,
    component: MororListDaryaftiha
  },
  {
    path: "/expenseTypes",
    layout: DefaultLayout,
    component: MororListExpenseType
  },
  {
    path: "/sodorename",
    layout: DefaultLayout,
    component: TankhahSodoreName
  },
  {
    path: "/ListSoratHazineha",
    layout: DefaultLayout,
    component: MororRizHazine
  },
  {
    path: "/list",
    layout: DefaultLayout,
    component: TankhahReportListExpense
  },
];
