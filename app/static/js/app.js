var EmpowerMent = angular.module('EmpowerMent', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{a').endSymbol('a}');
});