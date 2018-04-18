export default function PolymerBindDirective($parse: any): ng.IDirective {
	var directive: ng.IDirective = <ng.IDirective>{};
	directive.restrict = "A";
	directive.scope = false;
	directive.compile = function bindPolymerCompile(el, attr) {
		var attrMap = {};
		for (var prop in attr) {
			if (angular.isString(attr[prop])) {
				var _match = attr[prop].match(/\{\{\s*([\.\w-$]+)\s*\}\}/);
				if (_match) {
					attrMap[prop] = $parse(_match[1]);
				}
			}
		}
		return function bindPolymerLink(scope, element, attrs) {
			Object.keys(attrMap).forEach(function (key) {
				console.log("KEY: ", key);
				element.on(key + '-changed', function (event: any) {
					scope.$evalAsync(function () {
						if (attrMap[key](scope) === event.detail.value) {
							return;
						}
						attrMap[key].assign(scope, event.detail.value);
					});
				});
			});
		};
	};

	return directive;
}
