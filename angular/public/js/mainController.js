app.controller('mainController', function($scope, $http, factory, $state) {
  $scope.locations = [];
  $scope.distances = [];

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
              $scope.distances.push(response.data.rows[i].elements[j].distance);
              console.log("distance between " + $scope.locations[i] + " to " + $scope.locations[j] + " is: " + response.data.rows[i].elements[j].distance.text);
            }
          }
          console.log($scope.distances);
        }
      }),
      function errorCallback(response) {
        console.log(response.data);
      }
  }
});
