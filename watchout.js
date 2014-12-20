var svg = d3.select('body').append('svg');

var numberOfAsteroids = 31;
var asteroidsRange = [];
var asteroidData;
var score = 0;
var highScore = 0;
var collisions = 0;
var collisionTimer, moveTimer;
var collided = false;

for (var i = 0; i < numberOfAsteroids; i++) {
  asteroidsRange[i] = i;
}


var randomX = function () {
  return Math.random() * 600;
}
var randomY = function () {
  return Math.random() * 500;
}

var newPositions = function() {
  return asteroidsRange.map(function(i) {
    return {
      id: i,
      x: randomX(),
      y: randomY(),
      rotation: 0
    };
  });
}

asteroidData = newPositions();

var asteroids = svg.selectAll('image')
  .data(asteroidData)
  .enter()
  .append('image')
  .attr('xlink:href', 'shuriken.gif')
  .attr('x', function(d) { return d.x })
  .attr('y', function(d) { return d.y })
  .attr('class', 'asteroid')
  .attr('height', 20)
  .attr('width', 20);

var move = function () {
  asteroids.transition()
    .attr('x', function(d) {
      d.x = randomX();
      return d.x;
    })
    .attr('y', function(d) {
      d.y = randomY();
      return d.y;
    })
    .duration(1000);
};
var playerData = [{
  x: 300,
  y: 250
}];

var player = svg.append('circle')
  .data(playerData)
  .attr('class', 'player')
  .attr('r', 10)
  .attr('cx', function(d) { return d.x })
  .attr('cy', function(d) { return d.y })

var collisionCheck = function(x, y) {
  var threshold = 20;
  var p = player.data()[0];
  var distance = Math.sqrt ( Math.pow((p.x - x), 2) + Math.pow((p.y - y), 2) );
  if (distance <= threshold) {
    collided = true;
    setTimeout(function() {
      collided = false;
    }, 900);

    score = 0;
    collisions++;

    d3.select('.collisions span').text(collisions);
  }
}


var drag = d3.behavior.drag()
  .on("drag", function(d,i) {
    player.attr('cx', function(d) {
      d.x = d.x + d3.event.dx
      return d.x;
    })
      .attr('cy', function(d) {
        d.y = d.y + d3.event.dy
        return d.y;
      })
  })

var updateCurrentScore = function() {
  score++;
  if (score > highScore) {
    highScore = score;
  }
  d3.select('.current span').text(score);
  d3.select('.high span').text(highScore);

}
scoreTimer = setInterval(updateCurrentScore, 5);

var collisionStart = function() {
  if (!collided) {
    asteroids.each(function() {
      var singleAsteroid = d3.select(this)
      collisionCheck(singleAsteroid.attr('x'), singleAsteroid.attr('y'));
    })
  }
}

var spinShuriken = function() {
  asteroids.each(function() {
    d3.select(this).attr('transform', function(d) {
      d.rotation = d.rotation + 2;
      return 'rotate(' +  d.rotation + ' '
        + (d3.select(this).attr('x') - 10) + ' '
        + (d3.select(this).attr('y') - 10) + ')'
    })
  })
}

// setInterval(spinShuriken, 1);

collisionTimer = setInterval(collisionStart, 5);

player.call(drag)

moveTimer = setInterval(move, 1000);

