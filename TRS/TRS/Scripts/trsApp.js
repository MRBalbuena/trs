/// <reference path="knockout-3.4.0.debug.js" />
/// <reference path="jquery-1.10.2.js" />
/// <reference path="knockout-3.4.0.js" />

var STATE_BLOCKED_BY = 'Phrase bloked by: ';
var STATE_NO_MESSAGE = '';
var STATE_TRANSLATION_EMPTY = 'Please set a translation.';
var STATE_SAVE_ERROR = 'An error has ocurred trying to save. Please try again';

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
            return u.Name.toLowerCase() === self.user().toLowerCase() && u.Pwd === self.pwd();
        });
        var valid = user ? true : false;
        self.userIsValid(valid);
    }
    self.userIsValid = ko.observable(false);
    self.getTrs = function () {
        $.getJSON('api/translation/stats', function (result) {
            $('.progress-bar').attr('style', 'width: ' + result.TranslationsPercent.toFixed(2) + '%');
            $('.progress-bar').attr('title', 'Phrases Translated: ' + result.Translated + ', (' + result.TranslationsPercent.toFixed(2) + '%)');
        });
        return $.getJSON('api/translation', function (result) {
            self.trs(result);
            self.selectedText("");
            self.translation("");
        });
    };
    self.trs = ko.observableArray([]);
    self.selected = ko.observable(null);
    self.selectedText = ko.observable('Click a phrase');
    self.translation = ko.observable('');
    self.trsClick = function (item) {
        self.translation('');
        setMessage(STATE_NO_MESSAGE);
        self.selected(item);
        self.selectedText(item.Text);
        $.post('api/block', "=" + item.TransId + "," + self.user()).done(function (result) {
            var rowStyle = "active";
            var btnStyle = "btn-default";
            $("#save").removeAttr("diabled");
            self.disabled(false);
            $("#save").removeClass("btn-success");
            $("#save").removeClass("btn-danger");
            $("table td").removeClass();
            if (result && result != self.user()) {
                var rowStyle = "danger";
                var btnStyle = "btn-danger";
                setMessage(STATE_BLOCKED_BY, result);
                $("#save").attr("diabled", "disabled");
                self.disabled(true);
            }
            $("table td[id=" + item.TransId + "]").attr("class", rowStyle);
            $("#save").addClass(btnStyle);
        });
    };
    self.save = function () {
        if (self.disabled()) return;
        if (!self.translation()) {
            setMessage(STATE_TRANSLATION_EMPTY);
            $("#save").addClass("btn-danger");
            return;
        }
        self.selected().Spanish = self.translation();
        self.selected().TransBy = self.user();
        console.log(self.selected());
        $.post('api/translation', self.selected()).done(function () {
            self.getTrs();
        }).fail(function (data) {

        });
        $("#save").removeClass("btn-default").removeClass("btn-danger");
        $("#save").addClass("btn-success");
    }
    self.user = ko.observable(null);
    self.message = ko.observable('');
    self.disabled = ko.observable(false);
    self.searchResult = ko.observableArray();
    self.displaySearchResult = ko.observable(false);
    self.wordFilter = ko.observable('');
    self.getSearch = function () {
        if(self.wordFilter())        
        {
            $.getJSON('api/translation/searchByWords', 'words=' + self.wordFilter(), function (result) {
                self.searchResult(result);
                self.displaySearchResult(true);
            });
        } else {
            self.searchResult(null);
            self.displaySearchResult(false);
        }
    };    
    //var trans = [{ "TransId": 1, "TransKey": "ABOUT_DATABASECREATEDBY", "Text": "Created By", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 2, "TransKey": "ABOUT_DATABASECREATIONDATE", "Text": "Creation Date", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 3, "TransKey": "ABOUT_DATABASECREATIONMACHINE", "Text": "Created on Machine", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 4, "TransKey": "ABOUT_DATABASEDESCRIPTION", "Text": "Description", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 5, "TransKey": "ABOUT_DATABASEDETAILS", "Text": "Database Details", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 6, "TransKey": "ABOUT_DATABASEID", "Text": "Identifier", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 7, "TransKey": "ABOUT_DATABASEMASTERDATABASEID", "Text": "Master Database Id", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 8, "TransKey": "ABOUT_DOWNLOAD", "Text": "Download Version Details", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 9, "TransKey": "ABOUT_DOWNLOADVERSIONINFORMATION", "Text": "Downloads a text file containing the version information", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }, { "TransId": 10, "TransKey": "ABOUT_MIT_LICENSING", "Text": "Where an MIT license is mentioned, this is a license of the form presented here:", "Spanish": null, "BlockedBy": null, "BlockedTime": null, "TransBy": null, "TransDate": null, "CheckedBy": null, "CheckedTime": null, "RejectedBy": null, "RejectedTime": null }];
    //viewModel.trs = trans;

    function setMessage(state, value) {
        if (state === STATE_NO_MESSAGE) self.message('');
        if (state === STATE_BLOCKED_BY) self.message(STATE_BLOCKED_BY + ' ' + value);
        if (state === STATE_TRANSLATION_EMPTY) self.message(STATE_TRANSLATION_EMPTY);
        $("table td[id=message]").attr("class", "warning");
    }

};


$(function () {
    var vm = new ViewModel();
    ko.applyBindings(vm);
    vm.getUsers();
    vm.getTrs();
    $('#userName').focus();
});
