//render
var canvas;
var ctx;

//game
var scene;
var player;
var players;
var redFlag;
var blueFlag;
var gravity = 1;
var running = false;

//tiles
var tileSize = 64;

//Animations
var playerRunningRight;
var playerRunningLeft;
var playerIdleRight;
var playerIdleLeft;
var playerJumpingRight;
var playerJumpingLeft;

//Map
var charMap1 = [
  ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'],
  ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'],
  ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'],
  ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'],
  ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'],
  ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'],
  ['a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a'],
  ['a','a','a','a','a','a','g','g','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','g','g','a','a','a','a','a','a','a','a','a','a','a','a'],
  ['a','a','g','g','a','a','g','g','a','g','a','a','a','a','a','g','a','a','a','a','a','a','g','g','a','a','g','g','a','g','a','a','a','a','a','g','a','a','a','a'],
  ['a','g','g','g','a','g','g','g','g','g','g','g','a','a','g','g','g','a','a','a','a','g','g','g','a','g','g','g','g','g','g','g','a','a','g','g','g','a','a','a'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
  ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g']
]

//game
var Canvas = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = window.innerHeight - 18;
    this.ctx = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frame = 0;
    this.interval = setInterval(function () {
      if (running) {
        update();
        render();
      }
    }, 20);
  },
  clear: function() {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
  },
  setClipArea: function functionName(camera) {
    ctx.rect(
      0,
      0,
      camera.viewportWidth,
      camera.viewportHeight
    )
    ctx.clip();
  },
  setCtxScale: function (camera) {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.viewportWidth = camera.viewportWidth;
    this.viewportHeight = camera.viewportHeight;
    this.ratioW = this.width/this.viewportWidth;
    this.ratioH = this.height/this.viewportHeight;
  },
  getCanvasContext: function () {
    return this.ctx;
  }
}

//Clases
function TileSheet(onLoad) {
  this.sheet = new Image();
  this.tileWidth = tileSize;
  this.tileHeight = tileSize;
  var tileSheet = this;
  this.sheet.onload = function ()
  {
    onLoad(tileSheet)
  }
  this.sheet.src = "Assets/Sprites/tilesheet.png";
}

function PlayerSheet(onLoad) {
  this.sheet = new Image();
  this.playerWidth = tileSize;
  this.playerHeight = tileSize;
  var playerSheet = this;
  this.sheet.onload = function ()
  {
    onLoad(playerSheet);
    running = true;
  }
  this.sheet.src = "Assets/Sprites/playersheet.png";
}

