function deselectAll() {
    $(".column").removeClass("column");
} 
// found online https://bobbyhadz.com/blog/javascript-round-number-up-to-nearest-ten#:~:text=To%20round%20a%20number%20up,num%20%2F%2010)%20*%2010%20.
function roundUpNearestTenths(num) { 
    return parseFloat(Math.ceil(num / 0.10) * 0.10);
}

function getGrade(mark) {
    if (mark < 50.0) {
        return 'F';
    } else if (mark < 60.0) {
        return 'D';
    } else if (mark < 70.0) {
        return 'C';
    } else if (mark < 80.0) {
        return 'B';
    } else {
        return 'A';
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function graph(index, indexv, dataList) {
    // d3.select("#barChart").select("svg").remove();
    d3.select("#barChart").remove();
    let ac = 0, bc = 0, cc = 0, dc = 0, fc = 0;
    let af = 0.00, bf = 0.00, cf = 0.00, df = 0.00, ff = 0.00;
    let nearest;
    if (index[0] == 0) {   // select col
        // console.log(dataList);
        let ilen = dataList.length;
        for (let i=1; i<ilen; i++) {
            // console.log(dataList[i][indexv]);
        }
        for (let i=1; i<ilen; i++) {
            let gradeIndex = parseFloat(dataList[i][indexv]);
            // console.log(gradeIndex);
            let letter = getGrade(parseFloat(gradeIndex)); 
            if ( letter == 'A' ) {
                ac++;
            } else if ( letter == 'B' ) {
                bc++;
            } else if ( letter == 'C' ) {
                cc++;
            } else if ( letter == 'D' ) {
                dc++;
            } else if ( letter == 'F' ) {
                fc++;
            }
        }
        af = parseFloat(ac/(ilen-1));
        bf = parseFloat(bc/(ilen-1));
        cf = parseFloat(cc/(ilen-1));
        df = parseFloat(dc/(ilen-1));
        ff = parseFloat(fc/(ilen-1));  
        // console.log(af,bf,cf,df,ff);
        // console.log("Max = ",Math.max(af,bf,cf,df,ff)+0.15);
        // console.log("Max = ",roundUpNearestTenths(Math.max(af,bf,cf,df,ff)+0.15));
        nearest = roundUpNearestTenths(Math.max(af,bf,cf,df,ff)+0.15);

    } else if (index[1] == 0) {    // select row
        // console.log(dataList[indexv]);
        let jlen = dataList[0].length;
        for (let i=1; i<jlen; i++) {
            let gradeIndex = parseFloat(dataList[indexv][i]);
            // console.log(gradeIndex);
            let letter = getGrade(parseFloat(gradeIndex)); 
            if ( letter == 'A' ) {
                ac++;
            } else if ( letter == 'B' ) {
                bc++;
            } else if ( letter == 'C' ) {
                cc++;
            } else if ( letter == 'D' ) {
                dc++;
            } else if ( letter == 'F' ) {
                fc++;
            }
        }
        af = parseFloat(ac/(jlen-1));
        bf = parseFloat(bc/(jlen-1));
        cf = parseFloat(cc/(jlen-1));
        df = parseFloat(dc/(jlen-1));
        ff = parseFloat(fc/(jlen-1));  
        // console.log(af,bf,cf,df,ff);
        // console.log("Max = ",Math.max(af,bf,cf,df,ff)+0.15);
        // console.log("Max = ",roundUpNearestTenths(Math.max(af,bf,cf,df,ff)+0.15));
        nearest = roundUpNearestTenths(Math.max(af,bf,cf,df,ff)+0.15);
    }
    const gradeData = [
        {"frequency": 'A', "grade": af},
        {"frequency": 'B', "grade": bf},
        {"frequency": 'C', "grade": cf},
        {"frequency": 'D', "grade": df},
        {"frequency": 'F', "grade": ff},
    ];

    // graphing code taken from Randy lecture content 
    const margin = 50;
    const width = 800;
    const height = 400;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    const colourScale = d3.scaleLinear()
                            .domain([0.5, 1.0])
                            .range(['#9467bd', '#4c6edb']);
    
    const xScale = d3.scaleBand() 
                        .domain(gradeData.map((data) => data.frequency))
                        .range([0, chartWidth])
                        .padding(0.3);
    
    const yScale = d3.scaleLinear()
                        .domain([0.00, parseFloat(nearest)])
                        .range([chartHeight, 0]);

    let svg = d3.select('body')
                    .append('svg')
                        .attr('width', width)
                        .attr('height', height)
                        .attr('id','barChart');
    
    // title
    svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin)
            .attr('text-anchor', 'middle')
            .text('Grade Distribution');

    
    // create a group (g) for the bars
    let g = svg.append('g')
                    .attr('transform', `translate(${margin}, ${margin})`);

    // y-axis
    g.append('g')
        .call(d3.axisLeft(yScale));
    
    // x-axis
    g.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));
    
    let rectangles = g.selectAll('rect')
        .data(gradeData)
        .enter()
            .append('rect')
                .attr('x', (data) => xScale(data.frequency))
                .attr('y', (data) => chartHeight)
                .attr('width', xScale.bandwidth())
                .attr('height', (data) => 0)
                .attr('fill', (data) => colourScale(data.grade))
                .on('mouseenter', function(source, index) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.5);
                })
                .on('mouseleave', function(source, index) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 1.0);
                });
    
    rectangles.transition()
        .ease(d3.easeElastic)
        .attr('height', (data) => chartHeight - yScale(data.grade))
        .attr('y', (data) => yScale(data.grade))
        .duration(1000)
        .delay((data, index) => index * 50);
}

