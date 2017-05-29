var app = angular.module("app");
app.controller("scratchOffTicketsCtrl",['$scope','scratchOffTicketsService','loginService',function($scope,scratchOffTicketsService,loginService){
	$scope.pageModel={
		viewModel:true,
		addModel:false,
		editModel:false
	};
	$scope.getScratchOffs = function(){
		scratchOffTicketsService.getScratchOffs(function(res){
			$scope.ScratchOffTicketsList = res.data;
		});
	};

	$scope.getItemLists = function(){
		scratchOffTicketsService.getItemLists(function(res){
			$scope.itemLists = res.data;
		});
	};

	$scope.getShopLists = function(){
		scratchOffTicketsService.getShopLists(function(res){
			console.log(res);
			$scope.shopLists = res.data;
		});
	};

	$scope.getScratchOffs();

	$scope.openViewModel = function(){
		$scope.pageModel={
			viewModel:true,
			addModel:false,
			editModel:false
		};
	};

	$scope.openAddModel = function(){
		$scope.getItemLists();
		$scope.getShopLists();
		$scope.pageModel={
			viewModel:false,
			addModel:true,
			editModel:false
		};
	};

	$scope.openEditModel = function(edit){
		$scope.getItemLists();
		$scope.getShopLists();
		$scope.edit = edit;
		if(!$scope.edit.shopid.shopid){
			$scope.edit.shopid = {
				shopid: edit.shopid
			};
		}
		if(!$scope.edit.itemid.id){
			$scope.edit.itemid = {
				id: edit.itemid
			};
		}
		$scope.pageModel={
			viewModel:false,
			addModel:false,
			editModel:true
		};
	};


	$scope.addMethod = function(add){
		$scope.isBusyButton = true;
		scratchOffTicketsService.saveScratchOffTicket(add,function(res){
			if(!res.error){
				$scope.openViewModel();
				$scope.getScratchOffs();
			}else{

			}
			$scope.isBusyButton = false;
		});
	};

	$scope.updateMethod = function(edit){
		$scope.isBusyButton = true;
		var req = {
			"ticketid": edit.ticketid,
			"price": edit.price,
			"hood": edit.hood,
			"chances": edit.chances,
			"common_prize": edit.common_prize,
			"grand_prize": edit.grand_prize,
			"grand": edit.grand,
			"item": edit.item,
			"itemid": edit.itemid.id,
			"shopid": edit.shopid.shopid
		};
		scratchOffTicketsService.updateScratchOffTicket(req,function(res){
			if(!res.error){
				$scope.openViewModel();
				$scope.getScratchOffs();
			}else{

			}
			$scope.isBusyButton = false;
		});
	};

	$scope.deleteMethod = function(ticketid){
		var conf = confirm("Delete!");
		console.log(conf);
		if(conf){
			scratchOffTicketsService.deleteScratchOffTicket({ticketid:ticketid},function(res){
				if(!res.error){
					//$scope.openViewModel();
					$scope.getScratchOffs();
				}else{

				}
				$scope.isBusyButton = false;
			});
		}
	};

}]);
