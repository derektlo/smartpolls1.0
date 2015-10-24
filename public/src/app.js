angular.module('SmartPolls', ['ui.router', 'ngResource', 'chart.js'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //$urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true).hashPrefix('');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                controller: 'DashboardController',
                templateUrl: 'templates/pollList.html'
            })
            .state('newPoll', {
                url: '/new',
                controller: 'NewPollController',
                templateUrl: 'templates/newPoll.html'
            })
            .state('singlePoll', {
                url: '/dashboard/:pollId',
                controller: 'SinglePollController',
                templateUrl: 'templates/singlePoll.html',
                params: { pollId: null }
            });
    });

angular.module('SmartPollsAnswers', ['ui.router', 'ngResource', 'chart.js'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('');

        $stateProvider
            .state('answerSplash', {
                url: '/answer',
                controller: 'AnswerSplashController',
                templateUrl: 'templates/answerSplash.html',
            })
            .state('answers', {
                url: '/answer/:username',
                controller: 'AnswersController',
                templateUrl: 'templates/answerList.html',
                params: { username: null }
            })
            .state('answerPoll', {
                url: '/answer/:username/:pollId',
                controller: 'ResponseController',
                templateUrl: 'templates/answerPoll.html',
                params: { pollId: null }
            });
    });
