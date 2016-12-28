app.controller('selectedCtrl',selectedCtrl);

selectedCtrl.$inject=['dataservice','loginservice'];

function selectedCtrl(dataservice, loginservice) {
    var self=this;
    self.comment={
        rate:0,
        text:""
    };

    self.authstatus=loginservice.isAuthorized;

    self.placeholder=function () {
        if(loginservice.isAuthorized()){
            return 'Add Comment';
        }else {
            self.comment.text='';
            return 'Please Login To Leave a Comment';
        }
    };
    
    self.addComment=function (gid) {
        dataservice.postComment(gid, self.comment).then(function (res) {
            dataservice.getSelectedGoodComment(gid).then(function (res) {
                self.comment.text="";
                self.comment.rate=0;
                self.comments=res.data;
            })
        })
    }
} 
