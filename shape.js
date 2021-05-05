const TOL = 1e-6
const VERTEX_TOL = 5;
const PrimitiveType = {POINT:1,CIRCLE:2,LINE:3,RECTANGLE:4,POLYGON:5,FREE:6};

function equal_float(x,y){
    return (Math.abs(x-y)<=TOL)
}

function code(x, y, xmin, xmax, ymin, ymax){
    var code = 0;

    if (y > ymax) code += 8;
    if (y < ymin) code += 4;
    if (x > xmax) code += 2;
    if (x < xmin) code += 1;

    return code;
}

function CohenSutherlandLineClip(x0, y0, x1, y1, xmin, xmax, ymin, ymax) 
{
 var outcode0, outcode1, outcodeOut;
 var x, y;
 var accept = false, done = false;

 outcode0 = code(x0, y0, xmin, xmax, ymin, ymax); 
 outcode1 = code(x1, y1, xmin, xmax, ymin, ymax);

 do {
   if (outcode0 == 0 && outcode1 == 0) { 
       accept = true;  done = true;               /* trivial draw and exit */
   } else if((outcode0 & outcode1) != 0) {
       done = true;                               /* trivial reject and exit */
   } else {                                       /* discart an out part */
     outcodeOut = (outcode0 != 0) ?  outcode0 : outcode1;        /* pick an out vertice */
     if (outcodeOut & 8) {                                       /* discart top */
       x = x0 + (x1 - x0) * (ymax - y0) / (y1 - y0);  y = ymax;
     } else if(outcodeOut & 4) {                                 /* discart bottom */
       x = x0 + (x1 - x0) * (ymin - y0) / (y1 - y0);  y = ymin;
     } else if(outcodeOut & 2) {                                 /* discart right */
       y = y0 + (y1 - y0) * (xmax - x0) / (x1 - x0);  x = xmax;
     } else if(outcodeOut & 1) {                                 /* discart left */
       y = y0 + (y1 - y0) * (xmin - x0) / (x1 - x0);  x = xmin;
     }
     
     if (outcodeOut == outcode0) {
        x0 = x; y0 = y; outcode0 = code(x0, y0, xmin, xmax, ymin, ymax);
     } else {
        x1 = x; y1 = y;  outcode1 = code(x1, y1, xmin, xmax, ymin, ymax);
     }

   }
  } while (!done);

   // The line below would draw a clipped line

   //if (accept) DrawLineReal(x0, y0, x1, y1);
  return accept;
}

function intersect(x,y,x0,y0,x1,y1){
    var num_intersec = 0;
    /*var n = vec2.create();
    var pe = vec2.create();
    var p0 = vec2.create();
    var p1 = vec2.create();

    vec2.set(n,0.0,1.0);
    vec2.set(pe,x,y);
    vec2.set(p0,x0,y0);
    vec2.set(p1,x1,y1);

    var pep1 = vec2.create();
    var p1p0 = vec2.create();

    vec2.sub(p0pe,p0,pe);
    vec2.sub(p1p0,p1,p0);

    var t = vec2.dot(n,p0pe) / vec2.dot(n,p1p0);
    var intersec = vec.create();
    var dir = vec2.create();
    vec2.scale(dir,p1p0,t);
    vec2.add(intersec,p0,dir);
    

    var y_max = y0>y1?y0:y1;
    */

    var x_int = x0 + (x1-x0)*(y-y0)/(y1-y0);
    var y_int = y;

    var xmin = x0<=x1?x0:x1;
    var xmax = x0>x1?x0:x1;
    var ymin = y0<=y1?y0:y1;
    var ymax = y0>y1?y0:y1;
    

    if ((x_int>=x)&&(x_int>=xmin)&&(x_int<=xmax)&&(y_int>=ymin)&&(y_int<ymax)){
            num_intersec = 1;
    } 

    return num_intersec;
}


