"use strict";

var dbManagerClass = function() {
    var database = firebase.database();
    var dbTasksPath = "/tasks";

    this.saveTask = function(task) {
        database.ref(dbTasksPath).child(task.id).set({
            id: task.id,
            name: task.name
        });
    };

    this.deleteTask = function (id) {
        database.ref(dbTasksPath).child(id).remove();
    };

    this.loadTasks = function () {
        database.ref(dbTasksPath).once("value", function (snapshot) {
            console.log(snapshot.val());
            return snapshot.val();
        });
    };
};

var TaskClass = function (name) {
    this.name = name;
    this.id = generateId();

    function generateId() {
        return (new Date()).getTime();
    }
};

var TaskListClass = function (dbManager) {
    var list = {};
    this.dbManager = dbManager;

    this.add = function (text) {
        if (text.length === 0) {
            return null;
        }
        var newTask = new TaskClass(text);
        this.dbManager.saveTask(newTask);
        list[newTask.id] = newTask;
        return newTask;
    };

    this.delete = function (id) {
        if (list[id] === undefined) {
            return false;
        }
        this.dbManager.deleteTask(id);
        delete list[id];
        return true;
    };

    this.getTasks = function() {
        this.list = this.dbManager.loadTasks();
        console.log(list);
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

    this.showTasks = function () {
        controller.getTasks();
    };

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

    this.getTasks = function () {
        this.taskList.getTasks();
        return this.taskList;
    };

    this.addNewTask = function (text) {
        return this.taskList.add(text);
    };

    this.deleteTask = function (id) {
        return this.taskList.delete(id);
    };
};

$(function () {
    var taskList = new TaskListClass(new dbManagerClass());
    var controller = new ControllerClass(taskList);
    var view = new ViewClass(controller);
    view.showTasks();
});