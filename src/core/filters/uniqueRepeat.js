;(function () {

    'use strict';

    angular
        .module('filters.module')
        .filter('unique', unique);

    /** @ngInject */

    function unique() {
        return function (arr, field) {
            var o = {}, i, l = arr.length, r = [];
            for (i = 0; i < l; i += 1) {
                o[arr[i][field]] = arr[i];
            }
            for (i in o) {
                r.push(o[i]);
            }
            return r;
        };
    }
})();