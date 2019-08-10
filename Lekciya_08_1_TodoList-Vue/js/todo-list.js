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
                this.focus();
            },

            showError: function (text) {
                alert(text);
            }
        }
    });

    Vue.component("todo-list", {
        data: function () {
            return {
                items: vm.list
            };
        },
        template: "#todo-list-template",
        methods: {
            removeItem: function (item) {
                this.items = this.items.filter(function (e) {
                    return e.id !== item.id
                });
                vm.list = this.items;
                vm.focus();
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

    vm.focus();
});
