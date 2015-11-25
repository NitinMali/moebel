/**
 * @ngdoc controller
 *
 * @name moebel.userCtrl
 * @description User controller to manage user login.
 *
 * @requires $scope
 * @requires users
 * @requires $state
 * @requires userService

 * @author Nitin mali
 */
moebel.controller('userCtrl', ['$scope', 'adminUser', '$state', 'userService', '$timeout', 'loggedInUser',
    function ($scope, adminUser, $state, userService, $timeout, loggedInUser) {

        $scope.showNotification = function (msg) {
            $scope.notification = msg;
            $timeout(function () {
                //Todo:hide slowly
                $scope.notification = undefined
            }, 3000);
        };

        /**
         * @ngdoc method
         * @name login
         * @description Check for user authentication
         *
         */
        $scope.login = function () {
            var user = {email: $scope.email, password: $scope.password};
            userService.checkUserAuth(user).then(function (userDetails) {
                if (userDetails) {
                    //redirect to appropriate user area
                    if (userDetails.type === 1) {
                        $state.go('admin');
                    } else {
                        $state.go('user');
                    }
                } else {
                    //show error
                    $scope.showNotification("Invalid user credentials, please try again");
                }
            });
        };


        userService.getUsers().then(function (data) {
            $scope.users = data;
        });

        $scope.addNewUser = function () {
                userService.addNewUser({email: $scope.email, password: $scope.password}).then(function (data) {
                    $state.go('admin');
                });
        };

        $scope.loggedUser = userService.getLoggedInUser();
    }]);