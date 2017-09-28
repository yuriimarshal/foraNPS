;(function () {

    'use strict';

    angular
        .module('fora')
        .config(ForaConfig);

    /** @ngInject */

    function ForaConfig($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home/home.html',
                controller: 'Home',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Home'
                }
            })
            // .state('profile', {
            //     url: '/profile/:success',
            //     templateUrl: 'templates/profile/profile.html',
            //     title: 'Profile',
            //     controller: 'Profile',
            //     controllerAs: 'vm',
            //     resolve: {
            //         eventsCalendar: [
            //             'calendar',
            //             function (calendar) {
            //                 return calendar.getEventsCurrentUser(function (res) {
            //                     return res;
            //                 });
            //             }
            //         ]
            //     },
            //     data: {
            //         pageTitle: 'Profile'
            //     }
            // });
    }
})();