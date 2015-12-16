
$(function() {


    (function() {
        'use strict';


        var width = 310;
        var height = 0;
        var globalID;
        var minSize = 2;
        var maxSize = 14;
        var drips = [];
        var minWait = 1000;
        var lastTime = +new Date();


        var canvas1 = document.getElementById('myCanvas1'),
        ctx = canvas1.getContext('2d'),
        canvas2 = document.getElementById('myCanvas2'),
        ctx2 = canvas2.getContext('2d'),
        height = 0;

        // resize the canvas to fill browser window dynamically
        // window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
            canvas1.width = 310 //window.innerWidth;
            height = window.innerHeight;
            canvas1.height = height;


            canvas2.width = 310 //window.innerWidth;
            height = window.innerHeight;
            canvas2.height = height;

            /**
            * Your drawings need to be inside this function otherwise they will be reset when
            * you resize the browser window and the canvas goes will be cleared.
            */
            drawStuff();
        }
        resizeCanvas();

        function drawStuff() {
            // do your drawing stuff here

            ctx2.beginPath();
            ctx2.moveTo(0, 0)
            ctx2.lineTo(0, height);
            ctx2.lineTo(310, height);
            ctx2.lineTo(310, 0);
            ctx2.fillStyle = "rgba(0,0,0, 0)"
            ctx2.fill();
            var imageObj = new Image();

            var drawPattern = function() {
                var pattern = ctx2.createPattern(imageObj, "no-repeat");
                ctx2.fillStyle = pattern;
                ctx2.fill();
            }
            imageObj.onload = drawPattern;
            imageObj.src = 'img/ckLogoMaskedSmall.png';

            animate();


        }



        function Drip(x, y, size, opacity, color, speed, end, count, easingVal) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.opacity = opacity;
            this.color = color;
            this.speed = speed;
            this.end = end;
            this.count = count;
            this.easingVal = easingVal;
        }

        Drip.prototype.update = function() {
            if (this.y < this.end) {
                //this.y += this.speed - 0.1;   // works well without easing

                // this.easingValue = easeOutSine(this.count, this.y, this.end, 2000);
                this.easingValue = easeOutSine(this.count, 0, this.end, 500); //this.speed
                this.y = this.easingValue;
                this.count++;
            } else {
                this.y = this.y;
                // decrease opacity
                /*
                if (drips.length = 5) {
                this.opacity =  this.opacity  - 0.01;
                this.opacity = this.opacity.toFixed(2);
                this.opacity = parseFloat(this.opacity);
                if(this.opacity <= 0) {
                drips.shift();
            }
        }
        */
    }
};


Drip.prototype.render = function() {
    ctx.beginPath();
    ctx.lineWidth = this.size;
    ctx.lineCap = "round";
    ctx.moveTo(this.x, -10);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.stroke();
};

//draw the screen
function draw() {
    if (+new Date() > lastTime + minWait) {
        lastTime = +new Date();
        var x = getRandomInt(-15, width + 15),
        y = -10,
        size = getRandomInt(minSize, maxSize),
        opacity = parseFloat(getRandom(0.2, 1).toFixed(2)),
        //color = 'white',
        color = '#D40100',
        speed = getRandomInt(200, 2000),
        end = getRandomInt(50, height + 50),
        count = 1,
        easingVal = 0;

        // opacity = 0, remove
        if (drips.length < 50) {
            //drips.shift();
            drips.push(new Drip(x, y, size, opacity, color, speed, end, count, easingVal));
        } else {
            cancelAnimationFrame(globalID);
        }
    }
    drips.forEach(function(e) {
        e.update(e);
        e.render();
    });

};



// @return [float] a random number between min and max
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// @return [integer] a random int between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function animate() {
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    globalID = requestAnimationFrame(animate);
    draw();
}

// Provides requestAnimationFrame in a cross browser way.
// http://paulirish.com/
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
        window.webkitRequepstAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
}

//var farbe ='rgb('+(Math.floor(Math.random()*122))+','+(Math.floor(Math.random()*1222))+','+(Math.floor(Math.random()*122))+')';


})();

});
