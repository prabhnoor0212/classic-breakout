var canvas = document.getElementById('space');
var ctx = canvas.getContext('2d');
var rightp=false;
var leftp=false;
var baseh=15;
var basew=100;
var basey=(canvas.height-baseh);
var basex = (canvas.width-basew)/2;
var x= canvas.width/2;
var y= canvas.height-15;
var dx= 3;
var dy= -3;
var points= 0;
var radius = 10;
var bw= 70;
var bh = 25;
var bpad= 10;
var bmartop= 30;
var bmarleft= 30;
var c;
var r;


var bricks = [];
for (c=0;c<18;c++){
	bricks[c] = [];
	for(r=0;r<5;r++){
		bricks[c][r] = {x: 0,y: 0,flag: 1}
	}
}
function drawBricks(){
	for(c=0;c<18;c++){
	    for(r=0;r<5;r++){
	    	if(bricks[c][r].flag == 1){
		     var brickx=(c*(bw+bpad))+bmarleft;
		     var bricky=(r*(bh+bpad))+bmartop;
		     bricks[c][r].x = brickx;
		     bricks[c][r].y = bricky;
		     ctx.beginPath();
		     ctx.rect(brickx,bricky,bw,bh);
		     ctx.fillStyle = "#FF1493";
		     ctx.fill();
		     ctx.closePath();
	}
 }
}
}

function game(){
	
	//BALL
	ctx.clearRect(0,0,canvas.width,canvas.height)
	drawBricks();
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2);
	ctx.fillStyle = "#7CFC00";
	ctx.fill();
	ctx.closePath();
	x=x+dx;
	y=y+dy;
	if(x+dx>canvas.width-radius||x+dx<0){dx=-dx;}
	if(y+dy<0){dy=-dy}
	else if(y+dy > canvas.height){
		if(x > basex+1 && x< basex+basew+1){
			dy = -dy;
		}
		else{
			alert("Better luck next time!");
			document.location.reload();
		}
	}
	//impact
	for(c=0;c<18;c++){
		for(r=0;r<5;r++){
			var b= bricks[c][r];
			if(b.flag == 1){
				if(b.x<x && b.x+bw>x && b.y<y && b.y+bh>y){
					dy = -dy;
					b.flag = 0;
					points++;
				}
			}
		}
	}
	

    
	//base
    if(rightp == true && basex < canvas.width-basew){basex += 5}
    if(leftp == true && basex > 0){basex -= 5}
    ctx.beginPath();
    ctx.rect(basex,basey,basew,baseh);
    ctx.fillStyle = "#00FFFF";
	ctx.fill();
	ctx.closePath();

}
document.addEventListener("keydown", dh);
document.addEventListener("keyup", uh);

function dh(e){
	if(e.keyCode == 39 || e.keyCode == 68){rightp= true;}
	if(e.keyCode == 37  || e.keyCode == 65){leftp= true;}
}
function uh(e){
	if(e.keyCode == 39 || e.keyCode == 68){rightp = false;}
	if(e.keyCode == 37 || e.keyCode == 65){leftp = false;}
}




setInterval(game,10);