var Key = {
  _pressed: {},

  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

function Animation(startFrameY, endFrameX, ticksPerFrame, loop) {
  this.frameY = startFrameY;
  this.endFrameX = endFrameX;
  this.loop = loop;
  this.ticks = 0;
  this.ticksPerFrame = ticksPerFrame | 4;
}

function AnimationController(animation) {
  this.frameX = 0;
  this.frameY = animation.frameY;
  this.ticks = 0;
  this.looped = false;

  this.tick = function () {
    this.ticks++;
  }

  this.resetAnimation = function () {
    this.ticks = 0;
    this.looped = false;
    this.frameX = 0;
  }

  this.updateFrames = function () {
    if (this.ticks >= animation.ticksPerFrame) {
      if (animation.loop) {
        this.frameX++;
        if (this.frameX > animation.endFrameX) {
          this.frameX = 0;
        }
      }

      if (!animation.loop) {
        if (this.looped) {
          return;
        } else {
          this.frameX++;
          if (this.frameX > animation.endFrameX) {
            this.frameX = 0;
          }
        }
      }
      this.ticks = 0;
    }
  }
}

function Tile(tileSheet,isSolid,isMobile,isTrigger,blastResistance,x,y) {
  this.xPos = x;
  this.yPos = y;
  this.width = tileSheet.tileWidth;
  this.height = tileSheet.tileHeight;
  this.image = {
    frameX: 0,
    frameY: 0
  }
  this.collider;
  this.solid = isSolid;
  this.mobile = isMobile;
  this.trigger = isTrigger;
  this.blastResistance = blastResistance;
  this.render = function (width,height) {
    ctx.drawImage(
      tileSheet.sheet,
      this.image.frameX * width,
      this.image.frameY * height,
      width,
      height,
      0,
      0,
      width,
      height);
  }
}

function Camera(focus,width,height) {
  this.focus = focus;
  this.viewportWidth = width * tileSize;
  this.viewportHeight = height * tileSize;
  this.xPos = 0;
  this.yPos = 5 * tileSize;
  this.update = function () {
    if (focus.xPos > this.xPos + this.viewportWidth * (3/4)) {
      this.xPos = focus.xPos - this.viewportWidth * (3/4);
    } else if (focus.xPos < this.xPos + this.viewportWidth * (1/4)) {
      this.xPos = focus.xPos - this.viewportWidth * (1/4);
    }
  }
}

function BoxCollider(width,height,x,y) {
  this.type = "rect"
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  scene.colliders.push(this);
  this.checkCollision = function () {
    for (var e = 0; e < scene.colliders.length; e++) {
      c = scene.colliders[e];
      if (c.type == "circle" && c != this) {
        return circleRectCollision(c.x,c.y,c.radius,this.x,this.y,this.width,this.height);
      } else if (c.type == "rect" && c != this) {
        return rectRectCollision();
      } else if (c.type == "point" && c != this) {
        return rectPointCollision(this.x,this.y,this.width,this.height,c.x,c.y);
      }
    }
  }
  this.render = function () {
    ctx.beginPath();
    ctx.rect(this.x,this.y,width,height);
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }
}

function PointCollider(x,y) {
  this.type = "point";
  this.x = x;
  this.y = y;
  this.checkCollision = function () {
    for (var e = 0; e < scene.colliders.length; e++) {
      c = scene.colliders[e];
      if (c.type == "point") {
        return pointPointCollision(this.x,this.y,c.x,c.y)
      }
      if (c.type == "rect") {
        return rectPointCollision(c.x,c.y,c.width,c.height,this.x,this.y)
      }
      if (c.type == "circle") {
        return circlePointCollision(this.x,this.y,c.x,c.y,c.radius)
      }
    }
  }
}

function CircleCollider(x,y,radius) {
  this.type = "circle";
  this.x = x;
  this.y = y;
  this.radius = radius;
  scene.colliders.push(this);
  this.checkCollision = function () {
    for (var e = 0; e < scene.colliders.length; e++) {
      c = scene.colliders[e];
      if (c.type == "circle" && c != this) {
        return circleCircleCollision(this.x,this.y,this.radius,c.x,c.y,c.radius);
      } else if (c.type == "rect" && c != this) {
        return circleRectCollision(this.x,this.y,this.radius,c.x,c.y,c.width,c.height)
      } else if (c.type == "point" && c != this) {
        return circlePointCollision(c.x,c.y,this.x,this.y,this.radius);
      }
    }
  }
  this.render = function () {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    )
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }
}

 function Player(playerSheet) {
  this.playerState = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2
  }
  this.state = this.playerState.IDLE;

  this.xPos = 1*tileSize;
  this.yPos = 8*tileSize;

  this.isFacingRight = true;

  this.idleRight = new AnimationController(playerIdleRight);
  this.idleLeft = new AnimationController(playerIdleLeft);
  this.runningRight = new AnimationController(playerRunningRight);
  this.runningLeft = new AnimationController(playerRunningLeft);
  this.jumpingRight = new AnimationController(playerJumpingRight);
  this.jumpingLeft = new AnimationController(playerJumpingLeft)

  this.setAnimation = function (animationController) {
    // animationController.resetAnimation();
    return animationController;
  }

  this.currentAnimationController = this.idleRight;

  this.collider = new BoxCollider(24,64,this.xPos, this.yPos);

  this.jumpHeight = 15;
  this.jumpY = 0;
  this.t = 0;

  this.jump = function () {
    this.state = (this.state | this.playerState.JUMPING);
    if (this.isFacingRight) {
      this.currentAnimationController = this.setAnimation(this.jumpingRight);
    } else {
      this.currentAnimationController = this.setAnimation(this.jumpingLeft);
    }

    this.jumpY = ((this.t-this.jumpHeight)*(this.t+this.jumpHeight));

    this.t = this.t + 0.75;
    if (this.t > this.jumpHeight)
    {
      this.state = (this.state & ~this.playerState.JUMPING);
    }
  }

  this.speed = 0;
  this.maxSpeed = 8;
  this.acceleration = 0;
  this.friction = 0.25;

  this.move = function () {
    if ((this.state & this.playerState.RUNNING) == this.playerState.RUNNING)
    {
      this.speed += this.acceleration;
    }
    else if (this.acceleration != 0)
    {
      oldSpeed = this.speed
      if (this.speed < 0) {
        this.speed += Math.abs(this.acceleration) + this.friction;

      } else {
        this.speed -= Math.abs(this.acceleration) + this.friction;
      }
      if (Math.sign(oldSpeed) != Math.sign(this.speed))
      {
        this.speed = 0;
        this.acceleration = 0;
      }
    }
    if (this.speed >= this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed <= -(this.maxSpeed)) {
      this.speed = -(this.maxSpeed);
    }

    var xNew = Math.floor(this.xPos + this.speed);
    if (canMove(xNew + tileSize / 2,this.yPos + this.jumpY)) {
      this.xPos = xNew;
    }
  }

  this.render = function () {
    frameX = this.currentAnimationController.frameX;
    frameY = this.currentAnimationController.frameY;
    ctx.drawImage(
      playerSheet.sheet,
      frameX * playerSheet.playerWidth,
      frameY * playerSheet.playerHeight,
      playerSheet.playerWidth,
      playerSheet.playerHeight,
      this.xPos - scene.camera.xPos,
      this.yPos + this.jumpY - scene.camera.yPos,
      playerSheet.playerWidth,
      playerSheet.playerHeight
    );
  }

  this.update = function () {
    if (Key.isDown(Key.UP)) {
      if ((this.state & this.playerState.JUMPING) != this.playerState.JUMPING) {
        this.state |= this.playerState.JUMPING;
        this.t = -(this.jumpHeight);
      }
    }
    if (Key.isDown(Key.LEFT)) {
      this.isFacingRight = false;
      this.currentAnimationController = this.setAnimation(this.runningLeft);
      this.acceleration = -0.15;
      this.state |= this.playerState.RUNNING;
    }
    else if (Key.isDown(Key.RIGHT)) {
      this.isFacingRight = true;
      this.currentAnimationController = this.setAnimation(this.runningRight);
      this.acceleration = 0.15;
      this.state |= this.playerState.RUNNING;
    }
    else if ((this.state & this.playerState.JUMPING) != this.playerState.JUMPING) {
      this.state &= ~this.playerState.RUNNING;
      if (this.isFacingRight) {
        this.currentAnimationController = this.idleRight;
      } else {
        this.currentAnimationController = this.idleLeft;
      }
    }
    this.move();
    this.collider.x = this.xPos - scene.camera.xPos + tileSize/2 - this.collider.width/2;
    this.collider.y = this.yPos + this.jumpY;
    var colliding = this.collider.checkCollision();
    this.currentAnimationController.tick();
    this.currentAnimationController.updateFrames();

    if ((this.state & this.playerState.JUMPING) == this.playerState.JUMPING)
    {
      this.jump();
    }
  }
}

