$( document ).ready(function() {
    var Canvas = Base.extend({
        constructor: function() {
            this.canvas = document.getElementById('myCanvas');
            this.context = this.canvas.getContext('2d');
        },
        canvas: undefined,
        context: undefined,
        tool: "pen",
        getNextTool: $("input:radio[name=tool]").click(function() {
            this.tool = $(this).val();
        }),
        makeLayer: $("#myCanvas").click(function() {
            $( '<canvas class="layer" id="layer' + 1 + '" width="500" height="700"></canvas>' ).insertAfter( this );
        })
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
        h: 0
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