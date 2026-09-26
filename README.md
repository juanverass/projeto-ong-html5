# Projeto ONG — Solidariedade em Ação

Site desenvolvido como atividade acadêmica para uma ONG fictícia. A Experiência Prática I trata de marcação semântica, acessibilidade e validação nativa de formulários com HTML5. A Experiência Prática II adiciona estilização e layouts responsivos com CSS3 e um pouco de JavaScript. Nenhum framework é usado.

## Estrutura

```text
projeto-ong/
├── html/      index.html, projetos.html, cadastro.html
├── css/       style.css
├── js/        script.js
└── imagens/   ong-home.webp, projeto-educacao.webp, voluntariado-doacoes.webp
```

Para visualizar, abra `html/index.html` no navegador.

## Páginas

- `html/index.html`: página inicial com as seções "Sobre a ONG", "Nossa missão" e "Entre em contato".
- `html/projetos.html`: iniciativas (Projeto de Educação e Campanha de Alimentos), voluntariado, doações e a vitrine de componentes da interface.
- `html/cadastro.html`: formulário de cadastro de voluntários e doadores.

## Experiência Prática I — HTML5

### Recursos HTML5 utilizados

- Elementos semânticos: `header`, `nav`, `main`, `section`, `article`, `aside`, `address` e `footer`.
- Hierarquia de títulos com um único `h1` por página.
- Acessibilidade: `lang="pt-BR"`, `alt` descritivo nas imagens, `aria-label="Navegação principal"`, `aria-current` no link da página atual e `label` associado a cada campo pelo atributo `for`.
- Formulário organizado com `fieldset` e `legend` (Dados pessoais, Endereço e Forma de participação).

### Validações implementadas

- `required` em todos os campos.
- `type="email"`, `type="date"` e `type="tel"` com validação nativa do navegador.
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
- **Validação visual dos formulários:** a borda fica verde quando o campo é válido e vermelha só depois de o usuário digitar algo inválido (`:not(:placeholder-shown)` e `:user-invalid`). O foco mostra um contorno azul. Todas as validações HTML5 da Experiência I foram mantidas.
- **Badges:** `.badge` com as variações `.badge-sucesso`, `.badge-info`, `.badge-aviso` e `.badge-erro`.
- **Alertas:** `.alerta` com as variações de sucesso, erro, aviso e informativo.
- **Toast:** ao enviar um cadastro válido, a página não recarrega e mostra a mensagem "Cadastro enviado com sucesso.", que some depois de 4 segundos. O toast usa `role="status"` e `aria-live="polite"`. Na página de projetos também dá para acionar o toast pela vitrine de componentes.
- **Acessibilidade:** link "Pular para o conteúdo", foco visível em todos os elementos interativos (nenhum `outline` foi removido sem substituto), contraste adequado, `alt` em todas as imagens, labels associados, menu operável por teclado e respeito a `prefers-reduced-motion`.

## Validação

- Os três HTMLs passam no [W3C Nu HTML Checker](https://validator.w3.org/nu/) sem erros ou avisos.
- O `style.css` passa no [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) sem erros. Os únicos avisos são informativos: o validador não verifica variáveis CSS.
- O layout foi testado em 375, 480, 768, 1024, 1440 e 1920px, sem rolagem horizontal.
