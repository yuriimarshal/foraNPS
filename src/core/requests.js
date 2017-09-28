;(function () {

    'use strict';

    angular
        .module('http.module', [])
        .factory('http', http);

    /** @ngInject */

    function http($http, $sessionStorage, toastr, $q, $rootScope) {
        return {
            get: function (url, data, ignoreLB) {
                return request('GET', url, data, ignoreLB);
            },
            post: function (url, data, ignoreLB) {
                return request('POST', url, data, ignoreLB);
            },
            delete: function (url, data, ignoreLB) {
                return request('DELETE', url, data, ignoreLB);
            },
            put: function (url, data, ignoreLB) {
                return request('PUT', url, data, ignoreLB);
            },
            file: function (url, data, ignoreLB) {
                return requestFile(url, data, ignoreLB);
            }
        };

        function request(method, url, data, ignoreLB) {
            $rootScope.loading = true;

            var config = {
                dataType: 'json',
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };

            if (method === 'PUT') {
                if (data.id) {
                    config.params = data;
                }
                else {
                    config.data = data;
                }
            }
            else if (method === 'POST') {
                config.data = data;
            }
            else {
                config.params = data;
            }

            if ($sessionStorage.UADuser) {
                config.url = url + '?auth_key=' + $sessionStorage.UADuser.auth_key;
            }
            else {
                config.url = url;
            }

            config.ignoreLoadingBar = ignoreLB;

            return $http(config)
                .then(requestComplete)
                .catch(requestFailed);
        }

        function requestFile(url, data) {
            $rootScope.loading = true;

            var config = {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            };

            if ($sessionStorage.UADuser.auth_key) {
                url = url + '?auth_key=' + $sessionStorage.UADuser.auth_key;
            }

            return $http.post(url, data, config)
                .then(requestComplete)
                .catch(requestFailed);
        }

        function requestFailed(err) {
            console.info('error', err.config.url, err);

            if (err.data === null || !err.data.error) {
                if (err.status === 200) {
                    toastr.error('Server Error', err.data);
                }
                else if (err.status === 0) {
                    toastr.error('Error', 'Server unavailable');
                }
                else if (err.status === -1) {
                    toastr.error('No internet connection');
                }
                else if (err.status === 500) {
                    toastr.error('Server Error', err.status + ' ' + err.data.message);
                }
                else {
                    toastr.error(err.data.message, 'Error');
                }
            }
            else {
                toastr.error('Error', err.data.error);
            }

            $rootScope.loading = false;

            return $q.reject(err.data);
        }

        function requestComplete(response) {
            var promise = $q.defer();

            console.info(response.config.url + '\n', response.data);

            if (!response.data.error) {
                promise.resolve(response.data);
            }
            else {
                promise.reject(response);
            }

            $rootScope.loading = false;

            return promise.promise;
        }
    }
})();