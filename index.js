var app = angular.module('app',['ui.router','LocalStorageModule','angular-input-stars']);

//Fix the angular 1.6 problem with possibly unhandled rejection,
//will be fixed in 1.6.1
app.config(unhandledRejectionIssue);

app.config(stateHandler);

app.config(localStorageConfig);

app.run(loginRedirect);

app.run(signUpRedirect);

unhandledRejectionIssue.$inject=['$qProvider'];
function unhandledRejectionIssue($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}

stateHandler.$inject=['$stateProvider', '$urlRouterProvider'];
function stateHandler($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("main", {
            abstract:true,
            component:"navcomp"
        })
        .state("main.welcome",{
            url:"/welcome",
            component:"homecomp"
        })
        .state("main.goods",{
            url:"/goods",
            component:"goodscomp",
            resolve:{
                goods:function (dataservice) {
                    return dataservice.getGoods().then(function (res) {
                        dataservice.productlist=res.data;
                        return res.data;
                    })
                }
            }
        })
        .state("main.selectedgood",{
            url:"/goods/{goodId}",
            component:"selectedcomp",
            resolve:{
                data:function (dataservice, $transition$, $state) {
                    //Небольшой велосипед, так как в API нет выборки конкретного поста
                    return dataservice.getGoods().then(function (res) {
                        for (var i = 0; i < res.data.length; i++) {
                            if (res.data[i].id == $transition$.params().goodId) {
                                return res.data[i];
                            }
                        }
                        alert('Page Doesnt Exist');
                        $state.go('main.goods');
                    })
                },
                comments:function (dataservice, $transition$) {
                    return dataservice.getSelectedGoodComment($transition$.params().goodId).then(function (res) {
                        return res.data
                    })
                }
            }
        })
        .state("login",{
            url:"/login",
            component:"logincomp"
        })
        .state("registration",{
            url:"/signup",
            component:"registrcomp"
        });

    $urlRouterProvider.otherwise("/welcome");
}

localStorageConfig.$inject=['localStorageServiceProvider'];
function localStorageConfig(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix("MyApp");
    localStorageServiceProvider.setStorageType('localStorage');
}

loginRedirect.$inject=['$transitions','loginservice'];
function loginRedirect($transitions, loginservice) {
    $transitions.onStart({to:'login'},function (trans) {
        var state=trans.router.stateService;
        if(loginservice.isAuthorized()){
            return state.target('main.welcome');
        }
    })
}

signUpRedirect.$inject=['$transitions','loginservice'];
function signUpRedirect($transitions, loginservice) {
    $transitions.onStart({to:'registration'},function (trans) {
        var state=trans.router.stateService;
        if(loginservice.isAuthorized()){
            return state.target('main.welcome');
        }
    })
}



