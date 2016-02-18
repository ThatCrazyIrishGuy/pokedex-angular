var myApp = angular.module('myApp', []);

myApp.controller('PokedexController',
    function PokedexController($scope, $http) {
        $scope.details = {};
        $scope.change = function() {
            $http.get("http://pokeapi.co/api/v1/pokemon/" + $scope.search + '/')
                .success(function(pokemon) {
                    //console.log(pokemon);
                    $scope.details = pokemon;
                    $scope.related = pokemon.evolutions;
                    //console.log($scope.related);
                    $scope.details.sprite = 'http://pokeapi.co/media/img/' + pokemon.national_id + '.png'
                    $http.get("http://pokeapi.co" + pokemon.descriptions[0].resource_uri)
                        .success(function(detail) {
                            //console.log(detail);
                            $scope.details.description = detail.description;
                        });
                });
        }
        $scope.update = function(pokemon) {
            var name = pokemon.to;
            $scope.search = name.toLowerCase();
            $scope.change();
        }
    });
