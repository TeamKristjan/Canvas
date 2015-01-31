$( document ).ready(function() {
    var Canvas = Base.extend({
        constructor: function() {
            this.canvas = document.getElementById('myCanvas');
            this.context = this.canvas.getContext('2d');
        },
        canvas: undefined,
        context: undefined,
        drawAll: function(layer) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.drawImage(layer, 0, 0);
        }
    });
    
    var Layer = Canvas.extend({
        constructor: function() {
            this.canvas = document.getElementById('tempCanvas');
            this.context = this.canvas.getContext('2d');
            this.tool = "pen";
        },
        tool: undefined,
        shapes: [],
        isDrawing: false,
        drawAll: function() {
            //for (var i = 0; i < this.shapes.length; ++i) {
            //    this.shapes[i].draw();
            //}
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
            lay.drawAll(this.canvas);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.isDrawing = false;
        }
    });
    
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
            lay.context.beginPath();
            lay.context.moveTo(this.x[0],this.y[0]);
            for (var i = 0; i < this.x.length && i < this.y.length; ++i) {
                
                lay.context.lineTo(this.x[i],this.y[i]);
            }
            lay.context.stroke();
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


    // var message = "your text";

    var TextBox = Shape.extend({

        // can.fillStyle = "#FF0000";
        // can.fillText ("Hello World", 100, 80);
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
    
    
    // Initializes the canvas
    var can = new Canvas();
    var lay = new Layer();
    
    ///////
    // Event handlers
    ///////
    
    // Updates to selected tool
    $("input:radio[name=tool]").click(function() {
        lay.tool = $(this).val();
    });
    
    // Draws the current shape
    $("#myCanvas").mousedown(function(e) {
        // TODO: implement
        var coord = getCoordinates(e);
        lay.create(coord.x,coord.y);
    });
    
    $("#myCanvas").mousemove(function(e) {
        // TODO: implement
        var coord = getCoordinates(e);
        lay.update(coord.x,coord.y);
    });
    
    $("#myCanvas").mouseup(function(e) {
        // TODO: implement
        var coord = getCoordinates(e);
        lay.stopDraw(coord.x,coord.y);
    });

});