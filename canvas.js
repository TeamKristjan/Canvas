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
    this.x = x;
    this.y = y;
    this.h = 0;
    this.w = 0;
    this.update = function(x,y) {};
    this.draw = function(canvas) {};
    this.isAtPoint = function(x,y) { return false; };
    this.move = function(x,y) {};
};

// Pen class.
function Pen(x,y) {
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
};

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
};

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
    can.isDrawing = true;
    var coords = getCoordinates(e);
    can.addLayer(coords.x,coords.y);
});

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