function selectRow(rowIndex, data) {
    for (let i=1; i<data[0].split(',').length; i++) {
        $('#' + rowIndex + i).attr('class','column');
    }
}

function selectColumn(colIndex, data) {
    for (let i=1; i<data.length; i++) {
        $('#' + i + colIndex).attr('class','column');
    }
} 

$(document).ready(function() {
    $.ajax({
        type: "GET", 
        // url: "./data/grades.csv",
        url: "http://172.31.103.40:8000/data/grades.csv",
        dataType: "text",
        success: function(response){
            console.log("success"); 
            console.log(response);
            let rows = response.split('\n');
            // let hHeaders = rows[0].split(','); // row 0
            // let vHeaders = [];
            // for (let i=0; i<rows.length; i++) {
            //     vHeaders.push(rows[i].split(',')[0]); // col 0 
            // }
    
            let dataList = new Array(rows.length);
    
            let table, tr, th, td;
    
            table = document.createElement('table');
            table.setAttribute('class', 'spreadsheettable');
            table.setAttribute('cellspacing', '0');
    
            for (let i=0; i<rows.length; i++) {
                tr = document.createElement('tr');
                dataList[i] = new Array(rows[0].split(',').length);
                for (let j=0; j<rows[0].split(',').length; j++) {
                    if (i==0 || j==0) {
                        th = document.createElement('th');
                        if (i==0) {
                            // th.textContent = hHeaders[j]; 
                            th.textContent = rows[0].split(',')[j]; // horizontal headers 
                        } else if (j==0) {
                            // th.textContent = vHeaders[i];
                            th.textContent = rows[i].split(',')[0]; // vertical headers 
                        } 
                        th.setAttribute('id', '' + i + j);
                        tr.appendChild(th);
                    } else {
                        td = document.createElement('td');
    
                        td.textContent = rows[i].split(',')[j]; // other data from spreadsheet
                        td.setAttribute('id', '' + i + j);
                        tr.appendChild(td);
                    }
                    dataList[i][j] = rows[i].split(',')[j];
                }
                table.appendChild(tr);
            }
    
            document.body.appendChild(table);
    
            let index;
    
            $('.spreadsheettable').click(function(event){
                index = event.target.id;
    
                deselectAll();
    
    
                if (index[0] == 0 && index[1] != 0) { //i=0 
                    // console.log("row header ",index[1],"clicked!"); 
                    selectColumn(index[1], rows);
                    graph(index, index[1], dataList);
    
                } else if (index[0] != 0 && index[1] == 0) {    //j=0
                    // console.log("col header ",index[0],"clicked!");
                    selectRow(index[0], rows);
                    graph(index, index[0], dataList);
    
                } else if (index[0] == 0 && index[1] == 0) { // i=0 & j=0
                    // do nothing 
                } 
                else {
                    // console.log("cell ",index[0],index[1],"clicked!");
    
                    $('#' + index[0] + index[1]).attr('class','column');
                    // $('#' + index[0] + index[1]).attr('contenteditable','true');
                    $('#' + index[0] + index[1]).empty();
                    $('#' + index[0] + index[1]).append("<input type='text' id='inpt_text' style='width:40px'>");
                    var input = $("#inpt_text");
                    let inputValue;
                    var getParentID; 
                    $(document).keypress(function(event){
                        var keycode = (event.keyCode ? event.keyCode : event.which);
                        if(keycode == '13'){
                            inputValue = parseFloat(input.val());
                            input.hide();
                            if ($(input).parent().attr('id') != null) { // get parent of input field 
                                getParentID = $(input).parent().attr('id');
                                $('#' + getParentID[0] + getParentID[1]).text('' + inputValue);
                                // console.log('pid = ',getParentID);
                                // console.log('val = ',inputValue);
                                dataList[getParentID[0]][getParentID[1]] =  inputValue;
                            }
                            input.remove();
                        }
                    });
                }
    
            });
        },
        failure:function(err){
            console.log("failure");
            console.log(err);  
        }
    });
});