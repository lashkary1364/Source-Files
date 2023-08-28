
export default function () {
  return [   
    {
      title: "مدیریت صورت هزینه ",
      htmlBefore: '<i class="material-icons">note_add</i>',      
      to: "/expencelist",
    },
    {
      title: "گزارش گردش حساب تنخواه",
      htmlBefore:'<i class="material-icons">table_chart</i>',    
      to: "/moror",
    },
    {
      title: "گزارش لیست هزینه های ثبت شده",
      htmlBefore: '<i class="material-icons">grading</i>',    
      to: "/listExpense",
    },
    {
      title: "گزارش لیست دریافتی ها",
      htmlBefore: '<i class="material-icons">storage</i>',     
      to: "/daryaftiha",
    },
    {
      title: "گزارش نوع هزینه ها",
      htmlBefore: '<i class="material-icons">bar_chart</i>',    
      to: "/expenseTypes",
    },
    {
      title: "گزارش لیست صورت هزینه ها",
      htmlBefore: '<i class="material-icons">equalizer</i>',     
      to: "/ListSoratHazineha",
    },    
  ];
}
