// Canvas class.
function Canvas() {
    this.canvas = $('#Canvas')[0];
    
    this.context = this.canvas.getContext('2d');
    
    this.shapes = [];
    
    this.erased = [];
    
    this.tool = "pen";
    
    this.lineWidth = 1;
    
    this.lineColor = 'black';
    
    this.isDrawing = false;
    
    this.fontType = "Arial";
    
    this.fontSize = 10;

    this.message = "";
    
    this.draw = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
            item = new Circle(x,y,this.lineWidth,this.lineColor);
        } else if (this.tool === "line") {
            item = new Line(x,y,this.lineWidth,this.lineColor);
        } else if (this.tool === "text") {
            item = new Text(x,y,this.lineWidth,this.lineColor,this.message,this.fontType,this.fontSize);
        } else if (this.tool === "erase") {
            item = new Erase(x,y,0,0);
        } else {
            console.log("No tool selected.");
        }
        this.shapes.push(item); 
    };
    
    this.updateLayer = function(x,y) {
        var shape = this.shapes.length - 1;
        this.shapes[shape].update(x,y);
    };
    this.undo = function() {
        if (this.shapes.length > 0) {
            this.erased.push(this.shapes.pop());
            this.draw();
        }
    };
    
    this.redo = function() {
        if (this.erased.length > 0) {
            this.shapes.push(this.erased.pop());
            this.draw();
        }
    };
}
