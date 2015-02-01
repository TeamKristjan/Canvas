var Canvas = Base.extend({
    constructor: function() {
        this.canvas = $('#Canvas')[0];
        this.context = this.canvas.getContext('2d');
    },
    canvas: undefined,
    context: undefined
});

var can = new Canvas();

var x1 = 100;
var y1 = 150;
var x2 = 450;
var y2 = 50;

for (var i = 0; i < 10; i++) {
    can.context.beginPath();
    can.context.moveTo(x1, y1);
    can.context.lineTo(x2, y2);
    can.context.stroke();
    x1 = x1 + 10;
    y1 = y1 + 10;
    x2 = x2 + 10;
    y2 = y2 + 10;
}

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

// Event handler for mouse click on canvas. 
$('#Canvas').mousedown(function(e) {
    console.log(getCoordinates(e));
});