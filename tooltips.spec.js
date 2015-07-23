describe('tooltips -', function () {
    'use strict';

    var el,
        bodyEl,
        scope,
        tplList,
        tplTip,
        tplTipActive,
        fixture,
        tipEl,
        tipsEl,
        ctrl,
        tipElActive;

    jasmine.getFixtures().fixturesPath = 'base/src/common/tooltips/';
    fixture = jasmine.getFixtures().read('tooltips.fixture.html');

    beforeEach(module('tooltips'));
    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        bodyEl = angular.element(document.querySelector('body'));
        el = angular.element(fixture);
        tipsEl = angular.element(el[0].querySelectorAll('.module-tooltip'));
        tipEl = angular.element(el[0].querySelectorAll('.module-tooltip')).eq(0);
        tipElActive = angular.element(el[0].querySelectorAll('.module-tooltip')).eq(1);
        tplList = $compile(el)(scope);
        tplTip = angular.element(tplList[0].querySelectorAll('.module-tooltip')).eq(0);
        tplTipActive = angular.element(tplList[0].querySelectorAll('.module-tooltip')).eq(1);
        ctrl = el.controller('tooltipList');
        scope.$apply();
    }));

    describe('tooltip-list directive', function () {
        it('should test open selected tooltip case', function () {
            ctrl.toggle(tipEl);
            expect(tipEl.hasClass('active')).toBe(true);
        });

        it('should test toggleClass function without active component', function () {
            tplTip.scope().toggleClass();
            expect(tipEl.hasClass('active')).toBe(false);
        });

        it('should test toggleClass function with active component', function () {
            tplTipActive.scope().toggleClass();
            expect(tipElActive.hasClass('active')).toBe(false);
        });

        it('should test toggle function of tooltip directive without active component', function () {
            spyOn(ctrl, 'toggle');
            tplTip.scope().toggle();
            expect(ctrl.toggle).toHaveBeenCalled();
        });

        it('should test toggle function  of tooltip directive with active component', function () {
            spyOn(ctrl, 'toggle');
            tplTipActive.scope().toggle();
            expect(ctrl.toggle).not.toHaveBeenCalled();
        });

        it('should test case: ignore clicks on tooltips if not a tooltip element', function () {
            bodyEl.trigger('click');
            expect(tipsEl.hasClass('active')).toBe(false);
        });
    });
});