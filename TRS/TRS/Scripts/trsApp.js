/// <reference path="knockout-3.4.0.debug.js" />
/// <reference path="jquery-1.10.2.js" />
/// <reference path="knockout-3.4.0.js" />
/// <reference path="jquery-1.10.2.js" />

var ViewModel = function () {
    var self = this;
    self.get = function () {
        return $.getJSON('api/translation', function (result) {
            //console.log(result);
            result.forEach(function(t) {
                t.selected = 'false';
                t.itemClass = '';
            });
            self.trs(result);
        });
    };
    self.trs = ko.observableArray([]);
    self.selected = ko.observable(null);
    self.selectedText = ko.observable('Click a phrase');
    self.trsClick = function(item) {
        self.selected(item);
        self.selectedText(item.Text);
        $("table td").removeClass();
        $("table td[id=" + item.TransId + "]").toggleClass("active");
        $("#save").removeClass("btn-success");
        $("#save").addClass("btn-default");
    };    
    self.save = function () {
        // TODO: MRB check input length and set error message if invalid.
        self.selected().Spanish = self.selectedText();
        console.log(self.selected);
        $.postJson('api/translation', self.selected(), function() {

        });
        $("#save").removeClass("btn-default");
        $("#save").addClass("btn-success");
    }

    //var trans = [{ "TransId": 1, "TransKey": "ABOUT_DATABASECREATEDBY", "Text": "Created By", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 2, "TransKey": "ABOUT_DATABASECREATIONDATE", "Text": "Creation Date", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 3, "TransKey": "ABOUT_DATABASECREATIONMACHINE", "Text": "Created on Machine", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 4, "TransKey": "ABOUT_DATABASEDESCRIPTION", "Text": "Description", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 5, "TransKey": "ABOUT_DATABASEDETAILS", "Text": "Database Details", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 6, "TransKey": "ABOUT_DATABASEID", "Text": "Identifier", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 7, "TransKey": "ABOUT_DATABASEMASTERDATABASEID", "Text": "Master Database Id", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 8, "TransKey": "ABOUT_DOWNLOAD", "Text": "Download Version Details", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 9, "TransKey": "ABOUT_DOWNLOADVERSIONINFORMATION", "Text": "Downloads a text file containing the version information", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 10, "TransKey": "ABOUT_MIT_LICENSING", "Text": "Where an MIT license is mentioned, this is a license of the form presented here:", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }];
    //viewModel.trs = trans;


};

$(function () {
    var vm = new ViewModel();
    ko.applyBindings(vm);
    vm.get();
});
