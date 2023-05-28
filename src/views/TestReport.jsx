import React , {useRef} from 'react'
import jsPDF from 'jspdf'
import { useEffect } from 'react'

export const TestReport = () => {
    const pdfRef = useRef(null)
  
  
  

  const generateToPdf=()=>{
    const content = pdfRef.current;

    const doc = new jsPDF('p', 'pt', 'a4');
   // doc.setLanguage("en-US");
   doc.addFont('PTSans', 'MyFont', 'normal');
   doc.setFont('MyFont');
    doc.setLanguage("fa-IR");
   // const doc = new jsPDF('p', 'pt', 'a4');
    doc.html(document.body, {
        html2canvas: {
            scale: 0.5,
            scrollY:0
        },
        x: 0,
        y: 0,
        callback: function (doc) {
            window.open(doc.output('bloburl'));
        }
    });
    doc.html(content, {
        callback: function (doc) {
            doc.save('sample.pdf');
        }
    });



    //window.jsPDF = window.jspdf.jsPDF;
    // Default export is a4 paper, portrait, using millimeters for units
   // const doc = new jsPDF('p', 'pt', 'a4');
    // doc.html(document.body, {
    //     html2canvas: {
    //         scale: 0.5,
    //         scrollY:0
    //     },
    //     x: 0,
    //     y: 0,
    //     callback: function (doc) {
    //         window.open(doc.output('bloburl'));
    //     }
    // });
  }
    return (
<div>
<p style={{fontFamily: "PTSans"}}   ref={pdfRef}>А ну чики брики и в дамки!</p>
      <button className='btn btn-success' onClick={generateToPdf}>generate to pdf</button>

</div>
 
    
//     <div >
// <table class="table" style={{fontFamily:"iransans" }}>
//   <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">نام</th>
//       <th scope="col">نام خانوادگی</th>
//       <th scope="col">پست الکترونیکی</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th scope="row">1</th>
//       <td>شبنم</td>
//       <td>لشکری</td>
//       <td>shabnam.lashkary@gmail.com</td>
//     </tr>
//     <tr>
//       <th scope="row">2</th>
//       <td>وحید</td>
//       <td>وثوقی</td>
//       <td>vahid.vodoughi@gmail.com</td>
//     </tr>
//     <tr>
//       <th scope="row">3</th>
//       <td>حامد</td>
//       <td>فلاح</td>
//       <td>@twitter</td>
//     </tr>
//   </tbody>
// </table>
// 


//     </div>
  )
}
