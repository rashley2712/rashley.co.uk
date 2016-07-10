var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', function($scope) { 
  $scope.title = 'My Top Sellers in Books'; 
  $scope.promo = "Promotional one-liner...";
  $scope.products = [ 
  { 
    name: 'The Book of Trees', 
    price: 19, 
    pubdate: new Date('2014', '03', '08'), 
    cover: 'img/the-book-of-trees.jpg' 
  }, 
  { 
    name: 'Program or be Programmed', 
    price: 8, 
    pubdate: new Date('2013', '08', '01'), 
    cover: 'img/program-or-be-programmed.jpg' 
  } 
];
  
}]);

app.controller('OtherController', ['$scope', function($scope) { 
  $scope.title = 'My Top Sellers in Books'; 
  $scope.promo = "Promotional one-liner...";
  $scope.products = [ 
  { 
    name: 'The Book of Trees 1', 
    price: 19, 
    pubdate: new Date('2014', '03', '08'), 
    cover: 'img/the-book-of-trees.jpg' 
  }, 
  { 
    name: 'Program or be Programmed three', 
    price: 8, 
    pubdate: new Date('2013', '08', '01'), 
    cover: 'img/program-or-be-programmed.jpg' 
  }];
  $scope.clicked = function clicked() {
	  console.log("I have been clicked.");
  }
  $scope.global = eventList;
  
}]);