var app = angular.module("app", ["ngRoute"]);
app.constant('urls',{
		BASE_URL: window.location.origin +'/#!',
		BASE_API_URL : window.location.origin +'/admin'
});
app.config(function($routeProvider,urls,$httpProvider) {
	$httpProvider.interceptors.push(['$q', function ($q) {
        return {
			'request': function (config) {
                config.headers = config.headers || {};
                return config;
            },
            'responseError': function (response) {
                console.log(response);
                if (response.status === 401 || response.status === 403 || response.status === 500) {
                    var login_url = urls.BASE_URL+'/login';
					window.location.href = login_url;
                }
                return $q.reject(response);
            }
        };
    }]);

    $routeProvider
    .when("/", {
        templateUrl : "./view/login.html",
		controller : "loginCtrl"
    })
    .when("/dashboard", {
        templateUrl : "../view/dashboard.html",
        controller : "dashboardCtrl"
    })
	.otherwise({
        templateUrl : "../view/login.html",
		controller : "loginCtrl"
    });
});
