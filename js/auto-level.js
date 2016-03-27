document.addEventListener('DOMContentLoaded', function(){

  /* Automatic color leveling for HTML images
   * by AJ Farkas 2014
   * http://www.afarkas.com
   * Github: ajfarkas
   * 
   * Source: https://raw.githubusercontent.com/ajfarkas/auto-color-level/master/colorLevels.js
   *
   * Auto Color Levels for HTML Images by AJ Farkas is licensed under
   * The MIT License.
   */
  var colorLevel = function(image){  

    console.log(image);
    image.insertAdjacentHTML('afterend', '<canvas></canvas>');
    canvas = image.nextElementSibling;
    // image.onload = function(){}

      var ctx = canvas.getContext('2d');

      canvas.width = image.width;
      canvas.height = image.height;

      console.log(canvas.height, canvas.width);

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var pixelNum = imgData.data.length;

      // INITIALIZE BRIGHTNESS FOR LEVELS
      var redMax   = 0; 
      var redMin   = 255;
      var greenMax = 0; 
      var greenMin = 255;
      var blueMax  = 0; 
      var blueMin  = 255;

      for ( var i = 0; i < pixelNum; i += 4 ){
        //SET MIN AND MAX VALUES FOR EACH COLOR
        if (imgData.data[i] > redMax) { redMax = imgData.data[i] };
        if (imgData.data[i] < redMin) { redMin = imgData.data[i] };
        if (imgData.data[i+1] > greenMax) { greenMax = imgData.data[i+1] };
        if (imgData.data[i+1] < greenMin) { greenMin = imgData.data[i+1] };
        if (imgData.data[i+2] > blueMax) { blueMax = imgData.data[i+2] };
        if (imgData.data[i+2] < blueMin) { blueMin = imgData.data[i+2] };
      }

      for(var i = 0; i < pixelNum; i += 4){
        // MAP COLORS TO 0 - 255 RANGE
        imgData.data[i] = (imgData.data[i] - redMin) * (255 / (redMax - redMin));
        imgData.data[i+1] = (imgData.data[i+1] - greenMin) * (255 / (greenMax - greenMin));
        imgData.data[i+2] = (imgData.data[i+2] - blueMin) * (255 / (blueMax - blueMin));
      }
      ctx.putImageData(imgData, 0, 0);
      image.parentNode.removeChild(image);

  }; 

  // FIND ALL IMAGES WITH A .level-correction CLASS AND APPLY THE LEVEL NORMALIZATION ALGORITHM
  Array.prototype.slice.apply(document.querySelectorAll('img.level-correction')).forEach(function(img){
    colorLevel(img);
  });

});
