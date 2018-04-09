angular.module('usersApp', [])
.controller('userCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.init = function() {
    $http({
      method: "GET",
      url: "/user/profile/"
    }).then(resolved, rejected);
  };

  var resolved = function(response) {
    $scope.user = response.data;
    $scope.error = "";
  };

  var rejected = function(response) {
    $scope.user = {};
    $scope.error = response.data;
  };
}])
