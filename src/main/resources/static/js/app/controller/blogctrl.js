var app = angular.module("app",[]);

app.controller("blogCtrl", function($scope,$log,$http) {
    $scope.entry = {title : "Title",
                    content : "Content"};

    $scope.entryUpdate = {title : "Title",
                    content : "Content"};
    $scope.entries = [];
    $log.debug('se creo el $scope');

    $scope.loadData = function() {
        var configList = {
                method: "GET",
                url: "http://localhost:8080/blogs"
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
            url     : 'http://localhost:8080/blog',
            data    : $scope.entry
        }).success(function(data) {
            console.log(data);
            $scope.loadData();
        });
    };

    $scope.editData = function(ind) {

        $scope.entryUpdate.title=document.getElementsByName("titleU")[ind].value;
        $scope.entryUpdate.content=document.getElementsByName("contentU")[ind].value;
        var configList = {
                method  : 'PUT',
                url     : 'http://localhost:8080/blog/'+ind,
                data    :  $scope.entryUpdate
        };

        var response=$http(configList);

        response.success(function(data, status, headers, config) {
            $scope.entries = data;
            });

        response.error(function(data, status, headers, config) {
            alert("Ha fallado la petición. Estado HTTP:"+status);
            });

    };  
    
    $scope.deleteData = function(ind) {
        $log.debug($scope.entries[ind]);
        $http({
            method  : 'DELETE',
            url     : "http://localhost:8080/blog",
            //params: {ind : "'"+ind+"'"}
           data    :  ind, 
          headers: {"Content-Type": "application/json;charset=utf-8"}
        }).success(function() {
            //alert("marica hp");
            //console.log(data);
            $scope.loadData();
        });
         //alert("termino aqui bobo    " + $scope.entries[ind].title);
         //var response=$http(configList);

    }; 
});
