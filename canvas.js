$( document ).ready(function() {
    var Canvas = Base.extend({
        constructor: function() {
            this.canvas = document.getElementById('myCanvas');
            this.context = this.canvas.getContext('2d');
            this.tool = "pen";
        },
        canvas: undefined,
        context: undefined,
        tool: undefined,
        shapes: [],
        isDrawing: false,
        drawAll: function() {
            //for (var i = 0; i < this.shapes.length; ++i) {
            //    this.shapes[i].draw();
            //}
            this.shapes[1].draw();
        },
        create: function(x,y) {
            this.isDrawing = true;
            if (this.tool === "pen") {
                var pen = new Pen(x,y);
                this.shapes.push(pen);
            }
            this.drawAll();
            console.log(this.shapes);
        },
        update: function(x,y) {
            if (this.isDrawing) {
                if (this.tool === "pen") {
                    var i = this.shapes.length - 1;
                    this.shapes[i].update(x,y);
                }
                this.drawAll();
            }
        },
        stopDraw: function(x,y) {
            this.drawAll();
            this.isDrawing = false;
        }
    });
    
    // Initializes the canvas
    var can = new Canvas();
    
    // Parent class for shape tools
    var Shape = Base.extend({
        //TODO: implement
        constructor: function(x,y) {
            this.x = x;
            this.y = y;
        },
        x: 0,
        y: 0,
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
            can.context.moveTo(this.x[0],this.y[0]);
            for (var i = 0; i < this.x.length && i < this.y.length; ++i) {
                
                can.context.lineTo(this.x[i],this.y[i]);
            }
            can.context.stroke();
        },
        update: function(x,y) {
            this.x.push(x);
            this.y.push(y);
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

    var Text = Shape.extend({
        //TODO: implement
    });
    
    // Gets mouse coordinates on canvas
    function getCoordinates(e) {
        var coord = {x: 0, y: 0};
        if (e.layerX || e.layerX == 0) { // Firefox
          coord.x = e.layerX;
          coord.y = e.layerY;
        } else if (e.offsetX || e.offsetX == 0) { // Chrome/Opera/IE/Safari
          coord.x = e.offsetX;
          coord.y = e.offsetY;
        }
        return coord;
    };
    
    ///////
    // Event handlers
    ///////
    
    // Updates to selected tool
    $("input:radio[name=tool]").click(function() {
        can.tool = $(this).val();
    });
    
    // Draws the current shape
    $("#myCanvas").mousedown(function(e) {
        // TODO: implement
        var coord = getCoordinates(e);
        can.create(coord.x,coord.y);
    });
    
    $("#myCanvas").mousemove(function(e) {
        // TODO: implement
        var coord = getCoordinates(e);
        can.update(coord.x,coord.y);
    });
    
    $("#myCanvas").mouseup(function(e) {
        // TODO: implement
        var coord = getCoordinates(e);
        can.stopDraw(coord.x,coord.y);
    });
});