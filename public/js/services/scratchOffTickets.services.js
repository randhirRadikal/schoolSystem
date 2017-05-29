angular.module('app')
.factory('scratchOffTicketsService',[
	'$rootScope','$location','$http','urls',function($rootScope,$location,$http,urls){
		var getScratchOffs = function(callback){
			$http.get(urls.BASE_API_URL+'/getScratchOffs').then(function(res){
				console.log(res);
				if(res.data.success){
					callback({error:false,message:'successfully.',data:res.data.result});
				}else{
					callback({error:true,message:'problem in success code.'});
				}
			}).catch(function(err){
				callback({error:true,message:'problem in api.'});
			});
		};

		var getItemLists = function(callback){
			$http.get(urls.BASE_API_URL+'/item').then(function(res){
				console.log(res);
				if(res.data.success){
					callback({error:false,message:'successfully.',data:res.data.result});
				}else{
					callback({error:true,message:'problem in success code.'});
				}
			}).catch(function(err){
				callback({error:true,message:'problem in api.'});
			});
		};

		var getShopLists = function(callback){
			$http.get(urls.BASE_API_URL+'/shop').then(function(res){
				if(res.data.success){
					callback({error:false,message:'successfully.',data:res.data.result});
				}else{
					callback({error:true,message:'problem in success code.'});
				}
			}).catch(function(err){
				callback({error:true,message:'problem in api.'});
			});
		};

		var saveScratchOffTicket = function(data,callback){
			$http.post(urls.BASE_API_URL+'/addScratchOffTicket',data).then(function(res){
				callback(res);
			}).catch(function(err){
				callback({error:true,message:'problem in api.'});
			});
		};

		var updateScratchOffTicket = function(data,callback){
			$http.post(urls.BASE_API_URL+'/updateScratchOffTicket',data).then(function(res){
				callback(res);
			}).catch(function(err){
				callback({success:false,message:'problem in api.'});
			});
		};

		var deleteScratchOffTicket = function(data,callback){
			$http.post(urls.BASE_API_URL+'/deleteScratchOffTicket',data).then(function(res){
				callback(res);
			}).catch(function(err){
				callback({success:false,message:'problem in api.'});
			});
		};

		return {
			getScratchOffs: getScratchOffs,
			getItemLists: getItemLists,
			getShopLists: getShopLists,
			saveScratchOffTicket: saveScratchOffTicket,
			updateScratchOffTicket: updateScratchOffTicket,
			deleteScratchOffTicket: deleteScratchOffTicket
		};
	}
]);
