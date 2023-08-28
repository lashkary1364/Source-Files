import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { PrintListHeader } from './PrintListHeader';
import { PrintListDetail } from './PrintListDetail';


export const TankhahReportListHazineha = ({ reportItems, reportRizItems, sumMablagh, sumTotal, sumTaeedShode, sumTaeedNashode ,data}) => {

  const [activeTab, setActiveTab] = useState('listHeader');
  const [selectedRow, setSelectedRow] = useState([]);
  const [headerItems, setHeaderItems] = useState([]);
  const [chapListState,setChapListState]=useState(true);
  const [chapListDetailState,setChapListDetailState]=useState(true);



  useEffect(() => {
    toggle(activeTab);
  }, []);

  const toggle = (tab) => {
    if (activeTab == tab) {
      console.log("tab");
      console.log(tab);
      setActiveTab(tab);
    }
  }


  const handelChangeSoratId = (item, checked) => {

    if (checked) {    
      var details = [];
      item.Details.map(i =>
        details.push({
          Mablagh: i.Mablagh,
          Ok: i.Ok,
          OkStr: i.OkStr,
          Sharh: i.Sharh,
          ShomareBarge: i.ShomareBarge,
          ShomareSoratHazine: i.ShomareSoratHazine,
          SoratID: i.SoratID,
          TankhahName: i.TankhahName,
          TarikhPardakht: i.TarikhPardakht,
          Tozihat: i.Tozihat
        })
      )

      setSelectedRow(i => [...i, {
        TankhahName: item.TankhahName, Sharh: item.Sharh, Shomare: item.Shomare, ShomareName: item.ShomareName,
        ShomareSanad: item.ShomareSanad, SoratID: item.SoratID, StrStatus: item.StrStatus, TaeedNashode: item.TaeedNashode
        , ProjectName: item.ProjectName, TaeedShode: item.TaeedShode, Tarikh: item.Tarikh, TarikhName: item.TarikhName,
        Total: item.Total,
        Details: details
      }]);

      setHeaderItems(i =>
        [...i, {
          TankhahName: item.TankhahName, Sharh: item.Sharh, Shomare: item.Shomare, ShomareName: item.ShomareName,
          ShomareSanad: item.ShomareSanad, SoratID: item.SoratID, StrStatus: item.StrStatus, TaeedNashode: item.TaeedNashode
          , ProjectName: item.ProjectName, TaeedShode: item.TaeedShode, Tarikh: item.Tarikh, TarikhName: item.TarikhName,
          Total: item.Total,
          Details: details
        }]);
      
    }
    else
    {
      const filters = selectedRow.filter(m => m.SoratID !== item.SoratID);           
      setHeaderItems(filters);
      setSelectedRow(filters);
    }
  }

  const chapList = (e) => {
    e.preventDefault();
    setActiveTab('printList');
    setChapListState(false);
  }

  const chapListDetail = (e) => {
    e.preventDefault();
    setActiveTab('printListDetail');
    setChapListDetailState(false);
  }


  return (
    <Tabs defaultActiveKey="listHeader" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}
      id="uncontrolled-tab-example"
      className="mb-3">
      <Tab eventKey="listHeader" title="لیست صورت هزینه ها"  >
        <div className='form-inline'>
          <button className="btn btn-primary mb-2 mr-1" onClick={(event) => chapList(event)} >
            <FontAwesomeIcon icon={faFilePdf} className="text-warning mr-2" />
            چاپ لیست
          </button>
          <button className="btn btn-primary mb-2 mr-1" onClick={(event) => chapListDetail(event)} >
            <FontAwesomeIcon icon={faFilePdf} className="text-warning mr-2" />
            چاپ لیست با جزییات
          </button>
        </div>
        <table>
          <thead>
            <tr style={{ backgroundColor: "#d1d3d5" }}>
              <th scope="col">انتخاب</th>
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
            {
              reportItems.length == 0 ? <tr><td className='text-center' colSpan={11}> داده ای برای نمایش وجود ندارد </td></tr> :
                reportItems.map((item, index) =>
                  <tr key={index}>
                    <td scope="row" data-label="ردیف:">
                      <input type="checkbox" onChange={(e) => handelChangeSoratId(item, e.target.checked)}></input>
                    </td>
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
              <td colSpan="9"></td>
              <td data-label="جمع مبلغ تایید شده :">{sumTaeedShode.toLocaleString()}</td>
              <td data-label="جمع مبلغ تایید نشده :">{sumTaeedNashode.toLocaleString()}</td>
              <td data-label="جمع کل مبلغ :">{sumTotal.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </Tab>
      <Tab eventKey="ListDetail" title="لیست ریزهزینه ها"   >
        <table  >
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
      <Tab eventKey="printList" title="چاپ لیست" disabled={chapListState}>
        <PrintListHeader headerItems={headerItems} sumTaeedNashode={sumTaeedNashode} sumTaeedShode={sumTaeedShode} sumTotal={sumTotal} data={data}></PrintListHeader>
      </Tab>
      <Tab eventKey="printListDetail" title="چاپ لیست با جزییات" disabled={chapListDetailState}>
        <PrintListDetail headerItems={headerItems} data={data}></PrintListDetail>
      </Tab>
    </Tabs>

  )
}
