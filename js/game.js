/**
  * game.js
  * 
  * Contains all game related JS code. Integrates with pixi.js lib <./pixi.js>
  *
  * __constructor
  * @param object config Object containing game params
  **/
var Game = function (config) {
    this.config = config;
    this.assets = {};

    if( this._ready() ) {
        this._init();
    }
};

/**
  * _init
  * Calls all necessary methods and builds the game
  *
  * @return null
  **/
Game.prototype._init = function () {
    
    // Set up scene
    this.stage = this._setStage();
    this.renderer = this._renderer();

    // Start building game
    this._mountRenderer(this.renderer.view);
    this._loadAssets();
    this._assignInteractions();
};

/**
  * _animate
  * Method called during frame render - allows for in-object scope access to vars
  *
  * @return null
  **/
Game.prototype._animate = function () {
    this.assets.face.position.x += 10;
    if( this.assets.face.position.x > this.config.iWidth )
        this.assets.face.position.x = -30;
};

Game.prototype._loadAssets = function() {
    // Load assets
    var texture = PIXI.Texture.fromImage("imgs/face.png");
    this.assets.face = new PIXI.Sprite(texture);
    this.assets.face.anchor.x = 0.5;
    this.assets.face.anchor.y = 0.5;
    this.assets.face.position.x = 200;
    this.assets.face.position.y = 150;
    this.assets.face.setInteractive(true);

    this.stage.addChild(this.assets.face);
}

/**
  * _mountRenderer
  * Assign the renderer to the DOM
  **/
Game.prototype._assignInteractions = function() {
    this.assets.face.click = function(mouseData){
       window.alert('Quick arent ye?!');
    }
}

/**
  * _mountRenderer
  * Assign the renderer to the DOM
  **/
Game.prototype._mountRenderer = function (view) {
    this.config.oGameObj.appendChild(view);
},

/**
  * _setStage
  * Calls pixi.js Stage method
  **/
Game.prototype._setStage = function () {
    var stage = new PIXI.Stage(this.config.bg, true);
    return stage;
},

/**
  * _renderer
  * Calls pixi.js autoDetectRenderer method
  **/
Game.prototype._renderer = function () {
    var renderer = PIXI.autoDetectRenderer(this.config.iWidth, this.config.iHeight);
    return renderer;
}

/**
  * _ready
  * Perform all checks to see if game is ready to be loaded.
  *
  * @return null
  **/
Game.prototype._ready = function () {
    var bReady = true;
    if ( !this.config.oGameObj ) {
        this._log( 'oGameObj does not exist in DOM' );
        bReady = false;
    }
    return bReady;
};

/**
  * _log
  * Simple layer that allows possible log management down the line.
  *
  * @return null
  **/
Game.prototype._log = function (s) {
    console.log( s );
};