//Initialising angular app
var moebel = angular.module('moebel', ['ui.router']);

//Route setting
moebel.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/', {
                url: '/',
                controller: 'userCtrl',
                templateUrl: 'views/login.html'
            })
            .state('user', {
                url: '/user',
                controller: 'userCtrl',
                templateUrl: 'views/user.html'
            })

            .state('admin', {
                url: '/admin',
                controller: 'userCtrl',
                templateUrl: 'views/admin.html'
            })

            .state('newuser', {
                url: '/newuser',
                controller: 'userCtrl',
                templateUrl: 'views/newuser.html'
            })

});

//admin
moebel.value("adminUser", [
    {
        id:0, type:1,
        email: 'admin@abc.com',
        password: 'Pass1234',
        firstName: 'Super', lastName: 'Admin', street: 'ADB cnnjfnjd jhjsj', zip: 73207, city: 'Plochingen'
    }
]);

moebel.value("loggedInUser", {});