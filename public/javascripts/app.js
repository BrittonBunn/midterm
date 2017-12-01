angular.module('purchases', [])
    .controller('MainCtrl', [
        '$scope','$http',
        function($scope, $http){

            $scope.products = [];
            $scope.selectedProducts = [];

            $scope.addProduct = function() {
                if ($scope.productName === '') {
                    return;
                }
                console.log("adding new product");

                $scope.createProduct({
                    name: $scope.productName,
                    price: $scope.productPrice,
                    pic: $scope.productPic,
                    totalOrdered: 0
                });
                $scope.productName = '';
                $scope.productPrice = '';
                $scope.productPic = '';
            };

            $scope.purchase = function(product) {

                return $http.put('products/' + product._id + '/purchase')
                    .success(function(data) {
                        console.log("product ordered");
                        product.totalOrdered += 1;
                    })
            };

            $scope.createProduct = function(product) {
                return $http.post('/products', product).success(function(data){
                    $scope.products.push(data);
                });
            };


            $scope.getAll = function() {
                return $http.get('/products').success(function(data){
                    angular.copy(data, $scope.products);
                });
            };

            $scope.delete = function(product) {
                $http.delete('/products/' + product._id )
                    .success(function(data){
                        console.log("delete worked");
                    });
                $scope.getAll();
            };

            $scope.placeOrder = function() {
                $scope.selectedProducts = [];

                for (var i = 0; i < $scope.products.length; i++) {
                    if ($scope.products[i].isChecked) {
                        $scope.products[i].isChecked = undefined;
                        $scope.purchase($scope.products[i]);
                        $scope.selectedProducts.push($scope.products[i]);
                    }
                }
            };

            $scope.getAll();
        }
    ]);