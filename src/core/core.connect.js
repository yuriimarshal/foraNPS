;(function () {

    'use strict';

    angular.module('directives.module', []);
    angular.module('factories.module', []);
    angular.module('services.module', []);
    angular.module('filters.module', []);

    angular.module('core', [
        'ngMaterial',
        'ngStorage',
        'ngMessages',
        'ui.router',
        'toastr',

        'url.module',
        'http.module',
        'factories.module',
        'filters.module',
        'services.module',
        'directives.module'
    ]);
})();