const t="https://quizzical-tereshkova-82c9ca.netlify.app/api/get-run-data",a="https://quizzical-tereshkova-82c9ca.netlify.app/api/get-past-run-data",e=async(t,a,e)=>{const n=await groupedMonthlyData(t,a,e),o=await n.map((t=>t.distance));return{monthLabels:await n.map((t=>t.key)),monthValues:o,monthRunCount:await n.map((t=>t.runCount))}};e(t,a,!0).then((t=>{console.log(t.monthValues);const a={type:"line",data:{labels:t.monthLabels,datasets:[{label:"Miles",backgroundColor:"rgb(140, 192, 221)",borderColor:"rgb(140, 192, 221)",data:t.monthValues}]},options:{plugins:{legend:{display:!1}}}};new Chart(document.getElementById("myChart"),a)})).catch((t=>console.log(t))),e(t,a,!1).then((t=>{const a={type:"line",data:{labels:t.monthLabels,datasets:[{label:"Miles",backgroundColor:"rgb(140, 192, 221)",borderColor:"rgb(140, 192, 221)",data:t.monthValues}]},options:{plugins:{legend:{display:!1}}}};new Chart(document.getElementById("dateMonthlyChart"),a)})).catch((t=>console.log(t))),e(t,a,!1).then((t=>{const a={type:"line",data:{labels:t.monthLabels,datasets:[{label:"Run Count",backgroundColor:"rgb(140, 192, 221)",borderColor:"rgb(140, 192, 221)",data:t.monthRunCount}]},options:{plugins:{legend:{display:!1}}}};new Chart(document.getElementById("runCountDateMonthlyChart"),a)})).catch((t=>console.log(t))),e(t,a,!0).then((t=>{const a={type:"line",data:{labels:t.monthLabels,datasets:[{label:"Run Count",backgroundColor:"rgb(140, 192, 221)",borderColor:"rgb(140, 192, 221)",data:t.monthRunCount}]},options:{plugins:{legend:{display:!1}}}};new Chart(document.getElementById("runCountHighToLow"),a)})).catch((t=>console.log(t)));
//# sourceMappingURL=monthly.a6921b10.js.map
