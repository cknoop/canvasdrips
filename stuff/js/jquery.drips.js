(function($) {

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



    $.fn.drips = function(options) {
        return this.each(function() {
            //
            // var canvas = $('<canvas/>').appendTo($(this).parent())[0],
            // canvas2 = $('<canvas/>')[0],
            // ctx2 = canvas2.getContext('2d'),
            // ctx = canvas.getContext('2d');
            //
            // if (this.tagName.toLowerCase() === 'img') {
                 this.onload = function() {
            //         var width = this.naturalWidth,
            //         height = this.naturalHeight,
            //         that = this;
            //
            //         canvas.width = canvas2.width = width;
            //         canvas.height = canvas2.height = height;
            //
                     $(this).hide();
            //
            //         var ratio = 1;
            //
            //         ctx2.drawImage(that, 0, 0, width*ratio, width*ratio);
            //
            //         /// draw the shape we want to use for clipping
            //         ctx.drawImage(imgClip, 0, 0);
            //
            //         /// change composite mode to use that shape
            //         ctx.globalCompositeOperation = 'source-in';
            //
            //         /// draw the image to be clipped
            //         ctx.drawImage(img, 0, 0);
            //
            //
            //     };
             }







            var imgSrc = "ckLogoMaskedSmall.png";
            var img = new Image;

            img.addEventListener("load", function() {

                var canvas=document.getElementById("myCanvas1");
                var ctx=canvas.getContext("2d");



                // save the context state
                ctx.save();



                var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);



                var pixelArray = imageData.data;
                var length = pixelArray.length / 4; // 4 components - red, green, blue and alpha

                for (var i = 0; i < length; i++) {
                    var index = 4 * i;

                    var r = pixelArray[index];
                    var g = pixelArray[++index];
                    var b = pixelArray[++index];
                    var a = pixelArray[++index];

                    if (r === 255 && g === 0 && b === 0 & a === 255) { // pixel is red
                        pixelArray[--index] = 255; // blue is set to 100%
                        pixelArray[--index] = 255; // green is set to 100%
                        // resulting color is white
                    }
                }

                // ctx.putImageData(imageData, 0, 0);


                // draw the overlay
                // ctx.drawImage(img,10,50);



                // change composite mode to source-in
                // any new drawing will only overwrite existing pixels
                ctx.globalCompositeOperation="destination-over";

                // draw a purple rectangle the size of the canvas
                // Only the overlay will become purple
                ctx.fillStyle='lime';
                // ctx.fillRect(0,0,canvas.width,canvas.height);

                // change the composite mode to destination-atop
                // any new drawing will not overwrite any existing pixels
                ctx.globalCompositeOperation="destination-atop";

                // draw the full logo
                // This will NOT overwrite any existing purple overlay pixels
                // ctx.drawImage(logo,150,35);

                // draw the truck
                // This will NOT replace any existing pixels
                // The purple overlay will not be overwritten
                // The blue logo will not be overwritten
                //ctx.drawImage(img,0,0);

                // restore the context to it's original state
                ctx.restore();

            });



            img.src = imgSrc;








            // var canvas=document.getElementById("myCanvas1");
            // var ctx=canvas.getContext("2d");
            //
            // var truck,logo,overlay;
            // var newColor="blue";
            //
            // var imageURLs=[];
            // var imagesOK=0;
            // var imgs=[];
            // imageURLs.push("https://dl.dropboxusercontent.com/u/139992952/stackoverflow/boxTruck.png");
            // imageURLs.push("https://dl.dropboxusercontent.com/u/139992952/stackoverflow/TVlogoSmall.png");
            // imageURLs.push("img/ck.png");
            // loadAllImages();
            //
            // function loadAllImages(){
            //     for (var i = 0; i < imageURLs.length; i++) {
            //         var img = new Image();
            //         imgs.push(img);
            //         img.onload = function(){ imagesOK++; imagesAllLoaded(); };
            //         img.src = imageURLs[i];
            //     }
            // }
            //
            // var imagesAllLoaded = function() {
            //     if (imagesOK==imageURLs.length ) {
            //         // all images are fully loaded an ready to use
            //         truck=imgs[0];
            //         logo=imgs[1];
            //         overlay=imgs[2];
            //         start();
            //     }
            // };
            //
            //
            // function start(){
            //
            //     // save the context state
            //     ctx.save();
            //
            //     // draw the overlay
            //     ctx.drawImage(overlay,150,35);
            //
            //     // change composite mode to source-in
            //     // any new drawing will only overwrite existing pixels
            //     ctx.globalCompositeOperation="source-in";
            //
            //     // draw a purple rectangle the size of the canvas
            //     // Only the overlay will become purple
            //     ctx.fillStyle=newColor;
            //     ctx.fillRect(0,0,canvas.width,canvas.height);
            //
            //     // change the composite mode to destination-atop
            //     // any new drawing will not overwrite any existing pixels
            //     ctx.globalCompositeOperation="destination-atop";
            //
            //     // draw the full logo
            //     // This will NOT overwrite any existing purple overlay pixels
            //     ctx.drawImage(logo,150,35);
            //
            //     // draw the truck
            //     // This will NOT replace any existing pixels
            //     // The purple overlay will not be overwritten
            //     // The blue logo will not be overwritten
            //     //ctx.drawImage(truck,0,0);
            //
            //     // restore the context to it's original state
            //     ctx.restore();
            //
            // }



        });
    };
})(jQuery);
