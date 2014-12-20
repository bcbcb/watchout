var svg = d3.select('body').append('svg');

var numberOfAsteroids = 5;
var asteroidsRange = [];
var asteroidData;

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
      y: randomY()
    };
  });
}

asteroidData = newPositions();

var asteroids = svg.selectAll('circle')
  .data(asteroidData)
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d.x })
  .attr('cy', function(d) { return d.y })
  .attr('class', 'asteroid')
  .attr('r', 10);

var move = function () {
  asteroids.transition()
    .attr('cx', function(d) {
      d.x = randomX();
      return d.x;
    })
    .attr('cy', function(d) {
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

var collisionCheck = function(a) {
  var threshold = 20;
  var p = player.data()[0];
  var distance = Math.sqrt ( Math.pow((p.x - a.x), 2) + Math.pow((p.y - a.y), 2) );
   console.log(a.id)
  if (distance <= threshold) {
    console.log('hit me!');
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

setInterval( function() {
  for (var i = 0; i < asteroids.data().length; i++) {
    collisionCheck(asteroids.data()[i]);
  }
}, 1);

player.call(drag)

setInterval(move, 1000);
