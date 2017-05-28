app.controller('mainController', function($scope, $http, factory, $state) {

    $scope.doBranchMagic = function() {
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
