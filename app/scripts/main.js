/*jshint -W117 */

'use strict';

new WOW().init();

(function() {

  // ----------------------------------------
  // Charter Mark
  // ----------------------------------------

  function CharterMark() {
    this.radius = random(1, 5);
    this.colour = random(colours);

    this.x = random(charter.width);
    this.y = random(charter.height, charter.height * 2);

    this.vx = 0;
    this.vy = -random( 1, 10 ) / 5;
  }

  CharterMark.prototype = {
    visible: function() {
      if (this.y < 0) {
        return true;
      } else {
        return false;
      }
    },
    update: function() {
      this.vx += (random(100) - 50) / 1000;
      this.vy -= random(1, 20) / 10000;

      this.x += this.vx;
      this.y += this.vy;

      if (this.visible()) {
        this.x = random(charter.width);
        this.y = random(charter.height, charter.height * 2);

        this.vx = 0;
        this.vy = -random( 1, 10 ) / 5;
      }
    },
    draw: function() {
      charter.beginPath();
      charter.arc(this.x, this.y, this.radius, 0, TWO_PI, false);
      charter.closePath();
      charter.strokeStyle = this.colour;
      charter.fillStyle = this.colour;
      charter.fill();
      return charter.stroke();
    }
  };

  // ----------------------------------------
  // Begin
  // ----------------------------------------

  var max = 50;
  var colours = ['#AC4133', '#D36E06', '#F9E224'];

  var marks = [];

  var charter = Sketch.create({
    container: document.getElementById('title-canvas')
  });

  charter.globalComposition = 'lighter';

  charter.setup = function() {
    var i = 0;

    while (max > i) {
      marks.push(new CharterMark());
      i++;
    }
  };

  charter.update = function() {
    var i, results;
    i = marks.length;
    results = [];
    while (i--) {
      results.push(marks[i].update());
    }
    return results;
  };

  charter.draw = function() {
    var i, results;
    i = marks.length;
    results = [];
    while (i--) {
      results.push(marks[i].draw());
    }
    return results;
  };

}());

(function() {
  var max = 300;
  var stars = [];
  var canvas = document.getElementById('ninth-precinct-canvas');


}());
