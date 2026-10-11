let events = [
  { id: 1, date: '2026-10-15', text: 'Besprechung mit Team' },
  { id: 2, date: '2026-10-20', text: 'Projektdeadline' },
  { id: 3, date: '2026-10-25', text: 'Kundenmeeting' }
];

const dateInput = document.getElementById('dateInput');
const textInput = document.getElementById('textInput');
const addBtn = document.getElementById('addBtn');
const tbody = document.getElementById('eventTableBody');

function renderEvents() {
  tbody.innerHTML = '';

  events.forEach((event) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${event.date}</td>
      <td>${event.text}</td>
      <td class="action-cell">
        <button class="edit-btn" data-id="${event.id}">Bearbeiten</button>
        <button class="delete-btn" data-id="${event.id}">Löschen</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  attachButtonEvents();
}

function addEvent() {
  const date = dateInput.value;
  const text = textInput.value.trim();

  if (!date || !text) {
    alert('Bitte Datum und Beschreibung eingeben.');
    return;
  }

  events.push({
    id: Date.now(),
    date: date,
    text: text
  });

  dateInput.value = '';
  textInput.value = '';
  renderEvents();
}

function editEvent(id) {
  const event = events.find((item) => item.id === id);
  if (!event) return;

  const newText = prompt('Bitte neuen Termintext eingeben:', event.text);
  if (newText === null) return;

  const newDate = prompt('Bitte neues Datum eingeben (YYYY-MM-DD):', event.date);
  if (newDate === null) return;

  event.text = newText.trim();
  event.date = newDate.trim();

  renderEvents();
}

function deleteEvent(id) {
  const index = events.findIndex((item) => item.id === id);
  if (index !== -1) {
    events.splice(index, 1);
    renderEvents();
  }
}

function attachButtonEvents() {
  document.querySelectorAll('.edit-btn').forEach((button) => {
    button.addEventListener('click', () => editEvent(Number(button.dataset.id)));
  });

  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', () => deleteEvent(Number(button.dataset.id)));
  });
}

addBtn.addEventListener('click', addEvent);
renderEvents();
