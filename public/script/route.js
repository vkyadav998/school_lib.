var myApp = angular.module('myApp',['ngRoute','ngTable','ngMaterial']);


myApp.config(["$routeProvider", function ($routeProvider) {

    $routeProvider.when('/home', {
		templateUrl : 'content/home.html',
		controller : 'homeCtrl'
	})
	.when('/menu', {
		templateUrl : 'content/menu.html',
		controller : 'menuCtrl'
	})
	.otherwise({
		redirectTo : '/home'
	});
}])