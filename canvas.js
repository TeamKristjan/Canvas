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
        getNextTool: $("input:radio[name=tool]").click(function() {
            this.tool = $(this).val();
        }),
        
    });
    
    var Layer = Base.extend({
        
    });
    
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
        // TODO: implement
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
    
    
    
    var can = new Canvas();
    var sh = new Rect(2,3,1,5);
    console.log(can.tool);
    console.log(sh.x);
});