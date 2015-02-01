function Canvas() {
    this.canvas = $('#Canvas')[0];
    this.context = this.canvas.getContext('2d');
    this.shapes = [];
};

var can = new Canvas();

function Shape(x,y) {
    
}

function Pen(x,y) {
    this.x = [x];
    this.y = [y];
};

Pen.prototype = new Shape();

Pen.prototype.draw = function(canvas) {
    canvas.context.beginPath();
    canvas.context.moveTo(this.x[0],this.y[0]);
    for (var i = 1; i < this.x.length; ++i) {
        canvas.context.lineTo(this.x[i],this.y[i]);
    }
    canvas.context.stroke();
};

var pen = new Pen(10,15);
pen.x.push(100);
pen.y.push(50);
pen.x.push(400);
pen.y.push(70);
pen.draw(can);

var pen2 = new Pen(50,60);
pen2.x.push(600);
pen2.y.push(500);
pen2.x.push(30);
pen2.y.push(80);
pen2.draw(can);

console.log(pen.x);
console.log(pen2.x);

var x1 = 100;
var y1 = 150;
var x2 = 450;
var y2 = 50;

for (var i = 0; i < 10; i++) {
    can.context.beginPath();
    can.context.moveTo(x1, y1);
    can.context.lineTo(x2, y2);
    can.context.lineTo(300,400);
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

var message = "Some text";

function drawScreen() {
  can.context.font = "40px Arial";
  can.context.fillStyle = "#FF0000";
  can.context.fillText(message, 100, 150);
}

function textBoxChanged(e) {
      var target = e.target;
      message = target.value;
      drawScreen();
   }

// Event handler for mouse click on canvas. 
$('#Canvas').mousedown(function(e) {
    console.log(getCoordinates(e));
});

//Event for textbox 
var formElement = document.getElementById("textBox");
formElement.addEventListener('keyup', textBoxChanged, false);
