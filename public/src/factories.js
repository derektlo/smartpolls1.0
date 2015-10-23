angular.module('SmartPolls')
    .factory('Poll', function ($resource) {
        return $resource('/api/polls/:id', { id: '@id' }, {
            'update': { method: 'PUT' }
            //'delete': {method: 'DELETE'}
        });
    });
