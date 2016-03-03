angular.module('devMtIn')
.controller('homeCtrl', function($scope, profileService, friendService) {
    //$scope.myProfile = profileService.checkForProfile();
    
    $scope.checkForProfile = function() {
        var profileId = JSON.parse(localStorage.getItem('profileId'));

        if (profileId) {
            profileService.checkForProfile(profileId.profileId)
            .then(function(profile) {
            $scope.myProfile = profile.data;
            })
            .catch(function(err) {
            console.error(err);
            });
        }
    }
    
    $scope.checkForProfile();
    
    $scope.sortOptions = [{
        display: 'Ascending'
      , value: false
      },
      {
        display: 'Descending'
      , value: true
      }
];
    profileService.serviceTest();
    
    $scope.editing = false;
    
    $scope.saveProfile = function(profile) {
        profileService.saveProfile(profile);
        $scope.editing = false;
    }
    
    $scope.deleteProfile = function(profile) {
        profileService.deleteProfile()
        .then(function(deletedProfile) {
            localStorage.removeItem('profileId');
            $scope.myProfile = {};
        })
        .catch(function(err) {
            console.error(err);
        });
        
        //profileService.deleteProfile(profile);
        //$scope.myProfile = profileService.checkForProfile();
    }
    
    $scope.findFriends = function(query) {
        friendService.findFriends($scope.myProfile._id, query)
        .then(function(response){
            $scope.potentialFriends = response.data;
            console.log($scope.potentialFriends);
        })
    }
    
    $scope.addFriend = function(friendId) {
        friendService.addFriend($scope.myProfile._id, friendId)
        .then(function(){
            $scope.checkForProfile;
        })
    }
});