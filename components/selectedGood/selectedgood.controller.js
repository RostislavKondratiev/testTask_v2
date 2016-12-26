app.controller('selectedCtrl',selectedCtrl);

selectedCtrl.$inject=['dataservice','loginservice'];

function selectedCtrl(dataservice, loginservice) {
    var self=this;

    self.authstatus=loginservice.isAuthorized;

    self.placeholder=function () {
        if(self.authstatus()){
           return 'Add Comment';
        }else {
           self.Text=""; 
           return 'Please Login To Leave a Comment';
        }
    };
    
    self.addComment=function (gid) {
        var t=new Date();
        var data={
          Rate:self.Rate,
          Text:self.Text,
          author:loginservice.getUserName(),
          date:t.toString().slice(0,25),
          gid:gid
        };
        dataservice.postComment(data).then(function (res) {
            dataservice.getSelectedGoodComment(res.data.gid).then(function (res) {
                self.Text="";
                self.Rate=0;
                self.comments=res.data;
            })
        })
    }
} 
