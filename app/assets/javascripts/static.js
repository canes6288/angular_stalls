angular.module('leatherLaneMarketApp', ['ngAnimate'])
     .controller('MarketController', ["$scope", function($scope){
       $scope.stalls = stalls;

       $scope.selectStall = function(stall) {
        $scope.selectedStall = stall;
       };

       $scope.clearSelectedStall = function () {
        $scope.selectedStall = false;
       };

       $scope.addStall = function() {
        $scope.stalls.push($scope.newStall);
        $scope.newStall = false;
        $scope.stallForm.$setPristine();
       };

     }]);

stalls = [
  {
    name: "Burrito",
    price: 5,
    description:  "Meat and vegetables in a delicious wrap"
  },
  {
    name: "Pizza",
    price: 6.5,
    description:  "Cheese and meat and veg on some dough"
  },
  {
    name: "Fallafel",
    price: 4.5,
    description: "Deep fried delicious chickpeas"
  }
]

