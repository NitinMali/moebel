/**
 * Created by Nitin on 07-11-2015.
 */

moebel.service("userService", ['adminUser', '$http', '$q', 'loggedInUser', function(adminUser, $http, $q, loggedInUser){

    function userAuth(user) {
        var deferred = $q.defer();
        var userDetails = _.findWhere(adminUser, user);
        if(angular.isUndefined(userDetails)) {
            $http.get('/getusers').then(function (response) {
                loggedInUser = _.findWhere(response.data, user);
                deferred.resolve(loggedInUser);
            });
        } else {
            loggedInUser = userDetails;
            deferred.resolve(userDetails);
        }
        return deferred.promise;
    }

    function getUsers(type){
        var deferred = $q.defer();
        $http.get('/getusers').then(function (response) {
            deferred.resolve(_.filter(response.data, {type:type}));
        });
        return deferred.promise;
    }

    function addUser(user){
        var users = [];
        var deferred = $q.defer();
        $http.get('/getusers').then(function (response) {
            if(response.data.length > 0) {
                users = response.data;
            }

            users.push({
                id: users.length, type: 2,
                email: user.email,
                password: user.password,
                firstName: '', lastName: '', street: '', zip: 0, city: ''
            });

            //Save users to json file
            $http.post('/saveuser', users).then(function (response) {
                deferred.resolve(response.data);
            });
        });
        return deferred.promise;
    }

    return {
        getLoggedInUser: function(){
            return loggedInUser;
        },

        addNewUser: function(user){
            return addUser(user);
        },

        getUsers: function(){
            return getUsers(2);
        },

        checkUserAuth: function(user) {
            return userAuth(user);
        }
    }
}]);