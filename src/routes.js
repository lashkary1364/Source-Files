import { DefaultLayout } from "./layouts";
// Route Views
import { ExpenseList } from "./views/expense/ExpenseList";
import { Expense } from "./views/expense/Expense";
import { ExpenceDetail } from "./views/expense/ExpenceDetail";
import { Home } from "./views/Home";
import { TankhahMoror } from "./views/Reports/TankhahMoror";
import { MororListHaineha } from "./views/Reports/MororListHaineha";
import { MororListDaryaftiha } from "./views/Reports/MororListDaryaftiha";
import { MororListExpenseType } from "./views/Reports/MororListExpenseType";
import { TankhahSodoreName } from "./views/Reports/TankhahSodoreName";
import { MororRizHazine } from "./views/Reports/MororRizHazine";
import { TankhahReportListHazineha } from "./views/Reports/TankhahReportListHazineha";
import { NotFound } from "./views/NotFound";

export default [
  // {
  //   path: "/",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: () => <Redirect to="/blog-overview" />
  // },  
   {
    path: "/home",
    exact: true,
    layout: DefaultLayout,
    component: Home   
  },  
  {
    path:"/expense",
    layout: DefaultLayout,
    component: Expense
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
    path:"/moror",
    layout: DefaultLayout,
    component: TankhahMoror
  },
  {
    path:"/listExpense",
    layout: DefaultLayout,
    component: MororListHaineha
  },
  {
    path:"/daryaftiha",
    layout: DefaultLayout,
    component: MororListDaryaftiha
  },
  {
    path:"/expenseTypes",
    layout: DefaultLayout,
    component: MororListExpenseType
  },
  {
    path:"/sodorename",
    layout: DefaultLayout,
    component: TankhahSodoreName
  },
  {
    path:"/ListSoratHazineha",
    layout: DefaultLayout,
    component: MororRizHazine
  },
  {
    path:"/list",
    layout: DefaultLayout,
    component: TankhahReportListHazineha
  },
];
