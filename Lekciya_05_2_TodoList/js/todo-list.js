"use strict";

var TaskClass = function (name) {
    this.name = name;
    this.id = generateId();

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

var ViewClass = function (controller) {
    var addForm = document.getElementById("add-form");
    var addInput = document.getElementById("add-text");
    var listBlock = document.getElementById("list-block");

    addForm.addEventListener("submit", addNewTask);
    addInput.focus();

    function addNewTask() {
        var newTask = controller.addNewTask(addInput.value);
        if (newTask !== null) {
            listBlock.appendChild(getTaskAsHTML(newTask));
        } else {
            showError("You need to type some text.");
        }
        addInput.value = "";
        addInput.focus();
    }

    function deleteTask(event) {
        var id = event.target.id;
        if (controller.deleteTask(id)) {
            var element = document.getElementById("div-" + id);
            element.removeEventListener("click", deleteTask);
            listBlock.removeChild(element);
        }
    }

    function getTaskAsHTML(task) {
        var parent = document.createElement("div");
        parent.setAttribute("class", "list-element");
        parent.setAttribute("id", "div-" + task.id);
        var child = document.createElement("button");
        child.setAttribute("title", "Task done!");
        child.setAttribute("id", task.id);
        child.innerHTML = 'x';
        parent.appendChild(child);
        parent.append(" ", task.name);
        parent.addEventListener("click", deleteTask);
        return parent;
    }

    function showError(text) {
        alert(text);
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
