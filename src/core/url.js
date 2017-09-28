;(function () {

    'use strict';

    angular
        .module('url.module', [])
        .factory('url', url);

    /** @ngInject */

    function url() {
        var baseUrl = 'https://uadating.online/viva/api/web/v1/';

        return {
            user: {
                countries: baseUrl + 'default/country-all'
            }
        }
    }
})();