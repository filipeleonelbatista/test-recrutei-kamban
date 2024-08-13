Aqui está o conteúdo solicitado em markdown:

```markdown
# Teste Técnico - Desenvolvedor Front-end React

## Objetivo
Desenvolver uma página que simula o funcionamento de um sistema de gestão de tarefas, com estilo Kanban (semelhante ao Trello).

## Definições
- A página deverá apresentar os cards (representando as tarefas) com seus respectivos títulos.
- Os cards deverão ficar agrupados por etapas (colunas), pré definidas:
  - Ideias
  - A Fazer
  - Fazendo
  - Feito
- Os cards deverão ter a capacidade de drag and drop para movimento entre as colunas (etapas).
- A página deverá apresentar scroll horizontal, para casos de telas menores.
- A página deverá ter um botão chamado "Criar Tarefa". Este botão, ao ser clicado, deverá abrir uma modal que permita o cadastro de uma nova tarefa, contendo o seguinte formulário:
  - Título da Tarefa (text)
  - Descrição (textarea)
  - Responsável (select com 3 pessoas fictícias)
  - Data Limite (date)
- O formulário da modal deverá ter uma validação, campo a campo, onde só é permitido criar a tarefa, se todos os campos forem devidamente preenchidos.
- Quando uma nova tarefa for criada, ela deverá aparecer na tela de Kanban com um novo card criado.
- Ao clicar em um card no Kanban, uma modal deve ser aberta no modo de visualização da tarefa, contendo os dados previamente salvos. O conteúdo deverá ser obtido via GET no seguinte endpoint:
  - `https://api.npoint.io/21c80c25ed65b6f3484f`
  - O endpoint retornará de forma fixa um conteúdo em JSON de um card (tarefa), com os seguintes dados:
    - title
    - description
    - responsible
    - date
- É interessante adicionar um loading na modal antes de carregar os dados da API.
- O componente de card (tarefa) deverá ser criado via storybook e utilizado na página. (diferencial)
  - Caso não domine storybook, crie diretamente na aplicação principal.

## O que será avaliado
Será avaliada a capacidade de construção de uma aplicação React funcional, que permita o usuário visualizar a lista de tarefas, criar uma nova tarefa, e ver uma tarefa específica.

Também será avaliada a capacidade de integração com API via GET, obtendo os dados de uma tarefa, assim como a validação do formulário na criação de uma nova tarefa.

Será primordial o capricho e fidelidade aos detalhes do protótipo em alta fidelidade, construído no Figma, disponível no link abaixo:
[Protótipo no Figma](https://www.figma.com/design/Kew8NFFejpS37e18Q4BwRP/Teste-frontend?node-id=0-1)

A utilização de storybook no contexto do teste é opcional, sendo vista como diferencial.

## Formato de Entrega
Envie o link do repositório no Github (ou onde preferir) para os emails:
- pedro@recrutei.com.br
- matheus@recrutei.com.br
- felipe.raank@recrutei.com.br

## Dica
Utilize tecnologias a mais que desejar no projeto, desde que mantenham o foco da aplicação original. Demonstrar conhecimento é sempre bem-vindo.

Caso encontre alguma falha no protótipo, você tem duas opções:
- Comunicar o Product Manager (matheus@recrutei.com.br)
- Implementar uma solução para o problema encontrado.

[Link do Protótipo no Figma](https://www.figma.com/design/Kew8NFFejpS37e18Q4BwRP/Teste-frontend?node-id=0-1)
```

Este markdown reflete o conteúdo das instruções para o teste técnico【4†source】.