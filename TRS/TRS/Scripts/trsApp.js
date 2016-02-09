/// <reference path="knockout-3.4.0.debug.js" />
/// <reference path="jquery-1.10.2.js" />
/// <reference path="knockout-3.4.0.js" />

var ViewModel = function () {
    var self = this;
    self.users = ko.observableArray([]);
    self.user = ko.observable('');
    self.pwd = ko.observable('');
    self.getUsers = function () {
        return $.getJSON('api/users', function (results) {
            self.users(results);
        });
    };
    self.validateUser = function () {
        var user = self.users().find(function (u) {
            return u.Name === self.user() && u.Pwd === self.pwd();
        });
        var valid = user? true: false;        
        self.userIsValid(valid);        
    }
    self.userIsValid = ko.observable(false);
    self.getTrs = function () {
        return $.getJSON('api/translation', function (result) {
            self.trs(result);
        });
    };
    self.trs = ko.observableArray([]);
    self.selected = ko.observable(null);
    self.selectedText = ko.observable('Click a phrase');
    self.translation = ko.observable('');
    self.trsClick = function (item) {
        self.selected(item);
        self.selectedText(item.Text);
        $.post('api/translation/block', { id: item.TransId, user: self.user() }).done(function() {
            $("table td").removeClass();
            $("table td[id=" + item.TransId + "]").toggleClass("active");
            $("#save").removeClass("btn-success");
            $("#save").addClass("btn-default");
        });
    };
    self.save = function () {
        // TODO: MRB check input length and set error message if invalid.
        self.selected().Spanish = self.translation();
        self.selected().user = self.user();
        console.log(self.selected());
        $.post('api/translation', self.selected()).done(function () {
            self.selectedText("");
            self.translation("");
            // Remove selected from array
            self.trs($.grep(self.trs(), function (o) { return o.TransId !== self.selected().TransId }));
            // Get max ID from the array
            // Get value top 1 next id            
            // add new translation to array
            var id = self.trs()[self.trs().length - 1].TransId;
            $.getJSON('api/translation/' + id, function (result) {
                self.trs.push(result);
            });
        }).fail(function (data) {

        });
        $("#save").removeClass("btn-default");
        $("#save").addClass("btn-success");
    }
    self.user = ko.observable(null);
    //var trans = [{ "TransId": 1, "TransKey": "ABOUT_DATABASECREATEDBY", "Text": "Created By", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 2, "TransKey": "ABOUT_DATABASECREATIONDATE", "Text": "Creation Date", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 3, "TransKey": "ABOUT_DATABASECREATIONMACHINE", "Text": "Created on Machine", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 4, "TransKey": "ABOUT_DATABASEDESCRIPTION", "Text": "Description", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 5, "TransKey": "ABOUT_DATABASEDETAILS", "Text": "Database Details", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 6, "TransKey": "ABOUT_DATABASEID", "Text": "Identifier", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 7, "TransKey": "ABOUT_DATABASEMASTERDATABASEID", "Text": "Master Database Id", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 8, "TransKey": "ABOUT_DOWNLOAD", "Text": "Download Version Details", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 9, "TransKey": "ABOUT_DOWNLOADVERSIONINFORMATION", "Text": "Downloads a text file containing the version information", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 10, "TransKey": "ABOUT_MIT_LICENSING", "Text": "Where an MIT license is mentioned, this is a license of the form presented here:", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }];
    //viewModel.trs = trans;

};


$(function () {
    var vm = new ViewModel();        
    ko.applyBindings(vm);    
    vm.getUsers();
    vm.getTrs();
});
