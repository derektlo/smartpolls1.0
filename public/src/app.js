angular.module('SmartPolls', ['ui.router', 'ngResource'])
    .config(function ($stateProvider, $urlRouterProvider) {
        //$urlRouterProvider.otherwise('/');
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
            .state('details', {
                url: '/:id',
                controller: 'SinglePollController',
                templateUrl: 'templates/singlePoll.html'
            });
    });
