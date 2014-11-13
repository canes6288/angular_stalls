angular.module('leatherLaneMarketApp', ['ngAnimate'])
.service('stallService', function($http) {

  this.getAll = function() {
    return $http.get('/stalls.json');
  };

  this.add = function(stall) {
    return $http.post('/stalls.json', { stall : stall });
  };

  this.update = function(stall) {
    return $http.put('/stalls/' + stall.id + '.json', { stall: stall });
  };

  this.delete = function(stall) {
    return $http.delete('/stalls/' + stall.id + '.json');
  };

})
.controller('MarketController',
            ["$scope", "stallService",
            function($scope, stallService) {

  $scope.stalls = [];

  $scope.getStalls = function() {
    stallService.getAll().success(function(data) {
      $scope.stalls = data;
    }).error(function() {
      alert('Something went wrong!');
    });
  };

  $scope.getStalls();

  $scope.newStall = null;

  $scope.selectStall = function(stall) {
    $scope.selectedStall = stall;
  };

  $scope.clearSelectedStall = function() {
    $scope.selectedStall = null;
  };

  $scope.addStall = function() {
    stallService.add($scope.newStall)
    .success(function(data) {
      $scope.stalls.push(data);
      $scope.newStall = null;
      $scope.stallForm.$setPristine();
    }).error(function() {
      alert('Something went wrong!');
    });
  };

  $scope.deleteStall = function(stall) {
    stallService.delete(stall)
    .success(function(data) {
      // $scope.getStalls();
      $scope.stalls.splice($scope.stalls.indexOf(stall), 1);
      $scope.selectedStall = null;
    });
  };

  $scope.setEditStall = function(stall) {
    $scope.editStall = angular.copy(stall);
  };

  $scope.clearEditStall = function() {
    $scope.editStall = null;
  };

  $scope.updateStall = function(stall) {
    stallService.update(stall)
    .success(function() {
      angular.copy($scope.editStall, $scope.selectedStall);
      $scope.clearEditStall();
    });
  };

  $scope.searchFunction = function(stall) {
    if (!$scope.search) {
      return true;
    }
    // case insensitive filtering
    if (stall.name.toUpperCase().indexOf($scope.search.toUpperCase()) != -1
     || stall.description.toUpperCase().indexOf($scope.search.toUpperCase()) != -1) {
      return true;
    }
    return false;
  };
}]);
