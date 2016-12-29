app.controller('registrCtrl',registrCtrl);

registrCtrl.$inject=['loginservice'];
function registrCtrl(loginservice) {
    var self=this;
    
    self.register=function () {
        if(self.pass!=self.confpass){
            alert('Different passwords');
            self.pass="";
            self.confpass="";
        }else{
            loginservice.register(self.login, self.pass)
        }
    }
}