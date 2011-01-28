function App(){
  var self = this;
  self.canvas = $("#viewport").get(0);
  self.tags = {};
  
  this.init = function(){
    self.particleSystem = arbor.ParticleSystem({ repulsion: 500, stiffness: 600, friction: 0.5, gravity: false, fps: 30, dt: 0.02, precision: 0.5 });
    self.particleSystem.renderer = new Renderer(self.canvas);
	if (args.q) self.loadData(args.q);
	$(self.canvas).bind("mousedown", self.mouseClicked);
  };
  
  this.mouseClicked = function(e){
	var pos = $(self.canvas).offset();
	var nearest = self.particleSystem.nearest(arbor.Point(e.pageX-pos.left, e.pageY-pos.top));
	self.loadData(nearest.node.name);
	return false;
  };
  
  this.loadData = function(tag){
	$.getJSON("data/", { tag: tag }, function(data){ self.renderData(data, tag) });
  };
  
  this.renderData = function(data, tag){
	var graph = { nodes: {}, edges: {} };
	graph["nodes"][tag] = {};
	graph["edges"][tag] = {};
	
	$.each(data["similar tags"], function(key, value){
		graph["edges"][tag][value] = {};
		if (!self.tags[value]){
			graph["nodes"][value] = {};
			self.tags[value] = 1;
		}
	});
	
	self.particleSystem.graft(graph);
  };
};

function Renderer(canvas){
    var self = this;
	var ctx = canvas.getContext("2d");
		
	this.init = function(system){
		self.particleSystem = system;
        self.resize();
	}
	
	this.redraw = function(){
        ctx.fillStyle = "white";
        ctx.fillRect(0,0, canvas.width, canvas.height);
        
		ctx.strokeStyle = "rgba(0,0,0,0.1)";
		ctx.lineWidth = 1;
		  
        self.particleSystem.eachEdge(function(edge, pt1, pt2){
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);
          ctx.stroke();
        });

		ctx.font = "bold 11px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "#777";
		
        self.particleSystem.eachNode(function(node, pt){
		  var w = ctx.measureText(node.name).width + 6;
		  pt.x = Math.floor(pt.x);
		  pt.y = Math.floor(pt.y);
		  
		  if (node.name){
            ctx.fillText(node.name, pt.x, pt.y+4)
          }
        });	
      };
	       
      this.resize = function(){
        var w = $(window).width(), h = $(window).height();
        canvas.width = w; canvas.height = h;
        self.particleSystem.screenSize(w,h);
        self.redraw();
      };
};

var app = new App;
$().ready(app.init);
