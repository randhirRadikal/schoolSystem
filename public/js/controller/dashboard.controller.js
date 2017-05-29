var app = angular.module("app");
app.controller("dashboardCtrl",['$scope','dashboardService','loginService',function($scope,dashboardService,loginService){
	loginService.checkProtected(function(res){
		console.log(res);
	});
}]);
