var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var form = document.getElementById('form');
var inputText = document.getElementById('text');
var table = document.querySelector('table tbody');
var list = [];
// ADD TASK
form.addEventListener('submit', function (e) {
    e.preventDefault();
    // prevent empty input
    if (!inputText.value.trim())
        return;
    var obj = {
        id: Date.now(),
        text: inputText.value.trim(),
        isComplete: false
    };
    list.push(obj);
    inputText.value = '';
    inputText.focus();
    displayData();
});
// DISPLAY TASKS
var displayData = function () {
    table.innerHTML = '';
    list.forEach(function (value, index) {
        var row = document.createElement('tr');
        // TEXT COLUMN
        var textTd = document.createElement('td');
        textTd.className = value.isComplete ? 'cancelled' : '';
        textTd.textContent = value.text;
        // INDEX COLUMN
        var indexTd = document.createElement('td');
        indexTd.textContent = (index + 1).toString();
        // BUTTON COLUMN
        var actionTd = document.createElement('td');
        var btn = document.createElement('button');
        if (!value.isComplete) {
            btn.textContent = 'Complete';
            btn.className = 'btn btn-success';
            btn.addEventListener('click', function () {
                handleComplete(value.id);
            });
        }
        else {
            btn.textContent = 'Remove';
            btn.className = 'btn btn-danger';
            btn.addEventListener('click', function () {
                handleDelete(value.id);
            });
        }
        actionTd.appendChild(btn);
        // APPEND ALL
        row.appendChild(indexTd);
        row.appendChild(textTd);
        row.appendChild(actionTd);
        table.appendChild(row);
    });
};
// DELETE TASK
var handleDelete = function (id) {
    list = list.filter(function (value) { return value.id !== id; });
    displayData();
};
// COMPLETE TASK
var handleComplete = function (id) {
    list = list.map(function (value) {
        if (value.id === id) {
            return __assign(__assign({}, value), { isComplete: true });
        }
        return value;
    });
    displayData();
};
