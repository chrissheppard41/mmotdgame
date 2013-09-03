/**
  * game.js
  * 
  * Contains all game related JS code. Integrates with pixi.js lib <./pixi.js>
  *
  * __constructor
  * @param object config Object containing game params
  **/
var Game = Class({
    initialize: function(config) {
      
      // Dynamic vars
      this.config            = config;
      this.assets            = {};

      // Static vars
      this.config.gridHeight = 20;
      this.config.gridWidth  = 20;

      if( this._ready() ) {
          // Set up scene
          this.stage = this._setStage();
          this.renderer = this._renderer();

          // Start building game
          this._mountRenderer(this.renderer.view);
          this._loadAssets();
      }
    },

    /**
      * _animate
      * Method called during frame render - allows for in-object scope access to vars
      *
      * @return null
      **/
    _animate:function () {
        
    },

    /**
      * _loadAssets
      * Fetch / Create actors and position them
      **/
    _loadAssets:function() {
        this._loadGrid();

        this._testDragableHead();
    },

    _testDragableHead:function() {
        var texture      = PIXI.Texture.fromImage("./imgs/face.png"),
            face         = new PIXI.Sprite(texture);
        face.interactive = true;
        face.buttonMode  = true;
        face.anchor.x    = 0.5;
        face.anchor.y    = 0.5;

        // INTERACTIONS
        face.mousedown = function(data) {
            this.data = data;
            this.alpha = 0.5;
            this.dragging = true;
            window.document.getElementById('score').innerHTML = 'move yer hole';
        };
        face.mouseup   = face.mouseupoutside = function(data) {
            this.alpha = 1
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
        };
        face.mousemove = function(data)
        {
            if(this.dragging)
            {
                // need to get parent coords..
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
            }
        }

        // START POS
        face.position.x    = 20;
        face.position.y    = 20;

        this.stage.addChild(face);
    },

    /**
      * _loadGrid
      * Build grid system
      **/
    _loadGrid:function() {

        // COLLECT GRID DATA
        var grid        = PIXI.Texture.fromImage("./imgs/grid1.png"),
            grid_hover  = PIXI.Texture.fromImage("./imgs/grid2.png"),
            grid_height = Math.floor(this.config.iHeight / this.config.gridHeight),
            grid_width = Math.floor(this.config.iWidth / this.config.gridWidth),
            grid_count = (grid_height * grid_width);

        // CREATE GRID
        var ypos = 1;
        for (var i=0; i < grid_count; i++) {
            var lo = i%grid_width,
                xpos = (lo+1);
            if (i != 0 && (lo == 0))
                ypos++;
            var sq = new PIXI.Sprite(grid);
            sq.anchor.x = 1;
            sq.anchor.y = 1;
            sq.position.x = xpos*this.config.gridWidth;
            sq.position.y = ypos*this.config.gridHeight;

            // GRID INTERACTIONS
            sq.interactive = true;
            sq.mouseover = function(data) {
                this.isOver = true;
                if (this.isdown) return;
                this.setTexture(grid_hover);
            };
            sq.mouseout = function(data) {
                this.isOver = false;
                if (this.isdown) return;
                this.setTexture(grid);
            };
            sq.click = function(data) {
                this.alpha = 0.3;
            };

            this.stage.addChild(sq);
        }
    },

    /**
      * _mountRenderer
      * Assign the renderer to the DOM
      **/
    _mountRenderer:function (view) {
        this.config.oGameObj.appendChild(view);
    },

    /**
      * _setStage
      * Calls pixi.js Stage method
      **/
    _setStage:function () {
        var stage = new PIXI.Stage(this.config.bg, true);
        return stage;
    },

    /**
      * _renderer
      * Calls pixi.js autoDetectRenderer method
      **/
    _renderer:function () {
        var renderer = PIXI.autoDetectRenderer(this.config.iWidth, this.config.iHeight, null);
        return renderer;
    },

    /**
      * _ready
      * Perform all checks to see if game is ready to be loaded.
      *
      * @return null
      **/
    _ready:function () {
        var bReady = true;
        if ( !this.config.oGameObj ) {
            this._log( 'oGameObj does not exist in DOM' );
            bReady = false;
        }
        return bReady;
    },

    /**
      * _log
      * Simple layer that allows possible log management down the line.
      *
      * @return null
      **/
    _log:function (s) {
        console.log( s );
    }
});