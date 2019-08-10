"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var ERR_MSG_EMPTY_ITEM_TEXT = "You need to type some text.";

    var vm = new Vue({
        el: "#app",
        data: {
            item: "",
            list: []
        },
        methods: {
            focus: function() {
                this.$refs.addText.focus();
            },
            addItem: function () {
                if (this.item === "") {
                    this.showError(ERR_MSG_EMPTY_ITEM_TEXT);
                    return;
                }
                this.list.push(this.item);
                this.item = "";
                this.focus();
            },
            deleteItem: function(index) {
                this.list.splice(index, 1);
                this.focus();
            },
            showError: function (text) {
                alert(text);
            }
        }
    });

    vm.focus();
});
