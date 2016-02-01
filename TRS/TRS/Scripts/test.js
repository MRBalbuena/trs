/// <reference path="knockout-3.4.0.debug.js" />
/// <reference path="knockout-3.4.0.js" />
/// <reference path="jquery-1.10.2.js" />

$(function () {
    function viewModel() {
        var self = this;
        self.model = {};
        self.model.Things = ko.observableArray([
            { ID: 1, Name: "Thing 1" },
            { ID: 2, Name: "Thing 2" },
            { ID: 3, Name: "Thing 3" }
        ]);
        self.model.CurrentDisplayThing = ko.observable(self.model.Things()[0]);
        self.selectThing = function (item) {
            self.model.CurrentDisplayThing(item);
        };
        self.doSomething = function (item) {
            alert(item.ID);
        }
    }
    ko.applyBindings(new viewModel());
});