function countIntersections(x,y,polygon){
    var counter = 0;
    var i;


    for (i=0;i<polygon.size-1;i++){
        let x0 = polygon.verticesList[i].x;
        let y0 = polygon.verticesList[i].y;
        let x1 = polygon.verticesList[i+1].x;
        let y1 = polygon.verticesList[i+1].y;
        counter += intersect(x,y,x0,y0,x1,y1);
    }

    let x0 = polygon.verticesList[i].x;
    let y0 = polygon.verticesList[i].y;
    let x1 = polygon.verticesList[0].x;
    let y1 = polygon.verticesList[0].y;
    counter += intersect(x,y,x0,y0,x1,y1);

    return counter;

}

//Converts hexadecimal code to rgb color tuple
function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return [r,g,b];
}

class Color{
    constructor (r,g,b,a){
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    get r(){return this._r;}

    set r(r){this._r = r;}

    get g(){return this._g;}

    set g(g){this._g = g;}   

    get b(){return this._b;}

    set b(b){this._b = b;}

    get a(){return this._a;}

    set a(a){this._a = a;}
}

class Vertex{
    constructor (id,x,y){
        this.id = id;
        this._x = x;
        this._y = y;
    }

    get x(){return this._x;}
    get y(){return this._y;}
    set x(x){this._x = x;}
    set y(y){this._y = y;}

    isEqualTo(vertex){
        return ((this.x-vertex.x)*(this.x-vertex.x)+(this.y-vertex.y)*(this.y-vertex.y)<VERTEX_TOL)
    }
}


class Shape {
    constructor(id,type,color,borderColor) {
        this._id = id;
        this._type = type;
        this._color = color;
        this._borderColor = borderColor;

        if (this.constructor === Shape) {
            throw new TypeError('Abstract class "Shape" cannot be instantiated directly.'); 
        }

        if (this.draw === undefined) {
            throw new TypeError('Classes extending the shape abstract class must define draw');
        }

        if (this.isInside === undefined){
            throw new TypeError('Classes extending the shape abstract class must define draw');
        }

        if (this.boundingBox === undefined){
            throw new TypeError('Classes extending the shape abstract class must define draw');
        }  
    }

    get id(){return this._id;}
    set id(id){this._id = id;}
    get type(){return this._type;}
    set type(type){this._type = type;}
    get color(){return this._color;}
    set color(color){this._color = color;}
    get borderColor(){return this._borderColor;}
    set borderColor(borderColor){this._borderColor = borderColor;}
}



class Point extends Shape{

    constructor (id,type,color,borderColor,x,y,size){
        super(id,type,color,borderColor);
        this._x = x;
        this._y = y;
        this._size = size;
    }

    get x(){return this._x;}

    get y(){return this._y;}

    set x(x){this._x = x;}

    set y(y){this._y = y;}

    get size(){return this._size;}

    set size(s){this._size = s;}

