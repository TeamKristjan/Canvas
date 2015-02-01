// Canvas Object element.
function Canvas() {
    this.canvas = $('#Canvas')[0];
    this.context = this.canvas.getContext('2d');
    this.shapes = [];
    this.isDrawing = false;
    this.draw = function() {
        for (var i = 0; i < this.shapes.length; ++i) {
            this.shapes[i].draw(this);
        }
    };
    this.addLayer = function(x,y) {
        var pen = new Rect(x,y);
        this.shapes.push(pen);
    };
    this.updateLayer = function(x,y) {
        var shape = this.shapes.length - 1;
        this.shapes[shape].update(x,y);
    };
};
// Initialize the canvas.
var can = new Canvas();

// Parent class for tools.
function Shape(x,y) {
<<<<<<< .mine
    
};
=======
    this.x = x;
    this.y = y;
    this.h = 0;
    this.w = 0;
    this.update = function(x,y) {};
    this.draw = function(canvas) {};
    this.isAtPoint = function(x,y) { return false; };
    this.move = function(x,y) {};
};
>>>>>>> .r21

<<<<<<< .mine
function Pen(x,y,color,lineThickness) {
=======
// Pen class.
function Pen(x,y) {
>>>>>>> .r21
    Shape.apply(this,arguments);
    this.xArr = [this.x];
    this.yArr = [this.y];
    this.update = function(x,y) {
        this.xArr.push(x);
        this.yArr.push(y);
    };
    this.draw = function(canvas) {
        canvas.context.beginPath();
        canvas.context.moveTo(this.xArr[0],this.yArr[0]);
        for (var i = 1; i < this.xArr.length; ++i) {
            canvas.context.lineTo(this.xArr[i],this.yArr[i]);
        }
        canvas.context.stroke();
    };
    this.color = [color];
    this.lineThickness = [lineThickness]
};

<<<<<<< .mine
Pen.prototype = new Shape();

Pen.prototype.draw = function(canvas) {
    canvas.context.beginPath();
    canvas.context.moveTo(this.x[0],this.y[0]);
    for (var i = 1; i < this.x.length; ++i) {
        canvas.context.lineTo(this.x[i],this.y[i]);     
    }
    canvas.context.lineWidth = this.lineThickness;
    canvas.context.strokeStyle = this.color[0];
    canvas.context.stroke();
=======
// Rectangle class.
function Rect(x,y) {
    Shape.apply(this,arguments);
    this.update = function(x,y) {
        this.w = x - this.x;
        this.h = y - this.y;
    };
    this.draw = function(canvas) {
        canvas.context.beginPath();
        canvas.context.rect(this.x,this.y,this.w,this.h)
        canvas.context.stroke();
    };
>>>>>>> .r21
};

<<<<<<< .mine
var pen = new Pen(10,15,"blue",3);
pen.x.push(100);
pen.y.push(50);
pen.x.push(400);
pen.y.push(70);
pen.draw(can);

var pen2 = new Pen(50,60,"pink",20);
pen2.x.push(600);
pen2.y.push(500);
pen2.x.push(30);
pen2.y.push(80);
pen2.draw(can);

console.log(pen.x);
console.log(pen2.x);
console.log(pen.color);
console.log(pen2.color);

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

=======
>>>>>>> .r21
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
  can.context.fillStyle = "Black";
  can.context.fillText(message, 150, 200);
}

function textBoxChanged(e) {
      var target = e.target;
      message = target.value;
      drawScreen();
   }

function color(e){
    var value = e.value;
    console.log(e)
}

function sizeOfLine(e){
    var value = e.value;
    console.log(e);
}
// Event handler for mouse click on canvas. 
$('#Canvas').mousedown(function(e) {
    can.isDrawing = true;
    var coords = getCoordinates(e);
    can.addLayer(coords.x,coords.y);
});

<<<<<<< .mine
//Getting the color of the lines that the user wants
$(".color").click(function(){
     color($(this).val());
});
//Getting the size of the line the user wants
$(".size ").click( function(){
     sizeOfLine($(this).val());
});
=======
// Event handler for mouse move on canvas.
$('#Canvas').mousemove(function(e) {
    if(can.isDrawing) {
        var coords = getCoordinates(e);
        can.updateLayer(coords.x,coords.y);
        can.context.clearRect(0, 0, can.width, can.height);
        can.draw();
    }
});

$('#Canvas').mouseup(function(e) {
    can.context.clearRect(0, 0, this.width, this.height);
    can.draw();
    can.isDrawing = false;
});

//Event for textbox 
var formElement = document.getElementById("textBox");
formElement.addEventListener('keyup', textBoxChanged, false);
>>>>>>> .r21
