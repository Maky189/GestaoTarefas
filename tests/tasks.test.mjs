import test from 'node:test';
import assert from 'node:assert/strict';
import { initialTasks, isValidDate, validateTask, createTask, toggleTask, filterTasks, countTasks } from '../domain/tasks.mjs';

test('o exercício começa com três tarefas e os contadores refletem os seus estados', () => {
  assert.deepEqual(countTasks(initialTasks), { total: 3, completed: 1, pending: 2 });
  assert.deepEqual(countTasks([]), { total: 0, completed: 0, pending: 0 });
});

test('título e disciplina não podem estar vazios ou conter apenas espaços', () => {
  const errors = validateTask({ title: '  ', subject: '', dueDate: '' });
  assert.deepEqual(Object.keys(errors), ['title', 'subject']);
  assert.deepEqual(validateTask({ title: 'Projeto', subject: 'Mobile', dueDate: '' }), {});
});

test('valida datas reais, incluindo anos bissextos, sem normalizar datas inválidas', () => {
  for (const date of ['29/02/2028', '15/11/2026', '31/12/2026']) assert.equal(isValidDate(date), true, date);
  for (const date of ['29/02/2026', '31/04/2026', '00/11/2026', '15/13/2026', '1/1/2026', '2026-11-15', '01/01/0000']) assert.equal(isValidDate(date), false, date);
  assert.ok(validateTask({ title: 'Projeto', subject: 'Mobile', dueDate: '31/02/2026' }).dueDate);
});

test('uma nova tarefa guarda texto limpo e começa pendente', () => {
  const task = createTask({ title: ' Projeto ', subject: ' Mobile ', description: ' Detalhes ', dueDate: ' 15/11/2026 ' }, '4');
  assert.deepEqual(task, { id: '4', title: 'Projeto', subject: 'Mobile', description: 'Detalhes', dueDate: '15/11/2026', completed: false });
});

test('concluir e reabrir atualiza contadores e filtros sem alterar os dados originais', () => {
  const updated = toggleTask(initialTasks, '1');
  assert.equal(initialTasks[0].completed, false);
  assert.deepEqual(countTasks(updated), { total: 3, completed: 2, pending: 1 });
  assert.deepEqual(filterTasks(updated, 'pending').map((task) => task.id), ['2']);
  assert.deepEqual(filterTasks(updated, 'completed').map((task) => task.id), ['1', '3']);
  assert.deepEqual(toggleTask(updated, '1'), initialTasks);
  assert.deepEqual(filterTasks([], 'all'), []);
});
