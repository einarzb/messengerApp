app.controller('mainController', function($scope, $http, factory, $state) {
  $scope.locations = [];

  $scope.doBranchMagic = function() {
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
    $http.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins=HaPelech7,TelAviv-Yafo,Israel&destinations=Erez6,Lod,Israel&key=AIzaSyDTEUMGmlh_LdoOiHvOTgPhfmWobmyW3F4")
      .then(function(response) {
        if (response.data.rows[0].elements[0].status === "NOT_FOUND") { // NOTE: bad item that doesn't need to be counted
          $scope.branches.splice(index, 1);
          console.log("not found");
        } else {
          console.log(response.data);
        }
      }),
      function errorCallback(response) {
        console.log(response.data);
      }
  }
});
