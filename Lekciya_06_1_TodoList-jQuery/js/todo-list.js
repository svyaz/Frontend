"use strict";

$(function () {
    var taskList = new TaskListClass();
    var view = new ViewClass();
    var controller = new ControllerClass(taskList, view);
    controller.loadTasks();
});

var TaskClass = function (name) {
    this.name = name;
    this.id = generateId();

    function generateId() {
        return (new Date()).getTime();
    }
};

var TaskListClass = function () {
    var list = {};
    var database = firebase.database();
    var dbTasksPath = "/tasks";

    this.add = function (text) {
        if (text.length === 0) {
            return null;
        }
        var newTask = new TaskClass(text);
        saveTaskToDB(newTask);
        list[newTask.id] = newTask;
        return newTask;
    };

    this.delete = function (id) {
        if (list[id] === undefined) {
            return false;
        }
        deleteTaskFromDB(id);
        delete list[id];
        return true;
    };

    this.loadTasksFromDB = function (controller) {
        database.ref(dbTasksPath).orderByKey().once("value", function (snapshot) {
            list = snapshot.val();
            controller.updateTasksList(list);
        });
    };

    function saveTaskToDB(task) {
        database.ref(dbTasksPath).child(task.id).set({
            id: task.id,
            name: task.name
        });
    }

    function deleteTaskFromDB(id) {
        database.ref(dbTasksPath).child(id).remove();
    }
};

var ViewClass = function () {
    var addInput = $("#add-text");
    addInput.focus();

    this.registerAddListener = function (controller) {
        $("#add-form").submit(function (event) {
            event.preventDefault();
            var newTask = controller.addNewTask(addInput.val());

            if (newTask !== null) {
                $("#list-block").append(getTaskObject(newTask, controller));
            } else {
                showError("You need to type some text.");
            }
            addInput.val("");
            addInput.focus();
        });
    };

    this.initDialog = function () {
        $("#error-dialog").dialog({
            dialogClass: "no-close",
            autoOpen: false,
            modal: true,
            draggable: true,
            width: 500,
            title: "Error message",
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    };

    this.showTasks = function (list, controller) {
        $.each(list, function (index, task) {
            $("#list-block").append(getTaskObject(task, controller));
        });
    };

    function showError(text) {
        $("#error-dialog span").text(text);
        $("#error-dialog").dialog("open");
    }

    function getTaskObject(task, controller) {
        var element = $("<div></div>")
            .attr("class", "list-element")
            .attr("id", "div-" + task.id);

        element.append(
            $("<button></button>")
                .attr("title", "Task done!")
                .attr("id", task.id)
                .html("x"),
            $("<span></span>")
                .text(" " + task.name));
        element.click(controller, deleteTask);

        return element;
    }

    function deleteTask(event) {
        event.preventDefault();
        var controller = event.data;
        var id = event.target.id;

        if (controller.deleteTask(id)) {
            $("#div-" + id).off().remove();
        }
        addInput.focus();
    }
};

var ControllerClass = function (taskList, view) {
    this.taskList = taskList;
    this.view = view;
    this.view.registerAddListener(this);
    this.view.initDialog();

    this.addNewTask = function (text) {
        return this.taskList.add(text);
    };

    this.deleteTask = function (id) {
        return this.taskList.delete(id);
    };

    this.loadTasks = function () {
        this.taskList.loadTasksFromDB(this);
    };

    this.updateTasksList = function (list) {
        this.view.showTasks(list, this);
    };
};
