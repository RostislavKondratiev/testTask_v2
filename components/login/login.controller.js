app.controller('loginCtrl',loginCtrl);

loginCtrl.$inject=['loginservice'];

function loginCtrl(loginservice) {
    var self=this;
    
    self.loginfunc=function () {
        loginservice.authorize(self.login, self.pass)
    };
    
    self.back=loginservice.goBack;
}