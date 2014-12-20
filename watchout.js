var svg = d3.select('body').append('svg');

var numberOfAsteroids = 2;
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
  .attr('r', 10);

var move = function () {

}