    draw(ctx){
        ctx.fillStyle =  `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        ctx.strokeStyle = `rgb(${this.borderColor.r},${this.borderColor.g},${this.borderColor.b})`;
        var pos_x = this.x-Math.round(this.size/2.0);
        var pos_y = this.y-Math.round(this.size/2.0);
        ctx.fillRect(pos_x,pos_y,this.size,this.size);
        ctx.strokeRect(pos_x,pos_y,this.size,this.size);
    }

    isInside(x,y){
        return (y >= (this.y - Math.round(this.size/2.0)) && y <= (this.y + Math.round(this.size/2.0))
                && x >= (this.x - Math.round(this.size/2.0)) && x <= (this.x + Math.round(this.size/2.0)));
    }

    boundingBox(){
        var xmin = this.x-Math.round(this.size/2.0)-2;
        var xmax = this.x+Math.round(this.size/2.0)+2;
        var ymin = this.y-Math.round(this.size/2.0)-2;
        var ymax = this.y+Math.round(this.size/2.0)+2;
        return new BoundingBox(-1,-1,"rgb(0,0,0)","rgb(0,0,0)",xmin,ymin,xmax,ymax,1);
    }

    translate(x,y){
        this._x+=x;
        this._y+=y;
    }
}

class LineSegment extends Shape{
    constructor (id,type,color,borderColor,x0,y0,x1,y1,width){
        super(id,type,color);
        this._x0 = x0;
        this._y0 = y0;
        this._x1 = x1;
        this._y1 = y1;

        this._width = width;
    }

    get x0(){return this._x0;}
    get y0(){return this._y0;}
    set x0(x0){this._x0 = x0;}
    set y0(y0){this._y0 = y0;}
    get x1(){return this._x1;}
    get y1(){return this._y1;}
    set x1(x1){this._x1 = x1;}
    set y1(y1){this._y1 = y1;}    
    get width(){return this._width;}
    set width(_width){this._width = _width;}

    draw(ctx){
        ctx.beginPath()
        ctx.moveTo(this.x0, this.y0);
        ctx.lineTo(this.x1, this.y1); 
        ctx.lineWidth = this.width;
        ctx.strokeStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;   
        ctx.stroke();        
    }

    isInside(x,y){
        var xmin = x-this.width;
        var xmax = x+this.width;
        var ymin = y-this.width;
        var ymax = y+this.width;

        return CohenSutherlandLineClip(this.x0,this.y0,this.x1,this.y1,xmin,xmax,ymin,ymax);
    }

    boundingBox(){
        var xmin = this.x0<=this.x1?this.x0:this.x1;
        var xmax = this.x0>this.x1?this.x0:this.x1;
        var ymin = this.y0<=this.y1?this.y0:this.y1;
        var ymax = this.y0>this.y1?this.y0:this.y1;
        return new BoundingBox(-1,-1,"rgb(0,0,0)","rgb(0,0,0)",xmin,ymin,xmax,ymax,1);    
    }

    translate(x,y){
        this._x0+=x;
        this._y0+=y;
        this._x1+=x;
        this._y1+=y;
    }
}

class Rectangle extends Shape{
    constructor (id,type,color,borderColor,x0,y0,x1,y1,width){
        super(id,type,color,borderColor);
        this._x0 = x0;
        this._y0 = y0;
        this._x1 = x1;
        this._y1 = y1;
        this._width = width;
    }

    get x0(){return this._x0;}
    get y0(){return this._y0;}
    set x0(x0){this._x0 = x0;}
    set y0(y0){this._y0 = y0;}
    get x1(){return this._x1;}
    get y1(){return this._y1;}
    set x1(x1){this._x1 = x1;}
    set y1(y1){this._y1 = y1;}    
    
    draw(ctx){
        ctx.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;  
        ctx.strokeStyle = `rgb(${this.borderColor.r},${this.borderColor.g},${this.borderColor.b})`;
        ctx.fillRect(this.x0, this.y0, this.x1-this.x0, this.y1-this.y0);
        ctx.strokeRect(this.x0, this.y0, this.x1-this.x0, this.y1-this.y0);
    }

    isInside(x,y){
        var xmin = this.x0<=this.x1?this.x0:this.x1;
        var xmax = this.x0>this.x1?this.x0:this.x1;
        var ymin = this.y0<=this.y1?this.y0:this.y1;
        var ymax = this.y0>this.y1?this.y0:this.y1;

        if ((x>=xmin) && (x<=xmax) && (y>=ymin) && (y<=ymax)){
            return true;
        }
        else{
            return false;
        }
    }

    boundingBox(){
        var xmin = this.x0<=this.x1?this.x0:this.x1;
        var xmax = this.x0>this.x1?this.x0:this.x1;
        var ymin = this.y0<=this.y1?this.y0:this.y1;
        var ymax = this.y0>this.y1?this.y0:this.y1;
        return new BoundingBox(-1,-1,"rgb(0,0,0)","rgb(0,0,0)",xmin,ymin,xmax,ymax);
    }

    translate(x,y){
        this._x0+=x;
        this._y0+=y;
        this._x1+=x;
        this._y1+=y;
    }
}

class BoundingBox extends Rectangle{
    constructor (id,type,color,borderColor,x0,y0,x1,y1,width){
        super(id,type,color,borderColor,x0,y0,x1,y1,width);
        this._x0 = x0;
        this._y0 = y0;
        this._x1 = x1;
        this._y1 = y1;
        this._width = width;
    }

    draw(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;  
        ctx.rect(this.x0, this.y0, this.x1-this.x0, this.y1-this.y0);
        ctx.stroke();
       
        
        
        var pos_x,pos_y;

        ctx.fillStyle =  `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        pos_x = this.x0-3;
        pos_y = this.y0-3;
        ctx.fillRect(pos_x,pos_y,6,6);

        ctx.fillStyle =  `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        pos_x = this.x1-3;
        pos_y = this.y1-3;
        ctx.fillRect(pos_x,pos_y,6,6);

        ctx.fillStyle =  `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        pos_x = this.x0-3;
        pos_y = this.y1-3;
        ctx.fillRect(pos_x,pos_y,6,6);

        ctx.fillStyle =  `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        pos_x = this.x1-3;
        pos_y = this.y0-3;
        ctx.fillRect(pos_x,pos_y,6,6);
        ctx.restore();

    }
}



class Circle extends Shape{
    constructor (id,type,color,borderColor,cx,cy,radius){
        super(id,type,color,borderColor);
        this._cx = cx;
        this._cy = cy;
        this._radius = radius;
    }

    get cx(){return this._cx;}
    get cy(){return this._cy;}
    set cx(cx){this._cx = cx;}
    set cy(cy){this._cy = cy;}
    get radius(){return this._radius;}
    set radius(r){this._radius = r;}

    draw(ctx){
 
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.radius, 0, 2 * Math.PI, false);
        ctx.strokeStyle = `rgb(${this.borderColor.r},${this.borderColor.g},${this.borderColor.b})`;
        ctx.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle =`rgb(${this.borderColor.r},${this.borderColor.g},${this.borderColor.b})`;
        ctx.stroke();        
    }

    isInside(x,y){
        return (Math.sqrt((x-this.cx)*(x-this.cx)+(y-this.cy)*(y-this.cy))<=this.radius);
    }

    boundingBox(){
        var x0 = this.cx-this.radius; 
        var y0 = this.cy-this.radius;
        var x1 = this.cx+this.radius;
        var y1 = this.cy+this.radius;

        return new BoundingBox(-1,-1,"rgb(0,0,0)","rgb(0,0,0)",x0,y0,x1,y1,1);
    }

    translate(x,y){
        this._cx+=x;
        this._cy+=y;
    }
}


class Polygon extends Shape{
    constructor(id,type,color,borderColor,width){
        super(id,type,color,borderColor);
        this.width = width;
        this._verticesList = [];
    }

    push(vertex){
        this._verticesList.push(vertex);
    }
    get numVertices(){return this._verticesList.length;}

    get verticesList(){return this._verticesList;}

    get list(){return this._verticesList;}

    get size(){return this._verticesList.length;}


    draw(ctx){
        if (this.numVertices<3){
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(this.verticesList[0].x, this.verticesList[0].y);
            ctx.lineTo(this.verticesList[1].x, this.verticesList[1].y); 
            ctx.lineWidth = this.width;
            ctx.strokeStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;   
            ctx.stroke();
            ctx.restore();        
                    
        }
        else{
            ctx.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
            ctx.strokeStyle = `rgb(${this.borderColor.r},${this.borderColor.g},${this.borderColor.b})`;
            ctx.beginPath();
            ctx.lineWidth = this.width;
            ctx.moveTo(this.verticesList[0].x,this.verticesList[0].y);
            var i;
            for (i=1;i<this.numVertices;i++){
                ctx.lineTo(this.verticesList[i].x,this.verticesList[i].y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }        
       
    }

    isInside(x,y){
 
        var count = countIntersections(x,y,this);
        if (count%2==0){
            return 0;
        }
        else{
            return 1;
        }
    }

    boundingBox(){
        var xmin,xmax,ymin,ymax;
        xmax = xmin = this.verticesList[0].x;
        ymax = ymin = this.verticesList[0].y;
        var i = 0;
        for (i=1;i<this.verticesList.length;i++){
            var x = this.verticesList[i].x;
            var y = this.verticesList[i].y;
            xmin = x<xmin?x:xmin;
            xmax = x>xmax?x:xmax;
            ymin = y<ymin?y:ymin;
            ymax = y>ymax?y:ymax;
        }
        return new BoundingBox(-1,-1,"rgb(0,0,0)","rgb(0,0,0)",xmin,ymin,xmax,ymax,1);
    }

    translate(x,y){
        var i;
        for (i=0;i<this.verticesList.length;i++){
           var vertex = this.verticesList[i];
           vertex.x += x;
           vertex.y += y;
        }
    }
}

class ShapeList{
    constructor(){
        this._list = []
        this._selectedShape = undefined;
    }

    get size(){return this._list.length;}
    get list(){return this._list;}
    set list(_l){this._list = _l;}

    get selectedShape(){return this._selectedShape;}

    set selectedShape(selShape){this._selectedShape = selShape;}
    
    push(shape){this._list.push(shape);}

    delete(shape){
        var index = this.list.indexOf(shape);
        if (index!=-1){
            this.list.splice(index,1);
        }
    }

    draw(ctx){
        var i;
        for (i=0;i<this.size;i++){
            var shape = this.list[i];
            shape.draw(ctx);
            if (shape == this._selectedShape){
                shape.boundingBox().draw(ctx);
            }
        }
    }



    load(json){
        var list = json._list;
        var i;
        for (i=0;i<list.length;i++){
            var shape = list[i];
            switch(shape._type){
                case PrimitiveType.POINT:{
                    shapeList.push(new Point(shape._id,PrimitiveType.POINT,
                        new Color(shape._color._r,
                                  shape._color._g,
                                  shape._color._b),
                        new Color(shape._borderColor._r,
                                  shape._borderColor._g,
                                  shape._borderColor._b),
                        shape._x,
                        shape._y,
                        shape._size
                        )
                      );
                }
                break;
                case PrimitiveType.CIRCLE:{
                    shapeList.push(new Circle(shape._id,PrimitiveType.CIRCLE,
                        new Color(shape._color._r,
                                  shape._color._g,
                                  shape._color._b),
                        new Color(shape._borderColor._r,
                                  shape._borderColor._g,
                                  shape._borderColor._b),
                        shape._cx,
                        shape._cy,
                        shape._radius
                        )
                      );
                }
                break;
                case PrimitiveType.LINE:{
                    shapeList.push(new LineSegment(shape._id,PrimitiveType.LINE,
                        new Color(shape._color._r,
                                  shape._color._g,
                                  shape._color._b),
                        new Color(shape._borderColor._r,
                                  shape._borderColor._g,
                                  shape._borderColor._b),
                        shape._x0,
                        shape._y0,
                        shape._x1,
                        shape._y1,
                        shape._width
                        )
                      );
                }
                break;
                case PrimitiveType.RECTANGLE:{
                    shapeList.push(new Rectangle(shape._id,PrimitiveType.LINE,
                        new Color(shape._color._r,
                                  shape._color._g,
                                  shape._color._b),
                        new Color(shape._borderColor._r,
                                  shape._borderColor._g,
                                  shape._borderColor._b),
                        shape._x0,
                        shape._y0,
                        shape._x1,
                        shape._y1,
                        shape._width
                        )
                      );
                }
                break;
                case PrimitiveType.POLYGON:{
                    var polygon = new Polygon(shape._id,PrimitiveType.LINE,
                        new Color(shape._color._r,
                                  shape._color._g,
                                  shape._color._b),
                        new Color(shape._borderColor._r,
                                  shape._borderColor._g,
                                  shape._borderColor._b)
                        );


                    var j;
                    for (j=0;j<shape._verticesList.length;j++){
                        var vertex = shape._verticesList[j];
                        polygon.push(new Vertex(vertex.id,vertex._x,vertex._y));
                    }
                    shapeList.push(polygon);
                }
                break;
                default:
                break;
            } 
        }
    }
}

