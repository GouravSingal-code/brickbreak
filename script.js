const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
var scr = document.getElementById("score");


const circle = {
    x:200,
    y:60,
    size:3,
    dx:2,
    dy:2
}

function drawCircle(){
    ctx.beginPath();
    ctx.arc(circle.x , circle.y , circle.size , 0 , Math.PI*2);
    ctx.fillStyle="#0095DD";
    ctx.fill();

/*    
ctx.beginPath();
ctx.rect(plate.x , plate.y , plate.w , plate.h);
ctx.fillStyle="#0095DD";
ctx.fill();
*/
    
}


const plate = {
 x:120,
 y:148,
 w:50,
 h:5,
 dx:0,
 speed:5
}

function drawplate(){
ctx.beginPath();
ctx.rect(plate.x , plate.y , plate.w , plate.h);
ctx.fillStyle="#0095DD";
ctx.fill();
}


var x=[];
var y=[];

function  update(){
 
  ctx.clearRect(0 , 0 , canvas.width  , canvas.height);
  drawplate();
  drawCircle();


  for( var i=2 ; i<canvas.width-5 ; i+=27 ){
   for( var j=5 ; j<50 ; j+=8 ){
       
    var z=true;    
    for( var k=0 ; k<x.length ; k++ ){
       if( x[k]==i && y[k]==j ){
           z=false;
           break;
       }
   }
    
   if( z==false ){
       continue;
   }
       
       
   if( circle.y<j+6 && circle.x<=i+25 && circle.x>=i ){
       x.push(i);
       y.push(j);
       circle.dy*=-1;
       var s = parseInt(scr.innerHTML , 10);
       s++;
       scr.innerHTML = s;
       continue;
   } 

ctx.beginPath();
ctx.rect(i , j , 25 , 5 );
ctx.fillStyle="#0095DD";
ctx.fill();

   }
 }

      
  circle.x+=circle.dx;
  circle.y+=circle.dy; 

    
  plate.x+=plate.dx;
    
  if( circle.x >= plate.x && circle.x <= plate.x+plate.w && circle.y+circle.size>=plate.y && circle.y+circle.size<=canvas.height ){
      circle.dy*=-1;
  }
    
  
    



    
  //detect side walls
  if( circle.x+circle.size > canvas.width || circle.x-circle.size < 0 ){ 
    circle.dx*=-1;
  }
  
  // detect top and bottom
  if( circle.y+circle.size > canvas.height || circle.y-circle.size < 0 ){
    if( circle.y+circle.size > canvas.height ){
      scr.innerHTML = 0;  
      x.splice(0, x.length);
      y.splice(0, y.length);
    }
    circle.dy*=-1;
  }
    

    
  requestAnimationFrame(update);
    
}



function moveRight(){
   if( plate.x+plate.w >= canvas.width ){
       plate.dx=0;

   }else{
   plate.dx = plate.speed; 
   }
}

function moveLeft(){
   if( plate.x < 1 ){
       plate.dx=0;
   }else{
   plate.dx = -plate.speed;
   }
}



function keydown(e){
    console.log(e);
  if( e.key === 'ArrowRight' || e.key ==='Right'){
      moveRight();
  }else if( e.key=== 'ArrowLeft'||e.key === 'Left'){
      moveLeft();
  }
}

function keyup(e){
 if( e.key==='ArrowRight'|| e.key==='ArrowLeft'){
    plate.dx=0;
 }
    
}

update();

 document.addEventListener('keydown' , keydown);
 document.addEventListener('keyup' , keyup);





