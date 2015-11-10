var app = angular.module("app",[]);

app.controller("blogCtrl", function($scope,$log,$http) {
    $scope.entry = {title : "Title",
                    content : "Content"};
    $scope.entries = [];
    $log.debug('se creo el $scope');

    $scope.loadData = function() {
        var configList = {
                method: "GET",
                url: "http://192.168.1.4:8080/blogs"
        };

        var response=$http(configList);

        response.success(function(data, status, headers, config) {
            $scope.entries = data;
            });

        response.error(function(data, status, headers, config) {
            alert("Ha fallado la petición. Estado HTTP:"+status);
            });
    };
    $scope.loadData();
    
    $scope.processForm = function() {
        $log.debug($scope.entry);
        $http({
            method  : 'POST',
            url     : 'http://192.168.1.4:8080/blog',
            data    : $scope.entry
        }).success(function(data) {
            console.log(data);
            $scope.loadData();
        });
    };
    
    $scope.deleteData = function(ind) {
        alert("entro");
        alert(ind);
        alert($scope.entries.length);
       
        $log.debug($scope.entries[ind]);
        $http({
            method  : 'DELETE',
            url     : "http://192.168.1.4:8080/blog",
           data    : "{"+ind+"}"
            //headers: {"Content-Type": "application/json;charset=utf-8"}
        }).success(function() {
            //console.log(data);
            $scope.loadData();
        });
         //alert($scope.entries[ind].title);
         //var response=$http(configList);

    }; 
});
