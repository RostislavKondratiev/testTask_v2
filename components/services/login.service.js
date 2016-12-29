app.service('loginservice',loginHandler);

loginHandler.$inject=['localStorageService','$state','dataservice'];

function loginHandler(localStorageService, $state, dataservice) {
    var self=this;
    
    self.isAuthorized=function () {
        return !!localStorageService.get('isAuthorized')
    };

    self.authorize=function (login, pass) {
        dataservice.auth(login,pass).then(function (res) {
            if(!!res.data.token){
                console.log("Auth success");
                localStorageService.set('isAuthorized',{login:login,token:res.data.token});
                dataservice.token = 'Token ' + res.data.token;
                $state.go("main.goods");
            }else {
                alert(res.data.message);
            }
        })
    };
    
    self.register=function (login, pass) {
        dataservice.newUser(login,pass).then(function (res) {
            if(res.data.success===false){
               alert(res.data.message)
           }else {
                $state.go('login');
            }
        });
    };

    self.getUserName=function () {
        if(self.isAuthorized()){
            return localStorageService.get('isAuthorized').login;
        } else return 'Guest';
    };
    
    self.logout=function () {
        localStorageService.remove('isAuthorized');
        alert('Good Bye');
    };
    
    self.goBack=function () {
        $state.go('main.goods');
    }
}
