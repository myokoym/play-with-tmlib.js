var CIRCLE_RADIUS = 30;

var Ball = tm.createClass({
    superClass: tm.app.CanvasElement,

    init: function(color) {
        this.superInit();

        this.color = color;
        this.angle = tm.util.Random.randint(0, 360);
        this.v = tm.geom.Vector2(0, 0);
        this.v.x = Math.cos(this.angle * Math.PI / 180);
        this.v.y = Math.sin(this.angle * Math.PI / 180);
        this.speed = 8;
    },

    update: function(app) {
        this.x += this.v.x * this.speed;
        this.y += this.v.y * this.speed;

        this.position.add(this.v);

        if (this.x < 0) {
            this.x = 0;
            this.v.x *= -1;
            this.speed -= 1;
        } else if (this.x > app.canvas.width) {
            this.x = app.canvas.width;
            this.v.x *= -1;
            this.speed -= 1;
        }
        if (this.y < 0) {
            this.y = 0;
            this.v.y *= -1;
            this.speed -= 1;
        } else if (this.y > app.canvas.height) {
            this.y = app.canvas.height;
            this.v.y *= -1;
            this.speed -= 1;
        }

        if (this.speed <= 0) {
            this.remove();
        }
    },

    draw: function(c) {
        c.globalCompositeOperation = "lighter";
        c.fillStyle = this.color;
        c.fillCircle(0, 0, CIRCLE_RADIUS);
    },
});

window.onload = function() {
    var app = tm.app.CanvasApp("#world");
    app.resizeWindow();
    app.fitWindow();
    app.enableStats();

    app.currentScene.update = function(app) {
        if (app.pointing.getPointingStart() == true) {
            var c = Ball(
                "hsla({0}, 75%, 50%, 0.75)".format(Math.rand(0, 360))
            );
            c.x = app.pointing.x;
            c.y = app.pointing.y;
            this.addChild(c);
        }
    };

    app.run();
};
