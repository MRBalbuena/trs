/// <reference path="knockout-3.4.0.debug.js" />
/// <reference path="jquery-1.10.2.js" />
/// <reference path="knockout-3.4.0.js" />
/// <reference path="jquery-1.10.2.js" />
$(function () {

    var viewModel =
    {        
            trs: ko.observableArray(),
            selected: ko.observable(),
            getClass: ko.computed(function(x) {
                if (!viewModel) return '';
                var context = ko.contextFor(this);
                if (context === viewModel.selected.TransId) return 'active';
                return '';
            })
    };

    //var trans = [{ "TransId": 1, "TransKey": "ABOUT_DATABASECREATEDBY", "Text": "Created By", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 2, "TransKey": "ABOUT_DATABASECREATIONDATE", "Text": "Creation Date", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 3, "TransKey": "ABOUT_DATABASECREATIONMACHINE", "Text": "Created on Machine", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 4, "TransKey": "ABOUT_DATABASEDESCRIPTION", "Text": "Description", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 5, "TransKey": "ABOUT_DATABASEDETAILS", "Text": "Database Details", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 6, "TransKey": "ABOUT_DATABASEID", "Text": "Identifier", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 7, "TransKey": "ABOUT_DATABASEMASTERDATABASEID", "Text": "Master Database Id", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 8, "TransKey": "ABOUT_DOWNLOAD", "Text": "Download Version Details", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 9, "TransKey": "ABOUT_DOWNLOADVERSIONINFORMATION", "Text": "Downloads a text file containing the version information", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 10, "TransKey": "ABOUT_MIT_LICENSING", "Text": "Where an MIT license is mentioned, this is a license of the form presented here:", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }];
    //viewModel.trs = trans;
    $.getJSON('api/translation', function (data) {
        console.log(data);
        viewModel.trs(data);
        viewModel.trs().forEach(t => t.selected = 'false');
        $(".trs-container").on('click', function () {            
            var context = ko.contextFor(this);
            viewModel.selected = context.$data;
            console.log(viewModel.selected);
        });
    });

    ko.applyBindings(viewModel);


    return viewModel;
});

