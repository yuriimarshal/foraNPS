;(function () {

    'use strict';

    angular
        .module('services.module')
        .service('user', user);

    /** @ngInject */

    function user(http, url, $sessionStorage) {
        return {
            getClient: getClient
        };

        function getClient() {
            return $sessionStorage.user;
        }

        function saveProfile(data, callback) {
            return http.put(url.user.saveProfile, data)
                .then(function (res) {
                    callback(res);
                });
        }
    }
})();