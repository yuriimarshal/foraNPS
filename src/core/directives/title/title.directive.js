;(function () {

    'use strict';

    angular
        .module('directives.module')
        .directive('title', title);

    function title($rootScope, $timeout) {
        return {
            link: function () {
                var listener = function (event, toState) {
                    $timeout(function () {
                        $rootScope.title = (toState.data && toState.data.pageTitle)
                            ? 'Fora - ' + toState.data.pageTitle
                            : 'Fora';
                    });
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        }
    }
})();