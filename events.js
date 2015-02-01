//Hide the textbox by default
$(document).ready(function(){
    $("#textbox").hide();
});

// Initialize the canvas.
var can = new Canvas();

// Helper function that gets mouse position on the canvas.
function getCoordinates(e) {
    var canvas = $('#Canvas')[0];
    var coord = {x: 0, y: 0};
    if (e.x !== undefined && e.y !== undefined) {
        coord.x = e.x;
        coord.y = e.y;
    } else {
        coord.x = e.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
        coord.y = e.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    coord.x -= canvas.offsetLeft;
    coord.y -= canvas.offsetTop;
    return coord;
};


// Updates to selected tool
$("input:radio[name=tool]").click(function() {
    can.tool = $(this).val();
    if ($(this).val() === "text") {
        $("#textbox").show();
    } else {
        $("#textbox").hide();
    }
});

// Saves the current value in textbox.
$('#textbox').keyup(function(e) {
    can.message = e.target.value;
});

// Undo button.
$('#undo').click(function(e) {
    can.undo();
});

$('#redo').click(function(e) {
    can.redo();
});

//Getting the color of the lines that the user wants
$(".color").click(function(){
    can.lineColor = $(this).attr('id');
});

//Getting the size of the line the user wants
$(".size ").click(function(){
    can.lineWidth = $(this).val();
});

//Getting the font
$("#font ").change( function(){
     can.fontType = $(this).val();
});

$('#fontsize').change( function() {
    can.fontSize = $(this).val();
});

// Event handler for mouse click on canvas. 
$('#Canvas').mousedown(function(e) {
    can.isDrawing = true;
    var coords = getCoordinates(e);
    can.addLayer(coords.x,coords.y);
});

// Event handler for mouse move on canvas.
$('#Canvas').mousemove(function(e) {
    if(can.isDrawing) {
        var coords = getCoordinates(e);
        can.updateLayer(coords.x,coords.y);
        can.draw();
    }
});

// Event handler for mouse up on canvas.
$('#Canvas').mouseup(function(e) {
    can.draw();
    can.isDrawing = false;
});
