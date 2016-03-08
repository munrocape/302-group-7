var nibApp = angular.module('nibApp', []);

nibApp.controller('dropdownController', ['$scope', '$http', function ($scope, $http) {

	$scope.animals = ['otter', 'lion', 'turtle'];
    $scope.init = function () {
        console.log('wired up');
    };

    $scope.init();
}]);