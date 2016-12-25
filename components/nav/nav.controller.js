app.controller('navCtrl',navCtrl);

navCtrl.$inject=['loginservice','$state'];

function navCtrl(loginservice, $state) {
    var self=this;

    self.displayContent=loginservice.isAuthorized;

    self.username=loginservice.getUserName();

    self.log=function () {
        $state.go('login')
    };

    self.lout=function(){
        loginservice.logout();
        self.username=loginservice.getUserName();
    };

    self.regist=function () {
        $state.go('registration')
    };
}