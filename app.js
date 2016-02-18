var myApp = angular.module('myApp', []);

myApp.controller('PokedexController',
    function PokedexController($scope, $http) {
        $scope.details = {};
        $scope.search = "Pikachu";
        $scope.change = function() {
            $http.get("http://pokeapi.co/api/v1/pokemon/" + $scope.search.toLowerCase() + '/')
                .success(function(pokemon) {
                    console.log(pokemon);
                    $scope.details = pokemon;
                    $scope.related = pokemon.evolutions;
                    $scope.details.expandedMoves = [];
                    $scope.details.typeString = pokemon.types.map(function(elem){ return elem.name; }).join(",");
                    //console.log($scope.related);
                    $scope.details.sprite = 'http://pokeapi.co/media/img/' + pokemon.national_id + '.png'
                    $http.get("http://pokeapi.co" + pokemon.descriptions[pokemon.descriptions.length - 1].resource_uri)
                        .success(function(detail) {
                            //console.log(detail);
                            $scope.details.description = detail.description;
                        });
                    pokemon.moves.forEach(function(move) {
                        $http.get("http://pokeapi.co" + move.resource_uri)
                            .success(function(detail) {
                                $scope.details.expandedMoves.push(detail);
                            });
                    });
                });
        }
        $scope.update = function(pokemon) {
            var name = pokemon.to;
            $scope.search = name.toLowerCase();
            $scope.change();
        }
    });
