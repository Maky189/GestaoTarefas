export const initialTasks = [
  {
    id: '1',
    title: 'Trabalho de React Native',
    subject: 'Programação Mobile',
    description: 'Desenvolver uma aplicação utilizando Expo.',
    dueDate: '15/11/2026',
    completed: false,
  },
  {
    id: '2',
    title: 'Relatório de Engenharia de Software',
    subject: 'Engenharia de Software',
    description: 'Elaborar um relatório sobre metodologias ágeis.',
    dueDate: '20/11/2026',
    completed: false,
  },
  {
    id: '3',
    title: 'Protótipo de Interface',
    subject: 'IHC',
    description: 'Criar um protótipo de uma aplicação mobile.',
    dueDate: '25/11/2026',
    completed: true,
  },
];

export function isValidDate(value) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
  const [day, month, year] = value.split('/').map(Number);
  if (year < 1000) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function validateTask(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Introduza o título da tarefa.';
  if (!values.subject.trim()) errors.subject = 'Introduza a disciplina.';
  if (values.dueDate.trim() && !isValidDate(values.dueDate.trim())) {
    errors.dueDate = 'Introduza uma data válida no formato DD/MM/AAAA.';
  }
  return errors;
}

export function createTask(values, id) {
  return {
    id,
    title: values.title.trim(),
    subject: values.subject.trim(),
    description: values.description.trim(),
    dueDate: values.dueDate.trim(),
    completed: false,
  };
}

export function toggleTask(tasks, id) {
  return tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
}

export function filterTasks(tasks, filter) {
  return tasks.filter((task) => filter === 'pending' ? !task.completed : filter === 'completed' ? task.completed : true);
}

export function countTasks(tasks) {
  const completed = tasks.filter((task) => task.completed).length;
  return { total: tasks.length, completed, pending: tasks.length - completed };
}
