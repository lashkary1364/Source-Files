import React  from 'react'
// import "stimulsoft-reports-js/Scripts/stimulsoft.reports.engine.js"
// import "stimulsoft-reports-js/Scripts/stimulsoft.reports.export.js"
// import "stimulsoft-reports-js/Scripts/stimulsoft.reports.chart.js"
// import "stimulsoft-reports-js/Scripts/stimulsoft.reports.maps.js"
// import "stimulsoft-reports-js/Scripts/stimulsoft.reports.import.xlsx.js"
// import "stimulsoft-reports-js/Scripts/stimulsoft.viewer.js"


// import "stimulsoft-reports-js/Scripts/stimulsoft.designer.js"
// import "stimulsoft-reports-js/Scripts/stimulsoft.blockly.editor.js"
// import "stimulsoft-reports-js/Scripts/stimulsoft.viewer.js"

export class Designer extends React.Component {
    render() {
        return <div id="designer"></div>;
    }          

//     componentDidMount(){
       
//         console.log('Loading Designer view');

//         console.log('Set full screen mode for the designer');
//         var options = new Stimulsoft.Designer.StiDesignerOptions();
//         options.appearance.fullScreenMode = false;

//         console.log('Create the report designer with specified options');
//         var designer = new Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);

//         console.log('Create a new report instance');
//         var report = new Stimulsoft.Report.StiReport();

//         console.log('Load report from url');
//         report.loadFile('reports/SimpleList.mrt');

//         console.log('Edit report template in the designer');
//         designer.report = report;  
        
//         designer.renderHtml("designer");

//         var Stimulsoft = require('stimulsoft-reports-js');

// // Loading fonts

// }
}
// ReactDOM.render(
//     <Designer />,
//     document.getElementById("main")
// )        