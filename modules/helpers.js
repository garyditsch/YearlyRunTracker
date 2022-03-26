import { calendar } from "./calendar.js"

const drawCalendar = () =>{
    console.log('draw this calendar')
    // const svg = document.querySelector('#calendar_svg_2019')
    const svg = d3.select("#calendar_svg_2019")
    console.log(svg)


    calendar(theData, svg, {
        'startDate': '1/1/2020',
        'endDate': '12/31/2020',
        'height': 500,
        'width': 900,
        'margin': {
            left: 0,
            right: 10,
            top: 100,
            bottom: 10
        },
        'class': 'spinner3'
    });
}


export { drawCalendar }