;(function () {

    'use strict';

    angular
        .module('factories.module')
        .factory('toast', toast);

    /** @ngInject */

    function toast($mdToast) {
        return {
            success: success,
            error: error,
            warning: warning
        };

        function success(text) {
            $mdToast.show(
                $mdToast.simple()
                    .highlightClass('md-primary')
                    .textContent(text)
                    .position('top right')
                    .hideDelay(3000)
            );
        }

        function error(text) {
            $mdToast.show(
                $mdToast.simple()
                    .highlightClass('md-warn')
                    .textContent(text)
                    .position('top right')
                    .hideDelay(3000)
            );
        }

        function warning(text) {
            $mdToast.show(
                $mdToast.simple()
                    .highlightClass('md-accent')
                    .textContent(text)
                    .position('top right')
                    .hideDelay(3000)
            );
        }
    }
})();