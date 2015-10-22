angular.module('SmartPolls')
    .controller('DashboardController', function ($scope, $rootScope, Poll, $state) {
        $scope.polls = Poll.query();
        console.log("polls: ", $scope.polls);
        $scope.show = function (id) {
            console.log(id);
            $state.go('singlePoll', {pollId : id});
        };
    })
    .controller('NewPollController', function ($scope, $rootScope, Poll, $state) {
        $rootScope.PAGE = "new";
        $scope.strParams = '';
        $scope.poll = new Poll({
            name:       ['', 'text'],
            parameters: ['', 'array'],
            values:     ['', 'array'],
            userId:     ['', 'text']
        });

        $scope.save = function () {
            $scope.poll.parameters = $scope.strParams.split(",");
            if ($scope.newPoll.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                $scope.poll.$save();
                $state.go('dashboard');
            }
        };
    })
    .controller('SinglePollController', function ($scope, $rootScope, $state, Poll) {
        $rootScope.PAGE = "single";
        console.log($state.params.pollId);
        Poll.get({ id: $state.params.pollId }, function(poll){
            console.log(poll.parameters);
            $scope.poll = poll;
            $scope.labels = $scope.poll.parameters;
            $scope.data = [300, 500, 100];
        });
        // console.log("Viewing poll: ", $scope.poll);
        // console.log("Hm ", $scope.poll.parameters);


        $scope.delete = function () {
            $scope.poll.$delete();
            $state.go('dashboard');
        };
    });
