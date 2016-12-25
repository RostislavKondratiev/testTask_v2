app.service('dataservice',dataHandler);

dataHandler.$inject=["$http"];

function dataHandler($http){
    var self=this;
    var path="http://localhost:8080/";
    
    self.getGoods=function () {
        return $http.get(path+"goods")
    };

    self.getSelectedGood=function (id) {
        return $http.get(path+"goods/"+id)
    };

    self.getSelectedGoodComment=function (gid) {
        return $http.get(path+"comments/?gid="+gid)
    };

    self.postComment=function (data) {
         return $http({
             url:path+"comments",
             method:"POST",
             data:data
         })
    };

    self.checklogin=function (login) {
        return $http.get(path+"users/?login="+login)  
    };

    self.newUser=function (login, pass) {
        var data={
            login:login,
            pass:pass
        };
        return $http({
          url:path+"users",
          method:"POST",
          data:data
      })
    };
    
    self.auth=function (login, pass) {
        return $http.get(path+"users/?login="+login+"&pass="+pass)
    }
}