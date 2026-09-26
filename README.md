# Projeto ONG — Solidariedade em Ação

Site desenvolvido como atividade acadêmica para uma ONG fictícia, sem frameworks. Cada Experiência Prática acrescenta uma camada:

- **I:** marcação semântica, acessibilidade e validação nativa de formulários com HTML5.
- **II:** estilização e layouts responsivos com CSS3.
- **III:** o site vira uma Single Page Application (SPA) em JavaScript modular.

**Site publicado:** https://juanverass.github.io/projeto-ong-html5/

## Estrutura

```text
projeto-ong/
├── index.html (só redireciona para html/index.html)
├── html/      index.html (casca da SPA)
├── css/       style.css
├── js/        app.js, router.js, templates.js, storage.js, validacoes.js
└── imagens/   ong-home.webp, projeto-educacao.webp, voluntariado-doacoes.webp
               projeto_alimentos.png, projeto_doacoes.png, projeto_voluntariado.png
```

## Como executar

O JavaScript usa ES6 Modules (`<script type="module">`). Os navegadores bloqueiam módulos em arquivos abertos com duplo clique (`file://`), por uma regra de segurança (CORS). Por isso, abra o `html/index.html` por um servidor local:

- **VS Code:** instale a extensão **Live Server**, clique com o botão direito em `html/index.html` e escolha **Open with Live Server**.
- **Terminal:** na pasta `projeto-ong`, rode `npx serve .` ou `python -m http.server 8080` e acesse o endereço indicado (por exemplo, `http://localhost:3000`).
- **GitHub Pages:** o site está publicado em https://juanverass.github.io/projeto-ong-html5/ e funciona sem nada instalado. Cada merge na `main` atualiza a versão publicada.

O `index.html` da raiz redireciona automaticamente para `html/index.html`, então basta abrir o endereço do servidor.

Se o arquivo for aberto direto, a página mostra um aviso com essas instruções no lugar do conteúdo.

## Páginas (rotas da SPA)

- `#inicio`: apresentação da ONG, missão com três pilares e contato.
- `#projetos`: iniciativas (Projeto de Educação e Campanha de Alimentos), voluntariado, doações e a vitrine de componentes. As seções internas também têm rota própria (`#participe`, `#voluntariado`, `#doacoes`, `#componentes`).
- `#cadastro`: formulário de cadastro de voluntários e doadores.

## Experiência Prática I — HTML5

### Recursos HTML5 utilizados

- Elementos semânticos: `header`, `nav`, `main`, `section`, `article`, `aside`, `address` e `footer`.
- Hierarquia de títulos com um único `h1` por página (na SPA, um por rota).
- Acessibilidade: `lang="pt-BR"`, `alt` descritivo nas imagens, `aria-label="Navegação principal"`, `aria-current` no link da página atual e `label` associado a cada campo pelo atributo `for`.
- Formulário organizado com `fieldset` e `legend` (Dados pessoais, Endereço e Forma de participação).

### Validações implementadas

- `required` em todos os campos.
- `type="email"`, `type="date"` e `type="tel"`.
- CPF: `pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}"` (formato `000.000.000-00`).
- Telefone: `pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"` (formato `(00) 00000-0000`).
- CEP: `pattern="[0-9]{5}-[0-9]{3}"` (formato `00000-000`).
- Estado escolhido em um `select` e forma de participação em botões de rádio obrigatórios.

## Experiência Prática II — Estilização e Layouts

- **Design System:** variáveis CSS em `:root` para cores, tamanhos de fonte, espaçamentos, raio de borda, sombras e transições. Todos os componentes usam essas variáveis.
- **CSS Grid de 12 colunas:** a classe `.container` (`repeat(12, 1fr)`) organiza a estrutura macro: destaque da home, pilares da missão, grid de projetos, bloco "Participe", vitrine de componentes e o layout formulário + orientações.
- **Flexbox:** usado nos componentes internos (cabeçalho, menu, conteúdo dos cards, grupos de botões, painéis, opções de rádio e rodapé).
- **Cinco breakpoints:**
  - até 480px: conteúdo empilhado e botões em largura total;
  - 481px a 768px: cards em formato horizontal e formulário em duas colunas;
  - 769px a 1024px (tablet): destaque em 7 + 5 colunas e cards em 6 colunas;
  - 1025px a 1440px (desktop): destaque em 6 + 6 e formulário em 8 colunas com orientações ao lado;
  - acima de 1441px: largura maior, título da seção em 4 colunas e cards em 4 colunas cada.
