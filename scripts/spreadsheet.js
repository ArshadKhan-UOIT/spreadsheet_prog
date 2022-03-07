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
        
        deselectAll();
        
        if (id[0] == 0 && id[1] != 0) {
            selectRow(id[1]);
        } else if (id[0] != 0 && id[1] == 0) {
            selectColumn(id[0]);
        }
    });
});