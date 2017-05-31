app.controller('mainController', function($scope, $http, factory, $state) {
  $scope.locations = [];
  $scope.distances = [];
  $scope.combined = [];

  // This happens instantly when the page loads
  navigator.geolocation.getCurrentPosition(function(position) {
     $scope.pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    // Getting my current location
    $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+$scope.pos.lat+","+$scope.pos.lng)
    .then(function(response) {
      console.log("I am now in:");
      console.log(response.data.results[0].formatted_address);
      $scope.locations.push(response.data.results[0].formatted_address);
    }),
    function errorCallback(response) {
      console.log(response.data);
    }
  });

  // auxiliary function: finds index of minimum element (propert = dist) AND minimum element in a given array
  function minimum(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0].dist;
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i].dist < min) {
            minIndex = i;
            min = arr[i].dist;
        }
    }

    return {minIndex: minIndex, min: min};
}

  var handleOneLocation = function() {
    console.log("################################");
    console.log("****** BEST ROUTE ******");
    $scope.shortestRoute = $scope.locations[0] + " --> " + $scope.locations[1];
    console.log($scope.shortestRoute);
    console.log("Total travel distance is: ", $scope.distances[0].text);
    console.log("################################");
  }

  var handleTwoLocations = function() {
    console.log("################################");
    console.log("****** BEST ROUTE ******");
    var routes = [{dist: $scope.distances[0].value + $scope.distances[2].value,
                  route: $scope.locations[0] + " --> " + $scope.locations[1] + "\n" + $scope.locations[1] + " --> " + $scope.locations[2]},
                  {dist: $scope.distances[1].value + $scope.distances[2].value,
                  route: $scope.locations[0] + " --> " + $scope.locations[2] + "\n" + $scope.locations[2] + " --> " + $scope.locations[1]}];
    var minIndex = minimum(routes).minIndex;
    var min = minimum(routes).min;
    $scope.shortestRoute = routes[minIndex];
    console.log($scope.shortestRoute.route);
    console.log("Total travel distance is: ", $scope.shortestRoute.dist/1000 + "km");
    console.log("################################");
  }

  var handleThreeLocations = function() {
    console.log("################################");
    console.log("****** BEST ROUTE ******");
    var routes = [{dist: $scope.distances[0].value + $scope.distances[3].value + $scope.distances[5].value,
                  route: $scope.locations[0] + " --> " + $scope.locations[1] + "\n" + $scope.locations[1] + " --> " + $scope.locations[2] + "\n" + $scope.locations[2] + " --> " + $scope.locations[3]},
                  {dist: $scope.distances[0].value + $scope.distances[4].value + $scope.distances[5].value,
                  route: $scope.locations[0] + " --> " + $scope.locations[1] + "\n" + $scope.locations[1] + " --> " + $scope.locations[3] + "\n" + $scope.locations[3] + " --> " + $scope.locations[2]},
                  {dist: $scope.distances[1].value + $scope.distances[3].value + $scope.distances[4].value,
                  route: $scope.locations[0] + " --> " + $scope.locations[2] + "\n" + $scope.locations[2] + " --> " + $scope.locations[1] + "\n" + $scope.locations[1] + " --> " + $scope.locations[3]},
                  {dist: $scope.distances[1].value + $scope.distances[5].value + $scope.distances[4].value,
                  route: $scope.locations[0] + " --> " + $scope.locations[2] + "\n" + $scope.locations[2] + " --> " + $scope.locations[3] + "\n" + $scope.locations[3] + " --> " + $scope.locations[1]},
                  {dist: $scope.distances[2].value + $scope.distances[4].value + $scope.distances[3].value,
                  route: $scope.locations[0] + " --> " + $scope.locations[3] + "\n" + $scope.locations[3] + " --> " + $scope.locations[1] + "\n" + $scope.locations[1] + " --> " + $scope.locations[2]},
                  {dist: $scope.distances[2].value + $scope.distances[5].value + $scope.distances[3].value,
                  route: $scope.locations[0] + " --> " + $scope.locations[3] + "\n" + $scope.locations[3] + " --> " + $scope.locations[2] + "\n" + $scope.locations[2] + " --> " + $scope.locations[1]}];
    var minIndex = minimum(routes).minIndex;
    var min = minimum(routes).min;
    $scope.shortestRoute = routes[minIndex];
    console.log($scope.shortestRoute.route);
    console.log("Total travel distance is: ", $scope.shortestRoute.dist/1000 + "km");
    console.log("################################");
  }

  var handleFourLocations = function() {
    console.log("################################");
    console.log("################################");
  }

  var handleFiveLocations = function() {
    console.log("################################");
    console.log("################################");
  }

  $scope.doBranchMagic = function() {

    // pushing locations that the user has entered
    if (typeof($scope.favDest) !== 'undefined') {
      $scope.locations.push($scope.favDest);
    }
    if (typeof($scope.secondDest) !== 'undefined') {
      $scope.locations.push($scope.secondDest);
    }
    if (typeof($scope.thirdDest) !== 'undefined') {
      $scope.locations.push($scope.thirdDest);
    }
    if (typeof($scope.fourthDest) !== 'undefined') {
      $scope.locations.push($scope.fourthDest);
    }
    if (typeof($scope.fifthDest) !== 'undefined') {
      $scope.locations.push($scope.fifthDest);
    }
    console.log($scope.locations);
    $http.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+$scope.locations[0]+"|"+$scope.locations[1]+"|"+$scope.locations[2]+"|"+$scope.locations[3]+"|"+$scope.locations[4]+"|"+$scope.locations[5]+"&destinations="+
    $scope.locations[0]+"|"+$scope.locations[1]+"|"+$scope.locations[2]+"|"
    +$scope.locations[3]+"|"+$scope.locations[4]+"|"+$scope.locations[5]+"&key=AIzaSyDTEUMGmlh_LdoOiHvOTgPhfmWobmyW3F4")
      .then(function(response) {
        if (response.data.rows[0].elements[0].status === "NOT_FOUND") { // NOTE: bad item that doesn't need to be counted
          $scope.branches.splice(index, 1);
          console.log("not found");
        } else {
          console.log(response.data);
          for (var i = 0; i < $scope.locations.length - 1; i++) {
            for (var j = i + 1; j <$scope.locations.length; j++) {
              var distance = response.data.rows[i].elements[j].distance;
              var key = i.toString() + j.toString();
              var obj = {};
              obj[key] = distance.value;
              $scope.combined.push(obj);
              $scope.distances.push(distance);
              console.log("distance between " + $scope.locations[i] + " to " + $scope.locations[j] + " is: " + response.data.rows[i].elements[j].distance.text);
            }
          }
          if ($scope.locations.length === 2) {
            handleOneLocation();
          }
          else if ($scope.locations.length === 3) {
            handleTwoLocations();
          }
          else if ($scope.locations.length === 4) {
            handleThreeLocations();
          }
          else if ($scope.locations.length === 5) {
            handleFourLocations();
          }
          else if ($scope.locations.length === 6) {
            handleFiveLocations();
          }
        }
      }),
      function errorCallback(response) {
        console.log(response.data);
      }
  }
});
