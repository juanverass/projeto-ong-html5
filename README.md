# Projeto ONG — Solidariedade em Ação

Site simples em HTML5 desenvolvido como atividade acadêmica para uma ONG fictícia, com foco em marcação semântica, acessibilidade e validação nativa de formulários. Não usa frameworks, CSS ou JavaScript.

## Páginas

- `html/index.html`: página inicial com as seções "Sobre a ONG", "Nossa missão" e "Entre em contato".
- `html/projetos.html`: iniciativas (Projeto de Educação e Campanha de Alimentos), voluntariado e doações.
- `html/cadastro.html`: formulário de cadastro de voluntários e doadores.

As imagens ficam em `imagens/`.

## Recursos HTML5 utilizados

- Elementos semânticos: `header`, `nav`, `main`, `section`, `article`, `address` e `footer`.
- Hierarquia de títulos com um único `h1` por página.
- Acessibilidade: `lang="pt-BR"`, `alt` descritivo nas imagens, `aria-label="Navegação principal"`, `aria-current` no link da página atual e `label` associado a cada campo pelo atributo `for`.
- Formulário organizado com `fieldset` e `legend` (Dados pessoais, Endereço e Forma de participação).

## Validações implementadas

- `required` em todos os campos.
- `type="email"`, `type="date"` e `type="tel"` com validação nativa do navegador.
- CPF: `pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}"` (formato `000.000.000-00`).
- Telefone: `pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"` (formato `(00) 00000-0000`).
- CEP: `pattern="[0-9]{5}-[0-9]{3}"` (formato `00000-000`).
- Estado escolhido em um `select` e forma de participação em botões de rádio obrigatórios.

Os três arquivos HTML foram validados sem erros no [W3C Markup Validator](https://validator.w3.org/nu/).
