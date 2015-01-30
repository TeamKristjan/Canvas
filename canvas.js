$( document ).ready(function() {
    var Canvas = Base.extend({
        constructor: function() {
            this.canvas = document.getElementById('myCanvas');
            this.context = this.canvas.getContext('2d');
        },
        canvas: undefined,
        context: undefined,
        shapes: [],
        tool: "pen",
        isDrawing: false,
        drawAll: function() {
            for (var i = 0; i < shapes.length; ++i) {
                shapes[i].draw();
            }
        }
    });
    
    var TempCanvas = Base.extend({
        constructor: function() {
            
        }
    });
    
    // Initializes the canvas
    var can = new Canvas();
    
    // Parent class for shape tools
    var Shape = Base.extend({
        //TODO: implement
        constructor: function(x,y,w,h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        },
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        draw: function() {
            // Draws 
        },
        isAtPoint: function(x,y) {
            // Returns true/false
        }
    });
    
    // Pen tool class
    var Pen = Shape.extend({
        constructor: function(x,y) {
            this.x.push(x);
            this.y.push(y);
        },
        x: [],
        y: [],
        draw: function() {
            can.context.beginPath();
            can.context.moveTo(this.x[i],this.y[i]);
            for (var i = 0; i < this.x.length && i < this.y.length; ++i) {
                
                can.context.lineTo(this.x[i],this.y[i]);
            }
            can.context.stroke();
        }
    });
    
    // Rectangle tool class
    var Rect = Shape.extend({
        //TODO: implement
    });
    
    // Line tool class
    var Line = Shape.extend({
        //TODO: implement
    });
    
    // Circle tool class
    var Circle = Shape.extend({
       //TODO: implement 
    });
    
    ///////
    // Event handlers
    ///////
    
    // Updates to selected tool
    $("input:radio[name=tool]").click(function() {
                can.tool = $(this).val();
    });
    
    var p;
    $("#myCanvas").mousedown(function(e) {
        // TODO: implement
        can.isDrawing = true;
        p = Pen(e.offsetX,e.offsetY);
    });
    
    $("#myCanvas").mousemove(function(e) {
        // TODO: implement
        if (can.isDrawing) {
            p.x.push(e.offsetX);
            p.y.push(e.offsetY);
        };
    });
    
    $("#myCanvas").mouseup(function(e) {
        can.isDrawing = false;
        p.draw();
    });
});