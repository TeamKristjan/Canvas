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

// Pen class.
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
    this.isAtPoint = function(x,y) {
        for (var i = 0; i < this.xArr && i < this.yArr; ++i) {
            if (this.xArr[i] === x && this.yArr[i] === y) {
                return true;
            }
        }
        return false;
    };
    this.move = function(x, y) {
        var offsetX = x - this.x;
        var offsetY = y - this.y;
        for (var i = 0; i < this.xArr && i < this.yArr; ++i) {
            this.xArr[i] = this.xArr[i] + offsetX;
            this.yArr[i] = this.yArr[i] + offsetY;
        }
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

// Circle class.
function Circle(x,y,width,color) {
    Shape.apply(this,arguments);
    this.draw = function(canvas) {
        canvas.context.beginPath();
        if (this.w < 0) {
            canvas.context.arc(this.x,this.y,~this.w,0,2 * Math.PI);
        } else {
            canvas.context.arc(this.x,this.y,this.w,0,2 * Math.PI);
        }
        canvas.context.lineWidth = this.lineWidth;
        canvas.context.strokeStyle = this.lineColor;
        canvas.context.stroke();
    };
};

// Line class.
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

// Erase class.
function Erase(x,y) {
    Shape.apply(this,arguments);
    this.draw = function(canvas) {
        canvas.context.beginPath();
        canvas.context.rect(this.x,this.y,this.w,this.h);
        canvas.context.fillStyle = 'white';
        canvas.context.fill();
        canvas.context.strokeStyle = 'white';
        canvas.context.stroke();
    }
};

//Text tool
function Text(x,y,width,color,message){
    Shape.apply(this,arguments);
    this.message = message;
    // this.update = function(x,y){
    //     this.w = x;
    //     this.h = y;
    // };
    this.draw = function(canvas){
        can.context.font = "40px Arial";
        can.context.fillStyle = this.lineColor;
        can.context.fillText(message, this.x, this.y);
    }
};