function Scene(name,desc,width,height,mapId,tileSheet) {
  this.sceneName = name;
  this.sceneDesc = desc;
  this.width = width;
  this.height = height;
  this.camera;
  this.colliders = [];
  this.tileMap = [];
  this.charMap = getMap(mapId);
  this.render = function () {
    for (var y = Math.floor(this.camera.yPos / tileSize); y < (this.camera.viewportHeight + this.camera.yPos) / tileSize; y++) {
      for (var x = Math.floor(this.camera.xPos / tileSize); x < (this.camera.viewportWidth + this.camera.xPos) / tileSize; x++) {
        var frame = 1;
        if (this.charMap[y][x] == 'a') {
          frame = 1;
        } else if (this.charMap[y][x] == 'g') {
          frame = 0;
        }
        ctx.drawImage(
          tileSheet.sheet,
          frame * tileSheet.tileWidth,
          0,
          tileSheet.tileWidth,
          tileSheet.tileHeight,
          (x * tileSheet.tileWidth) - this.camera.xPos,
          (y * tileSheet.tileHeight) - this.camera.yPos,
          tileSheet.tileWidth,
          tileSheet.tileHeight);
      }
    }
  }
}

function init() {
  //init canvas
  canvas = Canvas.canvas;
  Canvas.start();
  ctx = Canvas.getCanvasContext();

  //loadContent
  loadContent();

}

