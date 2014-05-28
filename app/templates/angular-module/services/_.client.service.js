'use strict';

//<%= humanizedPluralName %> service used to communicate <%= humanizedPluralName %> REST endpoints
angular.module('mean.<%= slugifiedPluralName %>').factory('<%= classifiedPluralName %>', ['$resource',
	function($resource) {
		return $resource('<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', { <%= camelizedSingularName %>Id: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);