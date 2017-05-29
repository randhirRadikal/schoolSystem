angular.module('app')
.factory('loginService',[
	'$rootScope','$location','$http','urls',function($rootScope,$location,$http,urls){
		var login = function(data,callback){
			$http.post(urls.BASE_API_URL+'/login',data).then(function(res){
				if(res.data.success){
					callback({error:false,message:'Login successfully.',data:res.data.data});
				}else{
					callback({error:true,message:'Please enter valied email and password.'});
				}
			}).catch(function(err){
				callback({error:true,message:'problem in api.'});
			});
		};
		var logout = function(callback){
			$http.get(urls.BASE_API_URL+'/logout').then(function(res){
				if(res.data.success){
					callback({error:false,message:'Logout successfully.'});
				}else{
					callback({error:true,message:'Logout successfully.'});
				}
			}).catch(function(err){
				callback({error:true,message:'problem in api.'});
			});
		};

		var checkProtected = function(callback){
			$http.get(urls.BASE_API_URL+'/protected').then(function(res){
				callback({error:res.data.success,message:'successfully.'});
			}).catch(function(err){
				callback({error:true,message:'problem in api.'});
			});
		};

		var getAdminDetails = function(callback){
			$http.get(urls.BASE_API_URL+'/getAdminDetails').then(function(res){
				if(res.data.success){
					callback({error:false,message:'Admin Details.',data:res.data.data});
				}else{
					callback({error:true,message:'User not authorised.'});
				}
			}).catch(function(err){
				callback({error:true,message:'problem in api.'});
			});
		};
		return {
			login: login,
			logout: logout,
			checkProtected: checkProtected,
			getAdminDetails: getAdminDetails
		};
	}
]);
