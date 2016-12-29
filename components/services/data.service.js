app.service('dataservice',dataHandler);

dataHandler.$inject=["$http","localStorageService"];

function dataHandler($http,localStorageService){
    var self=this;
    var path="http://smktesting.herokuapp.com/api/";

    var getToken=function () {
        return localStorageService.get('isAuthorized').token
    };

    self.getGoods=function () {
        return $http.get(path+"products/")
    };

    self.getSelectedGoodComment=function (gid) {
        return $http.get(path+"reviews/"+gid)
    };

    self.postComment=function (gid, comment) {
        return $http({
            method:"POST",
            url:path+'reviews/'+gid,
            data:{rate:comment.rate, text:comment.text},
            headers:{
                Authorization: "Token "+getToken()
            }
        })
    };

    self.newUser=function (login, pass) {
        return $http.post(path+'register/',{username:login,password:pass})
    };
    
    self.auth=function (login, pass) {
        return $http.post(path+'login/',{username:login, password:pass})
    }
}