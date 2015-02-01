// Canvas Object element.
function Canvas() {
    this.canvas = $('#Canvas')[0];
    this.context = this.canvas.getContext('2d');
    this.shapes = [];
    this.tool = "pen";
    this.lineWidth = 1;
    this.lineColor = 'black';
    this.isDrawing = false;
    this.draw = function() {
        for (var i = 0; i < this.shapes.length; ++i) {
            this.shapes[i].draw(this);
        }
    };
    this.addLayer = function(x,y) {
        var item;
        if (this.tool === "pen") {
            item = new Pen(x,y,this.lineWidth,this.lineColor);
        } else if (this.tool === "rect") {
            item = new Rect(x,y,this.lineWidth,this.lineColor);
        } else if (this.tool === "circle") {
            //item = new Circle(x,y,this.lineWidth,this.lineColor);
        } else if (this.tool === "line") {
            item = new Line(x,y,this.lineWidth,this.lineColor);
        } else if (this.tool === "text") {
            //item = new Text(x,y,this.lineWidth,this.lineColor);
        }
        this.shapes.push(item); 
    };
    this.updateLayer = function(x,y) {
        var shape = this.shapes.length - 1;
        this.shapes[shape].update(x,y);
    };
};
// Initialize the canvas.
var can = new Canvas();

// Parent class for tools.
function Shape(x,y,width,color) {
    this.x = x;
    this.y = y;
    this.h = 0;
    this.w = 0;
    this.lineWidth = width;
    this.lineColor = color;
    this.update = function(x,y) {
        this.w = x - this.x;
        this.h = y - this.y;
    };
    this.draw = function(canvas) {};
    this.isAtPoint = function(x,y) { return false; };
    this.move = function(x,y) {};
};

// Pen
function Pen(x,y,width,color) {
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
        canvas.context.lineWidth = this.lineWidth;
        canvas.context.strokeStyle = this.lineColor;
        canvas.context.stroke();
    };
};

// Rectangle class.
function Rect(x,y,width,color) {
    Shape.apply(this,arguments);
    this.draw = function(canvas) {
        canvas.context.beginPath();
        canvas.context.rect(this.x,this.y,this.w,this.h);
        canvas.context.lineWidth = this.lineWidth;
        canvas.context.strokeStyle = this.lineColor;
        canvas.context.stroke();
    };
};

function Circle(x,y,width,color) {
    Shape.apply(this,arguments);
    this.draw = function(canvas) {
        // TODO
    };
};

function Line(x,y,width,color) {
    Shape.apply(this,arguments);
    this.update = function(x,y) {
        this.w = x;
        this.h = y;
    };
    this.draw = function(canvas) {
        canvas.context.beginPath();
        canvas.context.moveTo(this.x,this.y);
        canvas.context.lineTo(this.w,this.h);
        canvas.context.lineWidth = this.lineWidth;
        canvas.context.strokeStyle = this.lineColor;
        canvas.context.stroke();
    };
};
var message = "Some text";

function textBoxChanged(e) {
      var target = e.target;
      message = target.value;
      console.log(message);
};
//Text tool
function text(x,y,width,color){
    Shape.apply(this,arguments);
    this.update = function(x,y){
        this.w = x;
        this.h = y;
    };
    this.draw = function(canvas){
        can.context.font = "40px Arial";
        can.context.fillStyle = "Black";
        can.context.fillText(message, 150, 150);
    }
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


// Updates to selected tool
$("input:radio[name=tool]").click(function() {
    can.tool = $(this).val();
});

// Event handler for mouse click on canvas. 
$('#Canvas').mousedown(function(e) {
    can.isDrawing = true;
    var coords = getCoordinates(e);
    can.addLayer(coords.x,coords.y);
});

//Getting the color of the lines that the user wants
$(".color").click(function(){
    can.lineColor = $(this).attr('id');
});

//Getting the size of the line the user wants
$(".size ").click(function(){
    can.lineWidth = $(this).val();
});

// Event handler for mouse move on canvas.
$('#Canvas').mousemove(function(e) {
    if(can.isDrawing) {
        var coords = getCoordinates(e);
        can.updateLayer(coords.x,coords.y);
        //can.context.clearRect(0, 0, can.width, can.height);
        can.draw();
    }
});

// Event handler for mouse up on canvas.
$('#Canvas').mouseup(function(e) {
    can.context.clearRect(0, 0, this.width, this.height);
    can.draw();
    can.isDrawing = false;
});


//Event for textbox 
var formElement = document.getElementById("textBox");
formElement.addEventListener('keyup', textBoxChanged, false);
