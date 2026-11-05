# Gestão de Tarefas Académicas

Projeto do exercício **React Native com Expo — Navegação, passagem de parâmetros e gestão de estado**. Interface em português, com as três tarefas iniciais do enunciado.

## Executar

Requisitos: Node.js **22.13+ na versão 22**, **24.3+ na versão 24**, ou **26+**, e npm. Na pasta deste projeto:

```bash
npm install
npm start
```

Ler o QR code com o Expo Go compatível com o SDK 58. Também é possível usar um emulador Android (`npm run android`) ou o simulador iOS em macOS (`npm run ios`).

Para abrir no navegador:

```bash
npm run web
```

O terminal indica o endereço local. Se a porta habitual estiver ocupada, usar `npm run web -- --port 8082`.

## Funcionalidades

- **Lista:** título, disciplina, estado, data de entrega e acesso aos detalhes. A caixa de seleção permite concluir ou reabrir uma tarefa.
- **Detalhes:** título, disciplina, descrição, data, estado, alteração de estado, regresso à lista e eliminação com confirmação.
- **Nova tarefa:** campos controlados com `useState`, validação de título e disciplina obrigatórios, validação de datas reais em `DD/MM/AAAA` e regresso automático à lista após guardar. Descrição e data são opcionais, conforme a validação pedida na etapa 4.
- **Desafios adicionais:** contadores de concluídas e pendentes, progresso, filtros, estados vazios, eliminação e apresentação distinta de tarefas concluídas.

Os dados são guardados **em memória**, com `useState`: reiniciar ou recarregar a aplicação repõe as três tarefas iniciais. Não é necessário um servidor, uma conta ou uma ligação à Internet durante a utilização após carregar a aplicação.

## Organização

```text
GestaoTarefas/
├── App.js                    # Estado partilhado e Native Stack
├── index.js                  # Registo da aplicação no Expo
├── screens/
│   ├── HomeScreen.js          # FlatList, contadores e filtros
│   ├── DetailsScreen.js       # Parâmetros, estado atual e eliminação
│   └── AddTaskScreen.js       # TextInput, useState e Button
├── context/TasksContext.js    # Acesso ao estado dos três ecrãs
├── components/TaskUI.js       # Cartão, estado e botões reutilizáveis
├── domain/tasks.mjs           # Dados iniciais, validação e operações
├── theme.js                  # Cores e estilos partilhados
└── tests/tasks.test.mjs       # Testes da lógica de tarefas
```

`App.js` utiliza `NavigationContainer` e `createNativeStackNavigator`, com `Home` como ecrã inicial. A seleção passa **o objeto da tarefa**:

```js
navigation.navigate('Details', { task: item });
```

Em `DetailsScreen.js`, `const { task } = route.params` recupera o objeto. O seu identificador permite consultar a versão atual no estado partilhado, mantendo os detalhes sincronizados após concluir ou reabrir a tarefa. `navigation.goBack()` regressa à lista. As atualizações usam a forma funcional de `setTasks`, sem alterar diretamente o array original. Os parâmetros contêm apenas dados serializáveis; as ações são partilhadas por contexto.

## Verificação

```bash
npm test
npm run build:web
npx expo install --check
```

Os testes verificam os dados iniciais, contadores, filtros, atualização imutável, criação e validação de campos e datas, incluindo anos bissextos.

Verificação funcional:

1. Abrir a lista: existem três tarefas, duas pendentes e uma concluída.
2. Abrir uma tarefa e confirmar todos os dados; concluir e voltar à lista.
3. Alternar os filtros e verificar contadores e estado visual.
4. Abrir **Nova tarefa**, tentar guardar sem título/disciplina e com uma data impossível; confirmar as mensagens.
5. Guardar uma tarefa válida; verificar que aparece no início da lista e que os detalhes correspondem.
6. Cancelar a eliminação e confirmar que a tarefa permanece; depois confirmar a eliminação.
7. Eliminar todas as tarefas e verificar o estado vazio e o progresso a zero.

O export web verifica o empacotamento para navegador; a execução nativa deve ser validada num dispositivo com Expo Go ou num simulador.

Capturas da aplicação: [lista](docs/capturas/lista.png), [nova tarefa](docs/capturas/nova-tarefa.png) e [detalhes](docs/capturas/detalhes.png). Consulte também o [registo de verificação](docs/VERIFICACAO.md).

Referências: [Expo](https://docs.expo.dev/), [React Navigation](https://reactnavigation.org/docs/getting-started/).
