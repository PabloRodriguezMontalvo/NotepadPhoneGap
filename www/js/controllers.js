angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('LoginCtrl', function($scope) {})

.controller('RegistroCtrl', function($scope,$http,$state) {
        $scope.usuario={};
        $scope.registro=function(){
            var url="https://awnotepad.azure-mobile.net/tables/usuarios";
            $http.defaults.headers.common={
                'X-ZUMO-APPLICATION':'dpRuizzhXZcJOEFKRujsFLigRMUTHQ39',
                'Access-Control-Allow-Origin':'*'

            };

            $http.post(url,$scope.usuario).then(
                function(res){
                    alert("Usuario creado con exito");
                    $state.go("noLogin.login");

                }
                ,
                function(err){
                   alert(err.message);

                }


            );


        }




    })

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