- **Menu responsivo:** navegação horizontal com o dropdown "Participar" (Voluntariado e Doações), que abre com `:hover` e com `:focus-within`, então também funciona pelo teclado. Até 768px aparece um botão hambúrguer com `aria-label`, `aria-expanded` e `aria-controls`, que alterna a classe `.ativo`. A tecla Esc fecha o menu.
- **Cards:** cada projeto é um `article` com imagem, badges, título, descrição e botão. Têm bordas arredondadas, sombra leve e, no hover, sobem um pouco e a sombra aumenta, com `transition`.
- **Botões:** estados `hover` (fundo mais escuro e sombra), `focus` (anel de foco em duas cores), `active` (leve redução de escala) e `disabled` (opacidade reduzida e `cursor: not-allowed`).
- **Validação visual dos formulários:** verde para campo válido e vermelho para inválido, com foco destacado em azul. Na Experiência III, as classes `.campo-valido` e `.campo-invalido` passam a ser aplicadas pelo JavaScript.
- **Badges:** `.badge` com as variações `.badge-sucesso`, `.badge-info`, `.badge-aviso` e `.badge-erro`.
- **Alertas:** `.alerta` com as variações de sucesso, erro, aviso e informativo.
- **Toast:** mensagem temporária com `role="status"` e `aria-live="polite"`, que some sozinha depois de alguns segundos.
- **Acessibilidade:** link "Pular para o conteúdo", foco visível em todos os elementos interativos (nenhum `outline` foi removido sem substituto), contraste adequado, `alt` em todas as imagens, labels associados, menu operável por teclado e respeito a `prefers-reduced-motion`.

## Experiência Prática III — Interatividade e Funcionalidades

### Arquitetura SPA

O `html/index.html` contém só a estrutura fixa: cabeçalho, navegação, rodapé, o toast e a área dinâmica `<main id="app">`. Ao clicar num link com `data-page`, o JavaScript chama `event.preventDefault()`, atualiza o endereço com `history.pushState` (por exemplo, `#cadastro`) e troca o conteúdo de `#app` pelo template da página. A página nunca recarrega.

- O `location.hash` define a rota, então dá para atualizar a página, compartilhar o link (`index.html#cadastro`) e usar os botões voltar e avançar do navegador (evento `hashchange`).
- Uma rota inexistente leva ao Início.
- A cada troca, o título da aba muda, o link ativo recebe `aria-current="page"` e o foco vai para o `h1` da nova página, para os leitores de tela anunciarem a mudança.

### Manipulação do DOM e templates dinâmicos

As três páginas são funções em `templates.js` que devolvem HTML com Template Literals, inseridas com `innerHTML`. Projetos, pilares, badges, alertas, estados, formas de participação e campos do formulário vêm de arrays de objetos, renderizados com `map()` e `join("")`. Nenhum card é escrito à mão. Os dados digitados pelo usuário passam por `escaparHtml()` antes de voltar para a tela, para impedir injeção de HTML (XSS).

### Eventos utilizados

Todos os listeners são registrados uma única vez no `document`, com delegação de eventos. Assim, entrar e sair do cadastro várias vezes não duplica nada.

| Evento | Uso |
|---|---|
| `click` | navegação SPA, menu hambúrguer, botão do toast e "Apagar cadastro salvo" |
| `submit` | `preventDefault()`, validação, salvamento no `localStorage` e toast |
| `input` | feedback em tempo real enquanto o usuário digita |
| `change` | select de estado, rádios de participação (mostram uma explicação da opção escolhida) e data |
| `reset` | limpa as marcações de validação e ressincroniza as máscaras |
| `keydown` | Esc fecha o menu mobile |
| `hashchange` | botões voltar e avançar do navegador e hash digitado na barra de endereço |
| `paginaRenderizada` / `paginaSaindo` | eventos personalizados (`CustomEvent`) do router, que iniciam e destroem as máscaras do cadastro |

### Validação

`validacoes.js` combina as regras nativas do HTML5 (`required`, `type`, `pattern`, lidas por `validity` e `checkValidity()`) com regras complementares:

- nome e sobrenome;
- e-mail com domínio completo;
- data de nascimento que não pode estar no futuro;
- CPF com dígitos não todos iguais;
- DDD que não começa com 0;
- endereço e cidade com tamanho mínimo.

Cada erro recebe uma mensagem em português via `setCustomValidity()`, então o balão do `reportValidity()` também aparece em português.

- Durante a digitação, o campo recebe `.campo-valido` (verde) ou `.campo-invalido` (vermelho), além de `aria-invalid` e uma mensagem ligada ao campo por `aria-describedby`.
- Nenhum campo é marcado antes de o usuário interagir.
- Num envio inválido, todos os campos são verificados, aparece um alerta com a lista do que corrigir e o foco vai para o primeiro campo com erro.
- O formulário usa `novalidate` para que o JavaScript controle a validação. Sem isso, o navegador barraria o `submit` antes de o feedback aparecer. Os atributos HTML5 continuam lá e são a base da validação.

### localStorage

