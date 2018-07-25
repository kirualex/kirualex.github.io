function cbMilyWay(h){this.init=function(){if(this.freezed=!1,this.speedOffset=0,this.canvas=document.getElementById(h.id),!this.canvas)return!1;this.ctx=this.canvas.getContext("2d"),this.stars=[];var t=window.devicePixelRatio||1,a=window.innerWidth*t,i=window.innerHeight*t;this.canvas.width=a,this.canvas.height=i,this.centerX=this.canvas.width/2,this.centerY=this.canvas.height/2,this.audio=h.soundId?document.getElementById(h.soundId):null,this.populateSky()},this.random=function(t,a,i){return parseFloat(Math.min(t+Math.random()*(a-t),a).toFixed(i||4))},this.randomInt=function(t,a){var i=t+Math.random()*(a+1-t);return i=Math.floor(i)},this.randomDistribution=function(){return arguments[Math.floor(Math.random()*arguments.length)]},this.toRad=function(t){return t*(Math.PI/180)},this.registerHandler=function(t){var r=this;(t=t?document.querySelector(t):this).addEventListener("mousemove",function(t){var a=Math.abs(r.centerX-t.clientX),i=Math.abs(r.centerY-t.clientY),e=Math.max(a,i),n=Math.abs(r.centerX-a),s=Math.abs(r.centerY-i),h=Math.min(n,s);e<150?(r.freezed=!0,r.speedOffset=Math.min(.2,h/13e3)):(r.freezed=!1,r.speedOffset=Math.min(.2,h/5e3))})},this.populateSky=function(){var t=Math.round(Math.sqrt(Math.pow(this.centerY,2)+Math.pow(this.centerX,2))),a=Math.floor(this.canvas.width*h.popularity),i=[[252,90,14],[185,84,235],[120,218,252],[255,255,255]];this.stars=[];for(var e=0;e<a;e++){var n={},s=this.randomInt(0,2);n.color=i[s],n.angle=Math.ceil(360*Math.random()),n.opacity=this.random(.2,.7),n.width=this.randomDistribution(3,2,2,2,2,1)+5,n.length=n.width/20,n.trailLength=10,n.radius=this.randomDistribution(this.randomInt(0,t),this.randomInt(25,t),this.randomInt(45,t),this.randomInt(50,t)),n.speed=Math.abs((30/n.radius+Math.random())/10),this.stars.push(n)}},this.clearCtx=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},this.drawStars=function(){this.clearCtx();for(var t=0;t<this.stars.length;t++){var a=this.stars[t];a.angleRad=this.toRad(a.angle),a.angleRadEnd=a.angleRad+a.length,a.angleRadStart=a.angleRadStart?a.angleRadStart:a.angleRad,this.freezed?a.trailLength>h.maxTrailLength&&(a.angleRadStart=a.angleRadEnd-a.trailLength):a.angleRadStart=Math.min(a.angleRadStart+(h.freezedRollupSpeed+a.trailLength/30),a.angleRad),a.trailLength=a.angleRadEnd-a.angleRadStart;var i=-Math.min(a.trailLength,.15),e=window.devicePixelRatio||1;this.ctx.beginPath(),this.ctx.strokeStyle="rgba("+a.color[0]+","+a.color[1]+","+a.color[2]+","+Math.max(a.opacity+i,.1)+")",this.ctx.lineWidth=12*e,this.ctx.lineCap="round",this.ctx.arc(this.centerX,this.centerY,a.radius*e,a.angleRadEnd,a.angleRadEnd,!1),this.ctx.stroke(),this.ctx.closePath(),this.ctx.beginPath(),this.ctx.lineWidth=2*e,this.ctx.arc(this.centerX,this.centerY,a.radius*e,a.angleRadStart,a.angleRadEnd,!1),this.ctx.stroke(),a.angle+=Math.max(a.speed+this.speedOffset,h.speedMin),360==a.angle&&(a.angle=0)}},this.paused=!1,this.animated=!1,this.animateSky=function(){function t(){requestAnimationFrame(t),a=Date.now(),h<(i=a-s)&&(s=a-i%h,e.paused||e.drawStars())}var a,i,e=this,n=60,s=Date.now(),h=1e3/n;t()},this.playAnimate=function(){this.paused=!1,this.speedOffset=0,this.freezed=!1,this.animated||(this.animateSky(),this.animated=!0),$(this.canvas).animate({opacity:1})},this.pauseAnimate=function(){this.paused=!0,this.freezed?$(this.canvas).animate({opacity:.2}):$(this.canvas).animate({opacity:.5})};var t=this;window.onresize=function(){t.init()},this.init()}