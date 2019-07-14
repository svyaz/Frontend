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
    var addInput = $("#add-text");

    $("#add-form").submit(function (event) {
        event.preventDefault();
        var newTask = controller.addNewTask(addInput.val());

        if (newTask !== null) {
            $("#list-block").append(getTaskObject(newTask));
        } else {
            showError("You need to type some text.");
        }

        addInput.val("");
        addInput.focus();
    });

    addInput.focus();

    function deleteTask(event) {
        event.preventDefault();
        var id = event.target.id;

        if (controller.deleteTask(id)) {
            $("#div-" + id).off().remove();
        }
        addInput.focus();
    }

    function getTaskObject(task) {
        var parent = $("<div></div>")
            .attr("class", "list-element")
            .attr("id", "div-" + task.id);

        var child = $("<button></button>")
            .attr("title", "Task done!")
            .attr("id", task.id)
            .html("x");

        child.appendTo(parent);
        parent.append(" " + task.name);
        parent.click(deleteTask);

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

$(function () {
    var taskList = new TaskListClass();
    var controller = new ControllerClass(taskList);
    new ViewClass(controller);
});