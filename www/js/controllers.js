angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('LoginCtrl', function($scope,$ionicLoading,$ionicPopup,
                                  $state,Usuarios,Conexion) {
        $scope.usuario={};



        $scope.iniciarSesion=function(){
            if(Conexion.getEstado())
                alert("Con red");
            else
                alert("Sin red");
            $ionicLoading.show(
                {
                    template:'Validando cuenta de usuario'

                });

            Usuarios.validarUsuario($scope.usuario).then(
                function(res){
                    $ionicLoading.hide();
                    if(res.length>0) {
                        localStorage.usuario = JSON.stringify(res[0]);
                        $state.go("tab.blocs");
                    }
                    else{
                        $ionicPopup.alert({
                            template:'Credenciales incorrectas',
                            title: '¡Error!'
                        });
                    }
                },
                function(err){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'Error al validar el usuario',
                        title: '¡Error!'
                    });
                });
        };




        if(localStorage.usuario){
            $scope.usuario=JSON.parse(localStorage.usuario);

            $scope.iniciarSesion();


        }
    })

.controller('RegistroCtrl', function($scope,$http,$state,
                                     $ionicLoading,$ionicPopup) {
        $scope.usuario={};
        $scope.registro=function(){
            var url="https://awnotepad.azure-mobile.net/tables/usuarios";
            $http.defaults.headers.common={
                'X-ZUMO-APPLICATION':'dpRuizzhXZcJOEFKRujsFLigRMUTHQ39',
                'Access-Control-Allow-Origin':'*'

            };

            $ionicLoading.show(
                {
                    template:'Creando cuenta de usuario'

                }

            );

            $http.post(url,$scope.usuario).then(
                function(res){
                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        template:'Usuario creado con exito',
                        title: '¡Exito!'

                    });

                    $state.go("noLogin.login");

                }
                ,
                function(err){
                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        template:'Error al crear el usuario',
                        title: '¡Error!'

                    });

                }


            );


        }




    })

.controller('BlocsCtrl', function($scope,Blocs) {
        $scope.blocs=[];

        var us=JSON.parse(localStorage.usuario);
        Blocs.getBlocs(us.id).then(function(res){

            $scope.blocs=res;
            $scope.apply();

        },
        function(err){
            alert(err);

        });
    })

.controller('BlocDetailCtrl', function($scope, $stateParams, Notas) {

  $scope.notas=[];
        Notas.getNotasPorBloc($stateParams.blocId).then(
            function(res){
                $scope.notas=res;
                $scope.apply();
            },
            function(err){
                alert(err);
            }
        );



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
