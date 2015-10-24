angular.module('SmartPolls')
    .controller('DashboardController', function ($scope, $rootScope, Poll, $state) {
        $scope.polls = Poll.query(function(){
            console.log($scope.polls);
            $scope.polls.forEach(function (poll) {
                timestamp = poll._id.substring(0,8);
                poll.date = new Date(parseInt( timestamp, 16 ) * 1000 );
            });
        });

        $scope.show = function (id) {
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
            $scope.poll.values = Array.apply(null, Array($scope.poll.parameters.length).map(Number.prototype.valueOf,0));
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
















angular.module('SmartPollsAnswers')
    .controller('AnswerSplashController', function ($scope, $rootScope, $state) {
        $scope.done = function (username) {
            console.log("username: ", username);
            $state.go('answers', {username : username});
        };
    })
    .controller('AnswersController', function ($scope, $rootScope, $state, Poll) {
        $scope.polls = Poll.query(function(){
            console.log($scope.polls);
            $scope.polls.forEach(function (poll) {
                timestamp = poll._id.substring(0,8);
                poll.date = new Date(parseInt( timestamp, 16 ) * 1000 );
            });
        });

        $scope.respond = function (id) {
            $state.go('singlePoll', {pollId : id});
        };
    });
