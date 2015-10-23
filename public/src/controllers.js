angular.module('SmartPolls')
    .controller('DashboardController', function ($scope, $rootScope, Poll, $state) {
        $scope.polls = Poll.query(function(){

            $scope.polls.forEach(function (poll) {
                console.log(poll._id.substring(0,8));
                timestamp = poll._id.substring(0,8);
                poll.date = new Date(parseInt( timestamp, 16 ) * 1000 );
                console.log(poll.date);
            });
        });
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
        Poll.get({ id: $state.params.pollId }, function(poll){
            $scope.poll = poll;
            $scope.labels = $scope.poll.parameters;
            $scope.data = [300, 500, 100];
        });

        $scope.delete = function (pollId) {
            console.log("delete");
            $scope.poll.$delete();
            $state.go('dashboard');
        };
    });
