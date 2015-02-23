angular.module('starter.services', [])

    .factory('Usuarios', function($http,$q) {
        var url="https://awnotepad.azure-mobile.net/tables/usuarios";
        $http.defaults.headers.common={
            'X-ZUMO-APPLICATION':'dpRuizzhXZcJOEFKRujsFLigRMUTHQ39',
            'Access-Control-Allow-Origin':'*'

        };

        return{
           validarUsuario:function(usuario){
               var query="?$filter=email eq '"+usuario.email+
                   "' and password eq '"+usuario.password+"'";
               var request=$http(
                   {
                       url:url+query,
                       method:'get'

                   });

               return request.then(ok,err);
           }
        }

        function ok(resp){
            return resp.data;

        }
        function err(resp){
            if(!angular.isObject(resp.data) || !resp.data.message){
                return($q.reject("Error desconocido"));

            }
            return ($q.reject(resp.data.message));
        }

    })


.factory('Blocs', function($http,$q) {
        var url="https://awnotepad.azure-mobile.net/tables/blocs";
        $http.defaults.headers.common={
            'X-ZUMO-APPLICATION':'dpRuizzhXZcJOEFKRujsFLigRMUTHQ39',
            'Access-Control-Allow-Origin':'*'

        };
  return {
    getBlocs:function(idUsuario){
        var query="?$filter=idUsuario eq '"+idUsuario+"'";
        var request=$http(
            {
                url:url+query,
                method:'get'

            });

        return request.then(ok,err);


    }

  }
        function ok(resp){
            return resp.data;

        }
        function err(resp){
            if(!angular.isObject(resp.data) || !resp.data.message){
                return($q.reject("Error desconocido"));

            }
            return ($q.reject(resp.data.message));
        }
})
    .factory('Notas', function($http,$q) {
        var url="https://awnotepad.azure-mobile.net/tables/notas";
        $http.defaults.headers.common={
            'X-ZUMO-APPLICATION':'dpRuizzhXZcJOEFKRujsFLigRMUTHQ39',
            'Access-Control-Allow-Origin':'*'

        };
        return {
            getNotasPorBloc:function(idBloc){
                var query="?$filter=idBloc eq '"+idBloc+"'";
                var request=$http(
                    {
                        url:url+query,
                        method:'get'

                    });

                return request.then(ok,err);


            }

        }
        function ok(resp){
            return resp.data;

        }
        function err(resp){
            if(!angular.isObject(resp.data) || !resp.data.message){
                return($q.reject("Error desconocido"));

            }
            return ($q.reject(resp.data.message));
        }
    })
/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
