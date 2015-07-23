angular.module('tooltips', [])
    .directive('tooltip', function () {
        'use strict';
        return {
            scope: true,
            require: '^?tooltipList',
            link: function (scope, element, attrs, ctrl) {
                scope.toggleClass = function () {
                    var toggled = false;
                    if (element.hasClass('active')) {
                        element.removeClass('active');
                        toggled = true;
                    }
                    return toggled;
                };
                scope.toggle = function () {
                    if (!scope.toggleClass()) {
                        ctrl.toggle(element);
                    }
                };
            }
        };
    })
    .directive('tooltipList', function () {
        'use strict';
        return {
            scope: true,
            controller: function ($scope, $element) {
                var bodyEl = angular.element(document.querySelector('body')),
                    tooltips = angular.element($element[0].querySelectorAll('.module-tooltip'));
                // check which tooltip is active and do X
                this.toggle = function (elem) {
                    // close all tooltips
                    tooltips.removeClass('active');
                    // open selected tooltip
                    elem.addClass('active');
                };
                bodyEl.bind('click', function (event) {
                    // ignore clicks on tooltips = when not a tooltip element
                    if (!angular.element(event.target.nodeName).hasClass('tooltip-trigger')) {
                        tooltips.removeClass('active');
                    }
                });

            }
        };
    });