- `storage.js` salva o cadastro na chave `solidariedadeCadastro` com `JSON.stringify()`, junto com a data do salvamento.
- Ao abrir o cadastro, os dados são lidos com `JSON.parse()` e preenchem os campos automaticamente.
- Um resumo "Cadastro salvo neste navegador" oferece o botão para apagar os dados.
- O `getItem` vazio (`null`) é tratado antes do `JSON.parse`, e um JSON corrompido é descartado dentro de um `try/catch`, sem quebrar a tela.
- Os dez campos são salvos: nome, e-mail, data de nascimento, CPF, telefone, CEP, endereço, cidade, estado e forma de participação.

### IMask.js

As máscaras de CPF (`000.000.000-00`), telefone (`(00) 00000-0000`) e CEP (`00000-000`) usam o [IMask.js](https://imask.js.org/) 7.6.1, carregado pelo CDN unpkg com verificação de integridade (`integrity`/SRI). Como o formulário só existe depois da renderização, as máscaras são criadas no evento `paginaRenderizada` e destruídas ao sair da página. Se o CDN estiver indisponível, o `pattern` do HTML5 continua validando o formato.

### Estrutura dos módulos

Todos os arquivos usam ES6 Modules (`export`/`import`), sem variáveis globais e sem dependências circulares.

- **`app.js`:** ponto de entrada. Registra os eventos globais uma única vez, liga o formulário ao storage e à validação, controla o menu e inicia o router.
- **`router.js`:** navegação SPA. Resolve a rota a partir do hash, escolhe o template, renderiza em `#app`, atualiza título, menu e foco e dispara `paginaRenderizada`.
- **`templates.js`:** HTML dinâmico das páginas e dos componentes (Template Literals, arrays de dados, `map()`/`join()` e `escaparHtml()`).
- **`validacoes.js`:** validação dos campos e do formulário, feedback visual e mensagens, máscaras IMask, leitura e preenchimento dos dados do formulário e o toast.
- **`storage.js`:** único módulo que acessa o `localStorage` (`salvarCadastro`, `obterCadastro` e `removerCadastro`).

```text
app.js ──► router.js ──► templates.js
   │                        ▲
   ├──► validacoes.js ──────┘
   └──► storage.js
```

### Testes realizados

Os testes foram automatizados com Chrome headless (Puppeteer) num servidor local. Foram 50 verificações, todas aprovadas:

- **SPA:** início → projetos → cadastro → início; 15 trocas seguidas sem recarregar; voltar e avançar do navegador; atualizar a página numa rota; acesso direto por `#cadastro`; rota inexistente; dropdown levando à seção Voluntariado.
- **Formulário:**
  - envio vazio bloqueado, com os 10 campos marcados e o foco no primeiro;
  - e-mails inválidos (`maria@`, `maria@exemplo`);
  - CPF incompleto, com letras e com dígitos repetidos;
  - telefone e CEP incompletos;
  - nome sem sobrenome e data no futuro;
  - formulário válido;
  - botão "Limpar campos".
- **localStorage:**
  - salvamento com os 10 campos, feito uma única vez mesmo depois de entrar no cadastro 4 vezes;
  - campos preenchidos ao voltar à página, ao atualizar e ao fechar e reabrir o navegador;
  - apagar o cadastro salvo;
  - JSON corrompido;
  - tentativa de XSS com dados salvos.
- **Eventos:** menu hambúrguer (abrir, fechar ao navegar e Esc), dropdown com hover e com foco, `input`, `change`, `submit` e toast aparecendo e sumindo.
- **Responsividade:** 375, 480, 768, 1024 e 1440px nas três rotas, sem rolagem horizontal e com todas as imagens carregando.
- **DevTools:** nenhum erro ou aviso no console e nenhuma requisição com falha durante o fluxo.

### Bugs corrigidos

- **Envio bloqueado antes do feedback:** a validação nativa impedia o evento `submit`, então o envio vazio não mostrava as marcações nem o resumo de erros. Resolvido com `novalidate` e `checkValidity()`/`reportValidity()` no JavaScript.
- **Erro de favicon no console:** o navegador pedia `favicon.ico` e recebia 404. Resolvido com um favicon SVG embutido.
- **Espaço duplo antes dos botões do formulário:** a área de feedback vazia ocupava espaço. Agora ela fica oculta enquanto está vazia.
- **Listeners duplicados:** com a renderização dinâmica, registrar eventos a cada visita duplicaria ações, como salvar duas vezes. Isso foi evitado desde o início com delegação no `document`, e o teste confirma um único salvamento.

## Validação

- O `index.html` e o HTML renderizado de cada rota passam no [W3C Nu HTML Checker](https://validator.w3.org/nu/) sem erros ou avisos.
- O `style.css` passa sem erros no validador CSS do Nu. Na Experiência II, também passou no [W3C CSS Validator (Jigsaw)](https://jigsaw.w3.org/css-validator/) com 0 erros; os avisos do Jigsaw são só informativos, porque ele não verifica variáveis CSS.
- O layout foi testado em 375, 480, 768, 1024, 1440 e 1920px, sem rolagem horizontal.
