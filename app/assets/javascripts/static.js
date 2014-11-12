angular.module('leatherLaneMarketApp', ['ngAnimate'])
 .controller('MarketController', ["$http","$scope", function($http, $scope){
   $scope.stalls = [];

   $http.get('/stalls.json').success(function(data){
    $scope.stalls = data;
   })



   $scope.selectStall= function(stall) {
    $scope.selectedStall = stall;
   };

   $scope.clearSelectedStall = function() {
    $scope.selectedStall = false;
   };

  $scope.addStall = function() {
    $http.post('/stalls.json', { stall: $scope.newStall }).success(function(data){
    $scope.stalls.push(data);
    $scope.newStall = false;
    $scope.stallForm.$setPristine();
    });
   };

   $scope.deleteStall = function(stall) {
    $http.delete('/stalls/' + stall.id + '.json').success(function(data){
      $scope.stalls.splice($scope.stalls.indexOf(stall), 1);
      $scope.selectedStall = null;
    });
   };

   $scope.setEditStall = function(stall){
    $scope.editStall = stall;
   };

   $scope.updateStall = function(stall){
    $http.put('/stalls/' + stall.id + '.json', { stall: stall }).success(function(data){
      $scope.editStall = null;
    });
   };


 }]);
