(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"у костра_atlas_1", frames: [[0,0,639,468],[641,0,639,468],[1282,0,639,468],[0,470,639,468],[0,940,639,468],[0,1410,639,468],[641,470,639,468],[1282,470,639,468],[641,940,639,468],[1282,940,639,468],[641,1410,639,468]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.огонь1 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.огонь10 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.огонь11 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.огонь2 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.огонь3 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.огонь4 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.огонь5 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.огонь6 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.огонь7 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.огонь8 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.огонь9 = function() {
	this.initialize(ss["у костра_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.свет = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F9C35B").s().p("AwzQzQm9m9AAp2QAAp1G9m+QG+m9J1AAQJ2AAG9G9QG+G+AAJ1QAAJ2m+G9Qm9G+p2AAQp1AAm+m+g");
	this.shape.setTransform(152.1,152.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,304.2,304.2);


(lib.Символ1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.свет("synched",0);
	this.instance.setTransform(101.8,101.8,0.6692,0.6692,0,0,0,152.1,152.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ1, new cjs.Rectangle(0,0,203.6,203.6), null);


// stage content:
(lib.укостра = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_2
	this.instance = new lib.Символ1();
	this.instance.setTransform(284.5,309.95,1,1,0,0,0,101.8,101.8);
	this.instance.alpha = 0.3516;
	this.instance.filters = [new cjs.BlurFilter(93, 93, 1)];
	this.instance.cache(-2,-2,208,208);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).to({scaleX:1,scaleY:1,x:284.5,y:309.95,alpha:0.3516},14).to({scaleX:1.8108,scaleY:1.8108,x:284.6,y:310.05,alpha:0.2305},16).wait(14));

	// зверята
	this.instance_1 = new lib.огонь1();

	this.instance_2 = new lib.огонь2();
	this.instance_2._off = true;

	this.instance_3 = new lib.огонь3();
	this.instance_3._off = true;

	this.instance_4 = new lib.огонь4();
	this.instance_4._off = true;

	this.instance_5 = new lib.огонь5();
	this.instance_5._off = true;

	this.instance_6 = new lib.огонь6();
	this.instance_6._off = true;

	this.instance_7 = new lib.огонь7();
	this.instance_7._off = true;

	this.instance_8 = new lib.огонь8();
	this.instance_8._off = true;

	this.instance_9 = new lib.огонь9();
	this.instance_9._off = true;

	this.instance_10 = new lib.огонь10();
	this.instance_10._off = true;

	this.instance_11 = new lib.огонь11();
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(6).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(12).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(9));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(15).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(27).to({_off:false},0).to({_off:true},3).wait(12));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(18).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(33).to({_off:false},0).to({_off:true},3).wait(21).to({_off:false},0).to({_off:true},3).wait(15));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(21).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(39).to({_off:false},0).to({_off:true},3).wait(15).to({_off:false},0).to({_off:true},3).wait(18));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(24).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(45).to({_off:false},0).to({_off:true},3).wait(9).to({_off:false},0).to({_off:true},3).wait(21));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(27).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(51).to({_off:false},0).to({_off:true},3).wait(3).to({_off:false},0).to({_off:true},3).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(30).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(57).to({_off:false},0).to({_off:true},3).wait(27));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(321,280,318,316.70000000000005);
// library properties:
lib.properties = {
	id: 'A9CD404A18E9CC4FB1EDD1B8DFEA7FFB',
	width: 642,
	height: 560,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/у костра_atlas_1.png", id:"у костра_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['A9CD404A18E9CC4FB1EDD1B8DFEA7FFB'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;