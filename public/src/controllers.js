angular.module('SmartPolls')
    .controller('DashboardController', function ($scope, $rootScope, Poll, $location) {
        console.log("in dashboard controller");
        $rootScope.PAGE = "all";
        $scope.polls = Poll.query();

        // $scope.show = function (id) {
        //     $location.url('/poll/' + id);
        // };
    })
    .controller('NewPollController', function ($scope, $rootScope, Poll, $location) {
        console.log("new poll");
        $rootScope.PAGE = "new";
        $scope.newPoll = new Poll({
            name:       ['', 'text'],
            parameters: ['', 'array'],
            values:     ['', 'array'],
            userId:     ['', 'text']
        });

        $scope.save = function () {
            if ($scope.newPoll.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                $scope.newPoll.$save();
                $location.url('/polls');
            }
        };
    })
    .controller('SinglePollController', function ($scope, $rootScope, $location, Poll, $routeParams) {
        $rootScope.PAGE = "single";
        $scope.contact = Contact.get({ id: parseInt($routeParams.id, 10) });
        $scope.delete = function () {
            $scope.contact.$delete();
            $location.url('/polls');
        };
    });
