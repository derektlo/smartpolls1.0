angular.module('SmartPolls')
    .factory('Poll', function ($resource) {
        return $resource('/api/polls/:id', { id: '@_id' }, {
            'update': { method: 'PUT' }
        });
    });
