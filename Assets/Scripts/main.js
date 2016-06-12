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
var tileMap1 = [
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

function Tile() {
  this.xPos;
  this.yPos;
  this.width = tileSheet.tileWidth;
  this.height = tileSheet.tileHeight;
  this.image = {
    frameX: 0,
    frameY: 0
  }
  this.collidable;
  this.interactable;
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
  this.xOffset = 0;
  this.yOffset = 5;
  this.viewportWidth = width;
  this.viewportHeight = height;
  this.xPos = this.xOffset * tileSize;
  this.xPos2 = this.xOffset * tileSize + this.viewportWidth * tileSize;
  this.update = function () {
    this.xPos = this.xOffset * tileSize;
    this.xPos2 = this.xOffset * tileSize + this.viewportWidth * tileSize;
    if (focus.xPos > this.xPos2 - this.viewportWidth - 7 * tileSize) {
      this.xOffset += 1;
    } else if (focus.xPos < this.xPos + this.viewportWidth - 7 * tileSize){
      this.xOffset -= 1;
    }
  }
}

 function Player(playerSheet) {
  this.playerState = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING: 2
  }
  this.state = this.playerState.IDLE;

  this.xPos = 4*tileSize;
  this.yPos = 3*tileSize;

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
    this.t = this.t + 0.75
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

    this.xPos += this.speed;
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
      this.yPos + this.jumpY,
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
      // scene.camera.xOffset--;
    }
    else if (Key.isDown(Key.RIGHT)) {
      this.isFacingRight = true;
      this.currentAnimationController = this.setAnimation(this.runningRight);
      this.acceleration = 0.15;
      this.state |= this.playerState.RUNNING;
      // scene.camera.xOffset++;
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
  this.charMap;
  this.render = function () {
    this.charMap = getMap(mapId);
    var dy = 0;
    for (var y = this.camera.yOffset; y < this.camera.viewportHeight + this.camera.yOffset; y++) {
      dy++;
      var dx = 0;
      for (var x = this.camera.xOffset; x < this.camera.viewportWidth + this.camera.xOffset; x++) {
        dx++;
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
          dx * tileSheet.tileWidth,
          dy * tileSheet.tileHeight,
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
    })

  new PlayerSheet(
    function(playerSheet)
    {
      player = new Player(playerSheet);
      scene.camera = new Camera(player,15,7);
      scene.render();
      player.render();
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
      return tileMap1;
      break;
    default:

  }
}
