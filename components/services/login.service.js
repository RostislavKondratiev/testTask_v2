app.service('loginservice',loginHandler);

loginHandler.$inject=['localStorageService','$state','dataservice'];

function loginHandler(localStorageService, $state, dataservice) {
    var self=this;
    var isLogin=false;

    if(localStorageService.get('isAuthorized')){
        isLogin=true;
    } else isLogin=false;

    self.isAuthorized=function () {
        return isLogin;
    };

    self.authorize=function (login, pass) {
        dataservice.auth(login,pass).then(function (res) {
            if(res.data[0]==undefined){
                isLogin=false;
                alert("Wrong Login or Password");
            }else {
                isLogin=true;
                localStorageService.set('isAuthorized',{login:res.data[0].login,isLogged:true});
                $state.go("main.goods");
                }
        })
    };

    self.register=function (login, pass) {
        dataservice.checklogin(login).then(function (res) {
            if(!!res.data[0]){
                alert('User Already Exist')
            }else {
                dataservice.newUser(login, pass).then(function (res) {
                    $state.go('login')
                })
            }
        })
    };

    self.getUserName=function () {
        if(self.isAuthorized()){
            return localStorageService.get('isAuthorized').login;
        } else return 'Guest';
    };
    
    self.logout=function () {
        localStorageService.remove('isAuthorized');
        alert('Good Bye');
        isLogin=false;
    };
    
    self.goBack=function () {
        $state.go('main.goods');
    }
}
