"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var ERR_MSG_EMPTY_ITEM_TEXT = "You need to type some text.";

    var vm = new Vue({
        el: "#app",
        data: {
            newText: "",
            list: []
        },
        methods: {
            focus: function () {
                this.$refs.addText.focus();
            },
            addItem: function () {
                if (this.newText === "") {
                    this.showError(ERR_MSG_EMPTY_ITEM_TEXT);
                    return;
                }
                this.list.push({
                    id: (new Date()).getTime(),
                    text: this.newText
                });
                this.newText = "";
            },
            updateList: function(list) {
                this.list = list;
            },
            showError: function (text) {
                alert(text);
            }
        },
        mounted() {
            this.focus();
        },
        updated() {
            this.focus();
        }
    });

    Vue.component("todo-list", {
        props: ["items"],
        data: function () {
            return {
                items: this.items
            };
        },
        template: "#todo-list-template",
        methods: {
            removeItem: function (item) {
                this.items = this.items.filter(function (e) {
                    return e.id !== item.id;
                });
                this.$emit("update-list", this.items);
            }
        }
    });

    Vue.component("todo-item", {
        props: ["item"],
        template: "#todo-item-template",
        methods: {
            remove: function () {
                this.$emit("remove-item", this.item);
            }
        }
    });
});
