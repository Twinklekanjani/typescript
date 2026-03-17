const form = document.getElementById('form') as HTMLFormElement;
const inputText = document.getElementById('text') as HTMLInputElement;
const table = document.querySelector('table tbody') as HTMLTableSectionElement;

type Task = {
    id: number;
    text: string;
    isComplete: boolean;
};

let list: Task[] = [];

// ADD TASK
form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    // prevent empty input
    if (!inputText.value.trim()) return;

    const obj: Task = {
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
const displayData = (): void => {

    table.innerHTML = '';

    list.forEach((value, index) => {

        const row = document.createElement('tr');

        // TEXT COLUMN
        const textTd = document.createElement('td');
        textTd.className = value.isComplete ? 'cancelled' : '';
        textTd.textContent = value.text;

        // INDEX COLUMN
        const indexTd = document.createElement('td');
        indexTd.textContent = (index + 1).toString();

        // BUTTON COLUMN
        const actionTd = document.createElement('td');
        const btn = document.createElement('button');

        if (!value.isComplete) {
            btn.textContent = 'Complete';
            btn.className = 'btn btn-success';

            btn.addEventListener('click', () => {
                handleComplete(value.id);
            });

        } else {
            btn.textContent = 'Remove';
            btn.className = 'btn btn-danger';

            btn.addEventListener('click', () => {
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
const handleDelete = (id: number): void => {
    list = list.filter(value => value.id !== id);
    displayData();
};

// COMPLETE TASK
const handleComplete = (id: number): void => {
    list = list.map(value => {
        if (value.id === id) {
            return { ...value, isComplete: true };
        }
        return value;
    });

    displayData();
};