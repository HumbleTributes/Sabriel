/*jshint -W117 */

'use strict';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

new WOW().init();

(function() {

  // ----------------------------------------
  // Charter Mark
  // ----------------------------------------

  function CharterMark() {
    this.particle = false;

    this.radius = random(5, 10);
    this.colour = random(colours);

    this.image = new Image();
    this.image.src = '/images/charter-mark-' + getRandomInt(1, 4) + '.svg';

    this.x = random(charter.width);
    this.y = random(charter.height, charter.height * 2);

    this.vx = 0;
    this.vy = -random(1, 10) / 5;
  }

  CharterMark.prototype = {
    visible: function() {
      if (this.y < -30 || this.radius < 0) {
        return true;
      } else {
        return false;
      }
    },
    update: function() {
      this.vx += (random(100) - 50) / 1000;
      this.vy -= random(1, 20) / 10000;

      this.radius -= random(5, 10) / 404;

      this.x += this.vx;
      this.y += this.vy;

      if (this.visible()) {
        this.radius = random(5, 10);

        this.x = random(charter.width);
        this.y = random(charter.height, charter.height * 2);

        this.vx = 0;
        this.vy = -random(1, 10) / 5;
      }
    },
    draw: function() {
      if (this.particle) {
        charter.beginPath();
        charter.arc(this.x, this.y, this.radius, 0, TWO_PI, false);
        charter.closePath();
        charter.strokeStyle = 'rgba(0, 0, 0, 0)';
        charter.fillStyle = this.pattern;
        charter.fillStyle = this.colour;
        charter.fill();
        charter.stroke();
      } else {
        charter.drawImage(this.image, this.x, this.y, this.radius * 4, this.radius * 4);
      }
    }
  };

  // ----------------------------------------
  // Begin
  // ----------------------------------------

  var max = 100;
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