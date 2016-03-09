var nibApp = angular.module('footerApp', []);

nibApp.controller('footerController', ['$scope', '$http', function ($scope, $http) {

	$scope.cars = ['ford', 'ferrari', 'jeep'];
    $scope.init = function () {
        console.log('wired up');
    };

    $scope.msg = function () {
    	console.log('now you are thinking with portals');
    }

    $scope.init();
}]);
