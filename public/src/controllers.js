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
            username:   ['', 'text']
        });

        $scope.save = function () {
            $scope.poll.parameters = $scope.strParams.split(",");
            $scope.poll.values = Array.apply(null, Array($scope.poll.parameters.length).map(Number.prototype.valueOf,0));
            if ($scope.newPoll.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                console.log("saving poll ", $scope.poll);
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
        var polls = Poll.get({id: $state.params.username}, function(){
            //console.log($scope.polls);
            console.log(polls);
            $scope.polls = polls.result;
            $scope.polls.forEach(function (poll) {
                timestamp = poll._id.substring(0,8);
                poll.date = new Date(parseInt( timestamp, 16 ) * 1000 );
            });
        });

        $scope.show = function (id) {
            $state.go('answerPoll', {username:$state.params.username, pollId : id});
        };
    })
    .controller('ResponseController', function($scope, $state, Poll) {
        Poll.get({ id: $state.params.pollId }, function(poll){
            $scope.poll = poll;
            $scope.parameters = poll.parameters;
            console.log("Poll: ", poll);
        });
        $scope.responseVal = 0;
        $scope.respond = function() {
            var polls = localStorage.getItem("polls");
            if (!polls) {
                polls = [];
            }
            console.log(polls.indexOf($scope.poll._id));
            if (polls.indexOf($scope.poll._id) == -1) {
                var newValues = $scope.poll.values;
                newValues[$scope.responseVal] = newValues[$scope.responseVal] + 1;
                $scope.poll.$update({values : newValues});
                polls.push($scope.poll._id);
                localStorage.setItem("polls", polls);
            }
        }
    });
