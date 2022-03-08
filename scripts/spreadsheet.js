function deselectAll() {
    $(".column").removeClass("column");
} 

function selectRow(rowIndex) {
    for (let i=1; i<4; i++) {
        $('#' + i + rowIndex).attr('class','column');
    }
}

function selectColumn(colIndex) {
    for (let i=1; i<4; i++) {
        $('#' + colIndex + i).attr('class','column');
    }
} 

$(document).ready(function() {
    for (let i=0; i<4; i++) {
        $('#' + 0 + i).attr('scope','col');
        $('#' + i + 0).attr('scope','col');
    }

    let id;

    $("th").click(function(event) {
        id = event.target.id;
        
        /*
        let rI = $(this).parent().index();
        let cI = $(this).index();
        console.log("RI: ",rI," CI: ",cI);

        $("tr").eq(rI).addClass("test");
        for (let i=(cI-1); i<10; i+=3) {
            $("td").eq(i).addClass("test");

        }
        */
        
        deselectAll();
        
        if (id[0] == 0 && id[1] != 0) {
            selectRow(id[1]);
        } else if (id[0] != 0 && id[1] == 0) {
            selectColumn(id[0]);
        }
    });
});