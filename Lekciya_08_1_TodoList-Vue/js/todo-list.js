"use strict";

$(function () {
    var ERR_MSG_EMPTY_ITEM_TEXT = "You need to type some text.";

    var vm = new Vue({
        el: "#app",
        data: {
            item: "",
            list: []
        },
        methods: {
            addItem: function () {
                if (this.item === "") {
                    this.showError(ERR_MSG_EMPTY_ITEM_TEXT);
                    return;
                }
                this.list.push(this.item);
                this.item = "";
                $("#add-text").focus();
            },
            deleteItem: function(index) {
                this.list.splice(index, 1);
            },
            showError: function (text) {
                alert(text);
            }
        }
    });

    $("#add-text").focus();
});