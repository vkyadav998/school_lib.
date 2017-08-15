
myApp.controller('homeCtrl', ['$scope', '$http', '$window', 'ADD_SERVICE', 'NgTableParams', '$timeout',
	function($scope, $http, $window, ADD_SERVICE, NgTableParams, $timeout) {

	// initialization
	$scope.book={};
	$scope.user={};
	$scope.admin={};
	$scope.transaction={};
	$scope.showBooks = true;

	// get all book
    $scope.getall_book = function (){
		var reqheader = {'Content-Type' : "application/json"}
				
		$http.get('/book/getall_book', reqheader)
		.then(function (res) {
			$scope.allBooks = res.data.allItom;
			var cnt = ($scope.allBooks.length >7)?[5,10,50]:[];

			$scope.tableBookParams = new NgTableParams({}, { dataset: $scope.allBooks, counts:cnt});
		}).catch(function (err) {
			console.log(err);
		})
    };


	// add single book
	$scope.add_book = function (){
		if($scope.book.name && $scope.book.auther){
			var reqdata = $scope.book;
				reqdata.availability = true;
			var reqheader = {'Content-Type' : "application/json"};

			$http.post('book/add_book',reqdata,reqheader)
				.then(function(response){
					console.log(response);
					$('#modal').modal('hide');
					$scope.book={};
					$scope.showBooks = true;
					$scope.getall_book();
				});
		}else {
			alert("please fill Book name & Auther name");
		}
	};

	// remove single book
	$scope.remove_book = function (book) {
		var reqdata = {"_id":book._id};
		reqdata.availability = true;
		var reqheader = {'Content-Type' : "application/json"};

		$http.post('book/remove_book',reqdata,reqheader)
			.then(function(response){
				alert("book removed.");
				$scope.getall_book();
			});
	};

	// get all user
	$scope.getall_user = function (){
		var reqheader = {'Content-Type' : "application/json"}
		$http.get('/user/getall_user',reqheader)
		.then(function(res){
			$scope.allUsers = res.data.allItom;
			var cnt = ($scope.allUsers.length >7)?[5,10,50]:[];

			$scope.tableUserParams = new NgTableParams({}, { dataset: $scope.allUsers, counts:cnt});
		}).catch(function(err) {
			console.log(err);
		});
	};
	

	// add single user
	$scope.add_user = function (){
		if($scope.user.name && $scope.user.email){
			var reqdata = $scope.user;
			var reqheader = {'Content-Type' : "application/json"};

			$http.post('user/add_user',reqdata,reqheader)
				.then(function(response){
					console.log(response);
					$('#modal2').modal('hide');
					$scope.user={};
					$scope.showBooks = false;
					$scope.getall_user();
				});
		}else {
			alert("please fill name & email");
		}
	};

	// remove single user
	$scope.remove_user = function (user) {
		var reqdata = {"_id":user._id};
		reqdata.availability = true;
		var reqheader = {'Content-Type' : "application/json"};

		$http.post('user/remove_user',reqdata,reqheader)
			.then(function(response){
				alert("user removed.");
				$scope.getall_user();
			});
	};
		
		
	$scope.issueBook = function () {
		if($scope.transaction.userID && $scope.transaction.bookID){

			if(!$scope.transaction.availability){
				alert("Book is currently unavailable");
				return;
			}

			var reqdata = $scope.transaction;
			var reqheader = {'Content-Type' : "application/json"};

			$http.post('transaction/issueBook',reqdata,reqheader)
			.then(function(response){
				$scope.init();
			}).catch(function (err) {
				console.log(err);
			});
		}else {
			alert("please select user & book");
		}
	}

	$scope.returnBook = function () {
		if($scope.transaction.userID && $scope.transaction.bookID){
			
			if($scope.transaction.availability){
				alert("Book is already available");
				return;
			}

			var reqdata = $scope.transaction;
			var reqheader = {'Content-Type' : "application/json"};

			$http.post('transaction/returnBook',reqdata,reqheader)
			.then(function(response){
				$scope.init();
			}).catch(function (err) {
				console.log(err);
			});
		}else {
			alert("please select user & book");
		}
	}


	//init function
	$scope.init = function(){
		$scope.getall_book();
		$scope.getall_user();
	};
	$scope.init();


	/** auto complete for User **/
	$scope.queryUserSearch = function(query) {
		return new Promise(function(resolve, reject){
			var results = [];

			var allUserList = $scope.allUsers?($scope.allUsers):[];

			if(query != '') {
				var lowercaseQuery = angular.lowercase(query);

				results = allUserList.filter(function(elem, index){
					if(elem.name.toLowerCase().indexOf(lowercaseQuery) != -1) {
						return elem;
					}
				});
			} else {
				results = allUserList;
			}

			$timeout(function(){
				resolve(results);
			},Math.random() * 500, false);
		});
	};

	$scope.selectedItemChangeUser = function(item){
		if(item) {
			$scope.transaction.userID = item._id;
		}
	};

	/** auto complete for Book **/
	$scope.queryBookSearch = function(query) {
		return new Promise(function(resolve, reject){
			var results = [];

			var allBookList = $scope.allUsers?($scope.allBooks):[];

			if(query != '') {
				var lowercaseQuery = angular.lowercase(query);

				results = allBookList.filter(function(elem, index){
					if(elem.name.toLowerCase().indexOf(lowercaseQuery) != -1) {
						return elem;
					}
				});
			} else {
				results = allBookList;
			}

			$timeout(function(){
				resolve(results);
			},Math.random() * 500, false);
		});
	};

	$scope.selectedItemChangeBook = function(item){
		if(item) {
			$scope.transaction.bookID = item._id;
			$scope.transaction.availability = item.availability;
		}
	};

}]);
