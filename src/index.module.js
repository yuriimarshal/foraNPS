;(function () {

    'use strict';

    angular
        .module('fora', [
            'ngMaterial',
            'ngAnimate',
            'ngMessages',
            'toastr',
            'ui.router',
            'ngStorage',
            'angular-loading-bar',

            'core'
        ])
        .run(run);

    /** @ngInject */

    function run($sessionStorage, $rootScope) {
        if ($sessionStorage.user) {
            $rootScope.user = $sessionStorage.user;
        }
        $rootScope.$on("$stateChangeSuccess", function () {
            window.scrollTo(0, 0);
        });
    }
})();