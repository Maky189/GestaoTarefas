# Registo de verificação

Verificação realizada em 05/11/2026, com Node.js 22.23.3.

- Os cinco testes de lógica passaram: dados e contadores iniciais, campos obrigatórios, datas reais, criação e atualização de estados/filtros.
- `npm run build:web`: export concluído.
- `npx expo export --platform android --platform ios`: ambos os bundles Hermes foram gerados com sucesso.
- `npx expo install --check`: dependências compatíveis com o mapa local do Expo SDK 58. A consulta online deste comando estava desativada no ambiente.
- Teste automatizado em Chromium com viewport inicial de 390 × 844: lista inicial, detalhes e parâmetros, concluir/reabrir, contadores, filtros, validação de campos e datas, criação, descrição e data opcionais, cancelamento do formulário, cancelamento/confirmação de eliminação, lista vazia e reposição dos dados ao recarregar.
- Criação iniciada a partir do filtro de concluídas: a lista regressa ao filtro de todas e mostra a nova tarefa pendente.
- Ausência de erros JavaScript durante os fluxos testados.
- Sem overflow horizontal nas larguras de 360, 768 e 1440 píxeis.
- Capturas reais guardadas nesta pasta em `capturas/`.

## Limites

Não foi usado um dispositivo físico nem um simulador Android/iOS. O teclado, os gestos e o comportamento nativo devem ser confirmados com Expo Go ou com um build nativo.

As tarefas são mantidas em memória por decisão do exercício, que pede `useState`; não existe persistência entre reinícios.

O `npm audit` reportou cinco entradas de gravidade moderada na cadeia de ferramentas do Expo (`glob` e `minimatch`, com propagação aos pacotes Expo). A correção automática sugerida pelo npm mudaria para um SDK anterior; não foi aplicada essa alteração incompatível. Não houve relatórios de gravidade alta ou crítica.
