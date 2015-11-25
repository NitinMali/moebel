/**
 * Created by Nitin on 08-11-2015.
 */
describe('Moebelmania spec', function(){
    var userService, adminUser;

    beforeEach(function(){
        module('moebel');
        inject(function($injector){
            userService = $injector.get('userService');
            adminUser = $injector.get('adminUser');
        });
    });

    it('Admin should be 1', function(){
        expect(adminUser.length).toEqual(1);
    });

    it('Add new user "Test"', function(){
        userService.addNewUser({email:'Testuser@abc.com', password:'pass1234'});
        //expect(users.length).toEqual(3);
    });
});