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
.factory('Conexion', function() {


  return {
    getEstado:function(){

        try{
            var conn=navigator.connection.type;

            if(conn.NONE || conn.UNKNOWN || conn.CELL)
                return false;
            return true;


        }catch (e){

            alert(e.toString());
        }

    }

  }
});
