import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export const TankhahReportListHazineha = ({ reportItems, reportRizItems, sumMablagh, sumTotal, sumTaeedShode, sumTaeedNashode }) => {

  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    toggle(activeTab);
  }, []);


  const toggle = (tab) => {
    if (activeTab == tab) {
      setActiveTab(tab);
    }
  }



  return (
    <Tabs style={{ paddingRight: "20px", paddingTop: "20px" }}
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3">
      <Tab eventKey="home" title="لیست صورت هزینه ها" style={{ paddingRight: "20px" }} >
        <table dir="rtl" >
          <thead>
            <tr style={{ backgroundColor: "#d1d3d5" }}>
              <th scope="col">ردیف</th>
              <th scope="col">نام تنخواه</th>
              <th scope="col"> نام پروژه </th>
              <th scope="col">شرح</th>
              <th scope="col">تاریخ</th>
              <th scope="col">شماره نامه</th>
              <th scope="col">تاریخ نامه</th>
              <th scope="col">شماره سند</th>
              <th scope="col"> جمع مبلغ تایید شده</th>
              <th scope="col">جمع مبلغ تایید نشده </th>
              <th scope="col">جمع کل مبلغ صورت هزینه</th>
            </tr>
          </thead>
          <tbody>
            {console.log("report items")}
            {console.log(reportItems)}
           {
              reportItems.length == 0 ? <tr><td className='text-center' colSpan={11}> داده ای برای نمایش وجود ندارد </td></tr> :
                reportItems.map((item, index) =>

                  <tr key={index}>
                    <td scope="row" data-label="ردیف:">{index + 1}</td>
                    <td data-label="نام تنخواه:">{item.TankhahName}</td>
                    <td data-label="نام پروژه">{item.ProjectName}</td>
                    <td data-label="شرح:">{item.Sharh}</td>
                    <td data-label="تاریخ:">{item.Tarikh}</td>
                    <td data-label="شماره نامه:">{item.ShomareName}</td>
                    <td data-label="تاریخ نامه:">{item.TarikhName}</td>
                    <td data-label="شماره سند:">{item.ShomareSanad}</td>
                    <td data-label="جمع مبلغ تایید شده:">{item.TaeedShode.toLocaleString()}</td>
                    <td data-label="جمع مبلغ تایید نشده:">{item.TaeedNashode.toLocaleString()}</td>
                    <td data-label="جمع کل مبلغ صورت هزینه:">{item.Total.toLocaleString()}</td>
                  </tr>

                )
            }
            <tr>
              <td colSpan="8"></td>
              <td data-label="جمع مبلغ تایید شده :">{sumTaeedShode.toLocaleString()}</td>
              <td data-label="جمع مبلغ تایید نشده :">{sumTaeedNashode.toLocaleString()}</td>
              <td data-label="جمع کل مبلغ :">{sumTotal.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </Tab>
      <Tab eventKey="profile" title="لیست ریزهزینه ها" style={{ padding: "20px" }}  >
        <table dir="rtl" >
          <thead>
            <tr style={{ backgroundColor: "#d1d3d5" }}>
              <th scope="col">ردیف</th>
              <th scope="col">نام تنخواه</th>
              <th scope="col">شماره صورت هزینه </th>
              <th scope="col">شماره فاکتور/برگه</th>
              <th scope="col">تاریخ</th>
              <th scope="col">شرح </th>
              <th scope="col">توضیحات</th>
              <th scope="col">وضعیت </th>
              <th scope="col"> مبلغ </th>
            </tr>
          </thead>
          <tbody>
            {console.log("report riz items")}
            {console.log(reportRizItems)}
            {
              reportRizItems.length == 0 ? <tr><td className='text-center' colSpan={9}> داده ای برای نمایش وجود ندارد </td></tr> :
                reportRizItems.map((item, index) =>
                  <tr key={index}>
                    <td scope="row" data-label="ردیف:">{index + 1}</td>
                    <td data-label="نام تنخواه:">{item.TankhahName}</td>
                    <td data-label="شماره صورت هزینه">{item.ShomareSoratHazine}</td>
                    <td data-label="شماره برگه:">{item.ShomareBarge}</td>
                    <td data-label="تاریخ پرداخت:">{item.TarikhPardakht}</td>
                    <td data-label="شرح :">{item.Sharh}</td>
                    <td data-label="توضیحات :">{item.Tozihat}</td>
                    <td data-label="وضعیت:">{item.OkStr}</td>
                    <td data-label="مبلغ :">{item.Mablagh}</td>
                  </tr>

                )
            }
            <tr>
              <td colSpan="8"></td>
              <td data-label="کل مبلغ :">{sumMablagh.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </Tab>
    </Tabs>

  )
}
