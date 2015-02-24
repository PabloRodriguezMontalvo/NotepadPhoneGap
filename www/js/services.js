angular.module('starter.services', [])

    .factory('Usuarios', function ($http, $q) {
        var url = "https://awnotepad.azure-mobile.net/tables/usuarios";
        $http.defaults.headers.common = {
            'X-ZUMO-APPLICATION': 'dpRuizzhXZcJOEFKRujsFLigRMUTHQ39',
            'Access-Control-Allow-Origin': '*'

        };


        return {
            validarUsuario: function (usuario) {
                var query = "?$filter=email eq '" + usuario.email +
                    "' and password eq '" + usuario.password + "'";
                var request = $http(
                    {
                        url: url + query,
                        method: 'get'

                    });

                return request.then(ok, err);
            }
        }

        function ok(resp) {
            return resp.data;

        }

        function err(resp) {
            if (!angular.isObject(resp.data) || !resp.data.message) {
                return ($q.reject("Error desconocido"));

            }
            return ($q.reject(resp.data.message));
        }

    })


    .factory('Blocs', function ($http, $q) {
        var url = "https://awnotepad.azure-mobile.net/tables/blocs";
        $http.defaults.headers.common = {
            'X-ZUMO-APPLICATION': 'dpRuizzhXZcJOEFKRujsFLigRMUTHQ39',
            'Access-Control-Allow-Origin': '*'

        };
        return {
            getBlocs: function (idUsuario) {
                var query = "?$filter=idUsuario eq '" + idUsuario + "'";
                var request = $http(
                    {
                        url: url + query,
                        method: 'get'

                    });

                return request.then(ok, err);


            }

        }
        function ok(resp) {
            return resp.data;

        }

        function err(resp) {
            if (!angular.isObject(resp.data) || !resp.data.message) {
                return ($q.reject("Error desconocido"));

            }
            return ($q.reject(resp.data.message));
        }
    })
    .factory('Notas', function ($http, $q) {
        var url = "https://awnotepad.azure-mobile.net/tables/notas";
        $http.defaults.headers.common = {
            'X-ZUMO-APPLICATION': 'dpRuizzhXZcJOEFKRujsFLigRMUTHQ39',
            'Access-Control-Allow-Origin': '*'

        };
        return {
            getNotasPorBloc: function (idBloc) {
                var query = "?$filter=idBloc eq '" + idBloc + "'";
                var request = $http(
                    {
                        url: url + query,
                        method: 'get'

                    });

                return request.then(ok, err);


            }

        }
        function ok(resp) {
            return resp.data;

        }

        function err(resp) {
            if (!angular.isObject(resp.data) || !resp.data.message) {
                return ($q.reject("Error desconocido"));

            }
            return ($q.reject(resp.data.message));
        }
    })
    .factory('Conexion', function () {


        return {
            getEstado: function () {

                try {
                    var conn = navigator.connection.type;

                    if (conn == Connection.NONE || conn == Connection.UNKNOWN ||
                        conn == Connection.CELL)
                        return false;
                    return true;


                } catch (e) {

                    alert(e.toString());
                }

            }

        }
    })
    .factory("Bbdd", function () {
        var db = openDatabase("Notas", "", "Base notas", 1024 * 1024,
            function (db) {
                db.transaction(function (tx) {
                        tx.executeSql("create table if not exists Blocs " +
                        "(id unique,nombre,img,descripcion)");

                        tx.executeSql("create table if not exists Notas " +
                        "(id unique,nombre,texto)");


                    },


                    function (err) {

                        alert(err.toString());

                    });
            });

        return {
            guardarBlocs: function (blocs) {
                var db = openDatabase("Notas", "", "Base notas", 1024 * 1024);

                db.transaction(function (tx) {
                    tx.executeSql("delete from Blocs");

                    for (var i = 0; i < blocs.length; i++) {

                        tx.executeSql("insert into Blocs values(?,?,?,?)",
                            [blocs[i].id, blocs[i].nombre, blocs[i].img,
                                blocs[i].descripcion]
                        );

                    }


                });


            },
            guardarNotas: function (notas) {
                var db = openDatabase("Notas", "", "Base notas", 1024 * 1024);

                db.transaction(function (tx) {
                    tx.executeSql("delete from Notas");

                    for (var i = 0; i < notas.length; i++) {

                        tx.executeSql("insert into Notas values(?,?,?)",
                            [notas[i].id, notas[i].nombre, notas[i].texto]
                        );

                    }


                });


            }

        }
    })
;
