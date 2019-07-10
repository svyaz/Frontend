"use strict";

var TaskClass = function (name) {
    this.name = escapeHtml(name);
    this.id = generateId();

    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
        });
    }

    function generateId() {
        return (new Date()).getTime();
    }
};

var TaskListClass = function () {
    var list = {};

    this.add = function (text) {
        if (text.length === 0) {
            return null;
        }
        var newTask = new TaskClass(text);
        list[newTask.id] = newTask;
        return newTask;
    };

    this.delete = function (id) {
        if (list[id] === undefined) {
            return false;
        }
        delete list[id];
        return true;
    };
};

var ViewClass = function (cont) {
    var controller = cont;
    var addForm = document.getElementById("add-form");
    var addInput = document.getElementById("add-text");
    var listForm = document.getElementById("list-form");

    addForm.addEventListener("change", addNewTask);
    addInput.focus();

    function addNewTask() {
        var newTask = controller.addNewTask(addInput.value);
        if (newTask != null) {
            listForm.appendChild(getTaskAsHTML(newTask));
        }
        addInput.value = "";
        addInput.focus();
    }

    function deleteTask(event) {
        var id = event.target.id;
        if (controller.deleteTask(id)) {
            var element = document.getElementById("div-" + id);
            element.removeEventListener("change", deleteTask);
            listForm.removeChild(element);
        }
    }

    function getTaskAsHTML(task) {
        var element = document.createElement("div");
        element.setAttribute("class", "list-element");
        element.setAttribute("id", "div-" + task.id);
        element.innerHTML = '<label><input type="checkbox" title="Task done!" id="' + task.id + '"> ' + task.name + '</label>';
        element.addEventListener("change", deleteTask);
        return element;
    }
};

var ControllerClass = function (taskList) {
    this.taskList = taskList;

    this.addNewTask = function (text) {
        return this.taskList.add(text);
    };

    this.deleteTask = function (id) {
        return this.taskList.delete(id);
    };
};

document.addEventListener("DOMContentLoaded", function () {
    var taskList = new TaskListClass();
    var controller = new ControllerClass(taskList);
    new ViewClass(controller);
});
