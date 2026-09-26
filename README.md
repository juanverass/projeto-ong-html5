# Solidariedade em Ação

Plataforma acadêmica que simula a presença digital de uma ONG, com páginas de projetos sociais, voluntariado, doações e cadastro de participantes. O projeto foi construído ao longo de quatro Experiências Práticas, partindo de HTML5 semântico e chegando a uma SPA acessível, otimizada e pronta para produção.

- **Versão atual:** 1.3.0
- **Repositório:** https://github.com/juanverass/projeto-ong-html5
- **GitHub Pages (código-fonte, sem build):** https://juanverass.github.io/projeto-ong-html5/
- **Produção (Vercel):** veja a seção [Produção](#produção)

## Funcionalidades

- **SPA:** navegação sem recarregar a página, com rotas por hash (`#inicio`, `#projetos`, `#cadastro`), histórico do navegador e atualização da página funcionando.
- **Projetos sociais:** cards gerados a partir de um array de dados (Projeto de Educação e Campanha de Alimentos).
- **Formulário de cadastro:** dados pessoais, endereço e forma de participação, organizados em `fieldset`/`legend`.
- **Validações:** as regras nativas do HTML5 (`required`, `type`, `pattern`) somadas a regras complementares, com mensagens em português.
- **localStorage:** o cadastro é salvo, recuperado ao reabrir e pode ser apagado. A preferência de alto contraste também fica salva.
- **Máscaras:** CPF, telefone e CEP com IMask.js.
- **Menu responsivo** com botão hambúrguer e **dropdown** "Participar".
- **Componentes:** cards, badges, alertas e toast.
- **Modo de alto contraste**, que persiste entre visitas.

## Tecnologias

- HTML5, CSS3 (variáveis, Grid, Flexbox) e JavaScript ES6 com ES6 Modules
- localStorage
- [IMask.js](https://imask.js.org/) 7.6.1, via CDN com verificação de integridade (SRI)
- [Vite](https://vite.dev/) 8, para servidor de desenvolvimento, build e minificação
- Git e GitHub (issues, milestone, pull requests e releases)
- Vercel, para hospedagem de produção (configuração em `vercel.json`)

## Estrutura

A atividade exige pastas separadas para HTML, CSS, JavaScript e imagens, e essa organização foi mantida com o Vite.

```text
projeto-ong/
├── index.html          redireciona para html/index.html
├── html/
│   └── index.html      casca da SPA: cabeçalho, navegação, <main id="app">, rodapé e toast
├── css/
│   └── style.css       Design System, layout, componentes, breakpoints e alto contraste
├── js/
│   ├── app.js          ponto de entrada: eventos globais, menu, alto contraste, cadastro
│   ├── router.js       navegação SPA: resolve a rota, renderiza e gerencia foco e título
│   ├── templates.js    HTML dinâmico das páginas (template literals, map/join)
│   ├── validacoes.js   validação, feedback visual, máscaras IMask e toast
│   └── storage.js      único módulo que acessa o localStorage
├── imagens/            WebP usados no site (+ PNGs originais de referência)
├── package.json        scripts dev/build/preview
├── vite.config.js      entradas HTML e base relativa
└── vercel.json         configuração de deploy
```

**Fluxo entre os módulos:** `app.js` importa `router.js`, `validacoes.js` e `storage.js`. O `router.js` e o `validacoes.js` importam `templates.js`. Não há dependências circulares.

## Como executar

É preciso ter o [Node.js](https://nodejs.org/) 20 ou superior.

```bash
git clone https://github.com/juanverass/projeto-ong-html5.git
cd projeto-ong-html5
npm install
npm run dev
```

O Vite mostra no terminal um endereço como `http://localhost:5173/`. Ao abrir esse endereço, o `index.html` da raiz redireciona para `html/index.html`, onde está a aplicação.

Os módulos ES6 não funcionam com o arquivo aberto por duplo clique (`file://`), porque o navegador os bloqueia por segurança. Use sempre um servidor: o `npm run dev`, o Live Server do VS Code ou similar.

## Build

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve dist/ localmente, em http://localhost:4173/
```

A build junta os 5 módulos JavaScript num único arquivo minificado, minifica o CSS e copia as imagens com hash no nome, para cache de longo prazo. As imagens são referenciadas com `new URL('../imagens/...', import.meta.url)`. Esse padrão funciona tanto no Vite quanto num servidor estático comum.

## Acessibilidade

O projeto foi desenvolvido e revisado visando atender aos principais critérios aplicáveis da **WCAG 2.1 nível AA**. Não houve auditoria formal por especialistas nem testes com usuários de tecnologias assistivas. Os resultados abaixo vêm de testes automatizados e de revisão manual.

- **Landmarks e semântica:**
  - `header`, `nav aria-label="Navegação principal"`, `main`, `section`, `article`, `aside` e `footer`;
  - `lang="pt-BR"`;
  - um `h1` por página, sem pular níveis de título.
- **Skip link:** "Ir para o conteúdo principal". Fica oculto até receber foco e leva o foco ao `<main>` sem trocar a rota.
- **Teclado:**
  - todo o site funciona com Tab, Shift+Tab, Enter, Space, setas e Esc;
  - o submenu abre por `:focus-within`;
  - o menu mobile fecha com Esc e devolve o foco ao botão;
  - nenhum `tabindex` positivo.
- **Foco visível:**
  - `:focus-visible` global, em azul `#1C5FB8` sobre fundos claros e em amarelo sobre os fundos verdes;
  - botões com anel duplo (amarelo + escuro);
  - nenhum `outline: none` sem substituto.
- **Menu hambúrguer:** `aria-controls="menu-principal"`, `aria-expanded` e nome acessível que alterna entre "Abrir menu" e "Fechar menu".
- **Formulário:**
  - `label` ligado por `for`/`id` em todos os campos e `required` semântico;
  - mensagens de erro em texto (não só cor), ligadas por `aria-describedby`;
  - `aria-invalid="true"` ou `"false"` conforme a validação;
  - resumo dos erros num alerta.
- **Imagens:** `alt` descritivo em todas as imagens informativas. Todas têm `width`/`height`, para evitar layout shift.
- **Toast:** `role="status"` com `aria-live="polite"`. Não move o foco.
- **Alto contraste:**
  - botão com `aria-pressed`, que aplica `body.alto-contraste`;
  - a preferência fica salva na chave `solidariedadeAltoContraste`.

### Contraste de cores (valores medidos)

Os rácios foram calculados com a fórmula de luminância relativa da WCAG 2.1 e conferidos na API do [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). O WebAIM arredonda para baixo, por isso às vezes mostra 0,01 a menos.

| Uso | Cores | Rácio | AA |
|---|---|---|---|
| Texto principal | `#222222` em `#FFFFFF` | 15,91:1 | ✔ |
| Texto principal no fundo da página | `#222222` em `#F7F7F7` | 14,85:1 | ✔ |
| Texto secundário | `#666666` em `#FFFFFF` | 5,74:1 | ✔ |
| Botão principal | `#FFFFFF` em `#1F6F50` | 6,09:1 | ✔ |
| Hover do botão | `#FFFFFF` em `#164F3A` | 9,49:1 | ✔ |
| Alerta e badge de sucesso | `#1B5E20` em `#E8F5E9` | 7,00:1 | ✔ |
| Alerta de erro | `#C62828` em `#FDECEA` | 4,92:1 | ✔ |
| Alerta de aviso | `#A65B00` em `#FFF4E0` | 4,68:1 | ✔ |
| Alerta informativo | `#1C5FB8` em `#E8F1FD` | 5,46:1 | ✔ |
| Alto contraste: texto | `#FFFFFF` em `#000000` | 21,00:1 | ✔ |
| Alto contraste: destaques | `#FFD700` em `#000000` | 14,97:1 | ✔ |
| Alto contraste: títulos e botões | `#00FF88` em `#000000` (e o inverso) | 15,66:1 | ✔ |
| Foco (não textual, mínimo 3:1) | `#1C5FB8` em `#FFFFFF` | 6,22:1 | ✔ |
| Borda dos campos (não textual, mínimo 3:1) | `#6B7280` em `#FFFFFF` | 4,83:1 | ✔ |

Além da tabela, um teste percorre todos os textos visíveis das três páginas, nos modos normal e alto contraste, e confirma que cada um atinge 4,5:1 (ou 3:1, se for texto grande) contra o fundo real.

## Versionamento

- **GitFlow simplificado:**
  - `main`: versão estável, de produção;
  - `develop`: integração;
  - `feature/*` ou `feat/*`: funcionalidades;
  - `hotfix/*`: correções urgentes a partir da `main`.

  O histórico usa os dois prefixos de feature. As Experiências I e II usaram `feature/`, e a partir da III passou a ser `feat/`, alinhado ao tipo do Conventional Commits. A `develop` foi criada na Experiência IV a partir da `main` estável. Nenhuma `hotfix/*` foi necessária até agora.
- **Pull Requests:** toda mudança entra por PR, primeiro `feat/*` → `develop` e depois `develop` → `main` na release.
- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `build:` e `chore:`. Os commits das primeiras experiências são anteriores a essa convenção e não foram reescritos.
- **SemVer (`MAJOR.MINOR.PATCH`):** a versão 1.3.0 é a primeira publicada como tag. As experiências anteriores equivalem a 1.0.0 (HTML5), 1.1.0 (CSS) e 1.2.0 (SPA), mas não receberam tag.

## Releases

- **v1.3.0 — Acessibilidade e Produção:** melhorias WCAG 2.1 AA, navegação por teclado, alto contraste, documentação, otimização, build com Vite e preparação para deploy. Veja em [Releases](https://github.com/juanverass/projeto-ong-html5/releases).

## Testes

Os testes foram automatizados com Puppeteer (Chrome) e [axe-core](https://github.com/dequelabs/axe-core), e executados no `npm run dev` e no `npm run preview` (build de produção). Os scripts de teste ficam fora do repositório.

- **Acessibilidade: 59 verificações.**
  - axe-core sem violações WCAG 2.1 A/AA nas três páginas, nos modos normal e alto contraste, incluindo o formulário com erros exibidos;
  - landmarks, títulos, `alt`, `width`/`height`, labels e ausência de `tabindex` positivo;
  - skip link;
  - ordem de Tab no cabeçalho, dropdown, menu mobile e formulário;
  - Enter, Space, setas e Esc;
  - foco visível em todas as paradas de Tab;
  - alto contraste (ativar pelo teclado, `aria-pressed`, persistência e navegação);
  - `aria-invalid` e `aria-describedby`;
  - toast sem roubar o foco;
  - contraste medido no DOM.
- **Regressão da SPA: 55 verificações.**
  - navegação (incluindo voltar/avançar e recarregar);
  - envio vazio e campos inválidos (e-mail, CPF, telefone, CEP, data);
  - envio válido e máscaras;
  - localStorage (salvar, recarregar, fechar e reabrir o navegador, apagar, JSON corrompido, XSS);
  - menu, dropdown, toast e responsividade em 375/480/768/1024/1440px.
- **Lighthouse** (`vite preview`, rotas Início, Projetos e Cadastro):

  | Categoria | Mobile | Desktop |
  |---|---|---|
  | Performance | 99–100 | 100 |
  | Acessibilidade | 100 | 100 |
  | Best Practices | 100 | 100 |
  | CLS | 0 | 0 |
  | LCP | 1,6–2,0 s | 0,5–0,6 s |

- **W3C:** o Nu HTML Checker não aponta erros nem avisos nos HTMLs (fonte, build e HTML renderizado de cada rota). O CSS Validator (Jigsaw) dá 0 erros; os 12 avisos são informativos, porque ele não verifica variáveis CSS.
- **Console e rede:** nenhum erro, aviso ou recurso 404 durante os fluxos.

### Problemas encontrados e corrigidos na Experiência IV

- O foco amarelo sobre fundo branco tinha só 1,79:1 e a borda dos campos 1,47:1, abaixo dos 3:1 exigidos para componentes (WCAG 1.4.11). Criei as cores `--cor-foco` e `--cor-borda-campo`.
- O botão de calendário do campo de data não mostrava foco ao receber Tab. Resolvido com `:focus-within` no campo.
- O CLS era de 0,14 porque o rodapé "pulava" quando a SPA renderizava. O `#app` agora ocupa ao menos uma tela, e o CLS caiu para 0.
- Havia um espaço extra de 16px no cabeçalho mobile com o menu fechado.
- O botão hambúrguer tinha um nome genérico ("Menu de navegação"). Agora ele alterna entre "Abrir menu" e "Fechar menu".
- A propriedade obsoleta `clip` foi trocada por `clip-path`, eliminando os avisos do Jigsaw.

## Otimização

Medições reais. O "original" é o código-fonte e a "produção" é a saída do `npm run build`.

| Recurso | Original | Produção | Redução |
|---|---|---|---|
| CSS (`style.css`) | 31.668 B | 20.619 B | 34,9% |
| JavaScript (5 módulos → 1 bundle) | 40.906 B | 26.322 B | 35,7% |
| CSS + JS | 72.574 B | 46.941 B | **35,3%** |
| CSS com gzip | 6.543 B | 4.519 B | 30,9% |
| JS com gzip | 10.709 B | 7.763 B | 27,5% |
| HTML (`html/index.html`) | 3.815 B | 3.858 B | −1,1% |

*Redução = (original − produção) ÷ original × 100.*

- **HTML:** o Vite não minifica HTML por padrão. A build só injeta os links dos arquivos gerados, por isso o arquivo fica 43 bytes maior. Não foi adicionado plugin para isso, porque o ganho seria de poucos bytes.
- **Imagens:** mantêm WebP e 1448×1086 px. Foram recodificadas com qualidade 75 (sharp/libwebp), sem diferença visível na comparação em 100% (diferença média de 2,25 em 255 por canal):

  | Imagem | Antes | Depois | Redução |
  |---|---|---|---|
  | `ong-home.webp` | 167.814 B | 109.894 B | 34,5% |
  | `projeto-educacao.webp` | 173.512 B | 112.134 B | 35,4% |
  | `voluntariado-doacoes.webp` | 161.314 B | 107.274 B | 33,5% |
  | **Total** | 502.640 B | 329.302 B | **34,5%** |

- **Carregamento:**
  - a imagem principal usa `fetchpriority="high"` e as demais usam `loading="lazy"` e `decoding="async"`;
  - `preconnect` para o CDN do IMask;
  - scripts com `defer`/`type="module"`, sem bloquear a renderização.
- **Oportunidade não aplicada:** o Lighthouse aponta que imagens responsivas (`srcset`) economizariam cerca de 85 KiB no celular. Não implementei para não criar versões extras das imagens.

## Produção

- **Plataforma:** Vercel, com a configuração em `vercel.json`:
  - Framework: Vite
  - Install Command: `npm install`
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Redirecionamento de `/` para `/html/`
- **CI/CD:** com o repositório conectado à Vercel, cada merge na `main` dispara um novo deploy de produção:

  ```text
  merge na main → Vercel → npm install → npm run build → dist/ → deploy
  ```

  PRs e outras branches geram deploys de pré-visualização.
- **URL de produção:** ainda não publicada. Veja o passo a passo abaixo.

**Como conectar à Vercel (uma vez):**
1. Em https://vercel.com, entre com a conta do GitHub e clique em **Add New… → Project**.
2. Importe o repositório `juanverass/projeto-ong-html5`. As configurações vêm do `vercel.json`: Vite, `npm run build`, `dist`.
3. Clique em **Deploy**. A partir daí, cada merge na `main` publica uma nova versão.

O GitHub Pages continua publicando o código-fonte da `main` sem build. Ele funciona porque o projeto usa módulos ES6 nativos, mas a versão otimizada é a da Vercel.

## Histórico das experiências

| Experiência | Conteúdo | PR |
|---|---|---|
| I: HTML5 | páginas semânticas, formulário com validação nativa | commit inicial |
| II: Estilização e Layouts | Design System, Grid de 12 colunas, 5 breakpoints, componentes | #1 |
| III: Interatividade | SPA modular, templates, eventos, localStorage, IMask | #2 |
| IV: Versionamento e Acessibilidade | WCAG 2.1 AA, alto contraste, Vite, otimização, GitFlow, release | ver milestone "Experiência Prática IV" |
