//画布
var canvas;
var context;
//蒙版
var canvas_bak;
var context_bak;

var canvasWidth=500;
var canvasHeight=400;

var canvasTop,canvasLeft;

//画笔大小
var size=1;
var color='#000';

//画图形
function draw_graph(graphType,obj){
	$('#canvas_bak').css('z-index',1);

	chooseImg(obj);
	var canDraw=false;

	var startX;
	var startY;

	//鼠标按下获取
	function mousedown(e){
		context.strokeStyle=color;
		context_bak.strokeStyle=color;
		e=e||window.event;
		startX=e.clientX-canvasLeft;	//鼠标点击坐标
		startY=e.clientY-canvasTop;
		context_bak.moveTo(startX,startY);
		canDraw=true;

		if(graphType=='pencil'){
			context_bak.beginPath();
		}else if(graphType=='circle'){
			context.beginPath();
			context.moveTo(startX,startY);
			context.lineTo(startX+2,startY+2);
			context.stoke();
		}else if(graphType=='rubber'){
			context.clearRect(startX-size*10,startY-size*10,size*20,size*20);
		}
	}

	//鼠标离开 把蒙版canvas图片生成到canvas中
	function mouseup(e){
		e=e||window.event;
		canDraw=false;
		var image=new Image();
		if(graphType!='rubber'){
			image.src=canvas_bak.toDataURL();
			image.onload=function(){
				context.drawImage(image,0,0,image.width,image.height,0,0,canvasWidth,canvasHeight);
				clearContext();
			}
		}
	}
}

function clearContext(type){
	if(!type){
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}else{
		context.clearRect(0,0,canvasWidth,canvasHeight);
		context_bak.clearRect(0,0,canvasWidth,canvasHeight);
	}
}