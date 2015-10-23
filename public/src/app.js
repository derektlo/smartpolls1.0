angular.module('SmartPolls', ['ui.router', 'ngResource', 'chart.js'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //$urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                controller: 'DashboardController',
                templateUrl: 'templates/dashboard.html'
            })
            .state('newPoll', {
                url: '/new',
                controller: 'NewPollController',
                templateUrl: 'templates/newPoll.html'
            })
            .state('singlePoll', {
                url: 'dashboard/:pollId',
                controller: 'SinglePollController',
                templateUrl: 'templates/singlePoll.html',
                params: { pollId: null }
            });
    });