function loadContent() {
  new TileSheet(
    function(tileSheet)
    {
      scene = new Scene("Map1","Basic Map",40,20,1,tileSheet);
      for (var y = 0; y < scene.charMap.length; y++) {
        scene.tileMap.push([]);
        for (var x = 0; x < scene.charMap[y].length; x++) {
          if (scene.charMap[y][x] == 'a') {
            scene.tileMap[y][x] = new Tile(tileSheet,false,false,false,null,x * tileSize, y * tileSize);
            scene.tileMap[y][x].image.frameX = 0;
          }
          if (scene.charMap[y][x] == 'g') {
            scene.tileMap[y][x] = new Tile(tileSheet,true,false,false,null,x * tileSize, y * tileSize);
            scene.tileMap[y][x].image.frameX = 1;
          }
        }
      }
    })

  new PlayerSheet(
    function(playerSheet)
    {
      player = new Player(playerSheet);
      scene.camera = new Camera(player,15,7);
      scene.render();
      player.render();
      Canvas.setClipArea(scene.camera);
      Canvas.setCtxScale(scene.camera);
    })

  //createAnimation
  playerRunningRight = new Animation(0,9,4, true);
  playerRunningLeft = new Animation(1,9,4, true);
  playerIdleRight = new Animation(2,1,15, true);
  playerIdleLeft = new Animation(3,1,15, true);
  playerJumpingRight = new Animation(4,9,4,false);
  playerJumpingLeft = new Animation(5,9,4,false);
}

function render() {
  scene.render();
  player.render();
}

function update() {
  player.update();
  scene.camera.update();
}

function getMap(id) {
  switch (id) {
    case 1:
      return charMap1;
      break;
    default:

  }
}

function distanceXY(x0,y0,x1,y1) {
  var dx = x1 - x0;
  var dy = y1 - y0;
  return Math.sqrt(dx * dx + dy * dy);
}

function testIntersection(x,y,radius,tx,ty) {
  var distance = distanceXY(x,y,tx,ty);
  if (distance <= radius) {
    return true;
  } else {
    return false;
  }
}

function circleRectCollision(cX,cY,radius,rX,rY,width,height) {
  var colliding = false
  var x1 = rX - radius;
  var x2 = rX;
  var x3 = rX + width;
  var x4 = rX + width + radius;
  var y1 = rY - radius;
  var y2 = rY;
  var y3 = rY + height;
  var y4 = rY + height + radius;
  if (cX >= x1 && cY >= y1 && cX <= x4 && cY <= y4) {
    if (cX >= x1 && cY >= y1 && cX <= x2 && cY <= y2) {
      //Upper Left
      colliding = testIntersection(x2,y2,radius,cX,cY);
    } else if (cX >= x3 && cY >= y1 && cX <= x4 && cY <= y2) {
      //Upper Right
      colliding = testIntersection(x3,y2,radius,cX,cY);
    } else if (cX >= x1 && cY >= y3 && cX <= x2 && cY <= y4) {
      //Lower Left
      colliding = testIntersection(x2,y3,radius,cX,cY);
    } else if (cX >= x3 && cY >= y3 && cX <= x4 && cY <= y4) {
      //Lower Right
      colliding = testIntersection(x3,y3,radius,cX,cY);
    } else {
      //100% Certified Angus Beef (U Wot M8)
      colliding = true;
    }
  }
  console.log(colliding);
  return colliding;
}

function circleCircleCollision(x1,y1,x2,y2,r1,r2) {
  var distance = distanceXY(x1,y1,x2,y2);
  var radiusDistance = r1 + r2;
  var colliding = radiusDistance >= distance;
  return colliding;
}

function circlePointCollision(x1,y1,x2,y2,r) {
  var distance = distanceXY(x1,y1,x2,y2);
  var colliding = r >= distance;
  return colliding;
}

function rectRectCollision() {

}

function rectPointCollision(rx,ry,width,height,x,y) {
  if (x >= rx && y >= ry && x <= rx + width && y <= ry + height) {
    return true;
  } else {
    return false;
  }
}

function pointPointCollision(x1,y1,x2,y2) {
  if (x1 == x2 && y1 == y2) {
    return true;
  } else {
    return false;
  }
}

function canMove(x,y) {
  var tileX = Math.floor(x / tileSize);
  var tileY = Math.floor(y / tileSize);
  console.log(scene.tileMap[tileY][tileX].solid);
  if (scene.tileMap[tileY][tileX].solid) {
    return false;
  } else {
    return true;
  }
}
