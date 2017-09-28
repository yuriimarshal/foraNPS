;(function () {

    'use strict';

    angular
        .module('directives.module')
        .directive('keyPressCode', keyPressCode);

    function keyPressCode() {
        return {
            restrict: 'A',
            link: KeyPressCodeDirectiveLink
        };

        /** @ngInject */

        function KeyPressCodeDirectiveLink($scope, $element, $attrs) {
            $element.bind("keypress", function (event) {
                var keyCode = event.which || event.keyCode;

                if (keyCode === Number($attrs.code)) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.keyPressCode, {$event: event});
                    });
                }
            });
        }
    }
})();