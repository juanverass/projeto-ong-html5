// Templates das páginas da SPA. Cada função devolve o HTML da área principal (#app).

// Caminhos das imagens resolvidos a partir deste módulo. O Vite reconhece o padrão
// new URL(..., import.meta.url), copia a imagem para a build e ajusta o endereço.
const imagens = {
    home: new URL('../imagens/ong-home.webp', import.meta.url).href,
    educacao: new URL('../imagens/projeto-educacao.webp', import.meta.url).href,
    voluntariado: new URL('../imagens/voluntariado-doacoes.webp', import.meta.url).href
};

const projetos = [
    {
        id: 'educacao',
        titulo: 'Projeto de Educação',
        categoria: 'Educação',
        classeBadge: 'badge-info',
        status: 'Ativo',
        descricao: 'O projeto oferece atividades educativas, apoio escolar e incentivo à leitura para crianças e adolescentes.',
        imagem: imagens.educacao,
        alt: 'Dois voluntários ajudando crianças sorridentes a desenhar e escrever em cadernos, em uma sala com livros e lápis de cor sobre a mesa.',
        acao: 'Quero participar'
    },
    {
        id: 'alimentos',
        titulo: 'Campanha de Alimentos',
        categoria: 'Doações',
        classeBadge: 'badge-aviso',
        status: 'Ativo',
        descricao: 'A campanha arrecada alimentos, roupas e itens de higiene que são destinados às famílias atendidas pela organização.',
        imagem: imagens.voluntariado,
        alt: 'Voluntários separando roupas, alimentos enlatados, óleo e produtos de higiene arrecadados pela campanha em caixas de doação.',
        acao: 'Quero doar'
    }
];

const pilares = [
    { titulo: 'Solidariedade', texto: 'Ações coletivas que aproximam voluntários, doadores e comunidades.' },
    { titulo: 'Educação', texto: 'Atividades educativas, apoio escolar e incentivo à leitura.' },
    { titulo: 'Apoio social', texto: 'Arrecadação e entrega de alimentos, roupas e itens de higiene.' }
];

const badgesVitrine = [
    { texto: 'Ativo', classe: 'badge-sucesso' },
    { texto: 'Educação', classe: 'badge-info' },
    { texto: 'Voluntariado', classe: 'badge-info' },
    { texto: 'Doações', classe: 'badge-aviso' }
];

const alertasVitrine = [
    { tipo: 'sucesso', titulo: 'Sucesso', texto: 'seu cadastro foi recebido pela equipe.' },
    { tipo: 'erro', titulo: 'Erro', texto: 'verifique os campos destacados antes de enviar.' },
    { tipo: 'aviso', titulo: 'Atenção', texto: 'CPF, telefone e CEP devem seguir o formato indicado.' },
    { tipo: 'info', titulo: 'Informação', texto: 'a campanha de alimentos recebe doações o ano todo.' }
];

export const estados = [
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' }
];

export const formasParticipacao = [
    {
        valor: 'voluntario',
        rotulo: 'Trabalho voluntário',
        info: 'Você será convidado para ajudar na organização das doações, nas atividades educativas e nas ações nas comunidades.'
    },
    {
        valor: 'doacao',
        rotulo: 'Doação',
        info: 'Você receberá informações sobre contribuições financeiras e sobre a doação de alimentos, roupas e produtos de higiene.'
    }
];

const camposDadosPessoais = [
    { id: 'nome', rotulo: 'Nome completo', tipo: 'text', largo: true,
      atributos: 'autocomplete="name" placeholder="Seu nome completo"' },
    { id: 'email', rotulo: 'E-mail', tipo: 'email', largo: true,
      atributos: 'autocomplete="email" placeholder="nome@exemplo.com"' },
    { id: 'nascimento', rotulo: 'Data de nascimento', tipo: 'date',
      atributos: 'autocomplete="bday"' },
    { id: 'cpf', rotulo: 'CPF', tipo: 'text',
      atributos: String.raw`inputmode="numeric" pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}" maxlength="14" placeholder="000.000.000-00" title="Formato: 000.000.000-00"` },
    { id: 'telefone', rotulo: 'Telefone', tipo: 'tel',
      atributos: String.raw`autocomplete="tel" pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}" maxlength="15" placeholder="(00) 00000-0000" title="Formato: (00) 00000-0000"` }
];

const camposEndereco = [
    { id: 'cep', rotulo: 'CEP', tipo: 'text',
      atributos: 'inputmode="numeric" autocomplete="postal-code" pattern="[0-9]{5}-[0-9]{3}" maxlength="9" placeholder="00000-000" title="Formato: 00000-000"' },
    { id: 'endereco', rotulo: 'Endereço', tipo: 'text', largo: true,
      atributos: 'autocomplete="address-line1" placeholder="Rua, número e complemento"' },
    { id: 'cidade', rotulo: 'Cidade', tipo: 'text',
      atributos: 'autocomplete="address-level2" placeholder="Sua cidade"' }
];

/** Evita que dados digitados pelo usuário virem HTML ao serem exibidos. */
export function escaparHtml(texto) {
    return String(texto ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function templateCardProjeto(projeto) {
    return `
        <article class="card" aria-labelledby="${projeto.id}-titulo">
            <img class="card-imagem" src="${projeto.imagem}" width="1448" height="1086" loading="lazy" decoding="async" alt="${projeto.alt}">
            <div class="card-corpo">
                <div class="card-conteudo">
                    <ul class="lista-badges" aria-label="Categorias">
                        <li class="badge ${projeto.classeBadge}">${projeto.categoria}</li>
                        <li class="badge badge-sucesso">${projeto.status}</li>
                    </ul>
                    <h3 id="${projeto.id}-titulo">${projeto.titulo}</h3>
                    <p>${projeto.descricao}</p>
                </div>
                <div class="grupo-botoes">
                    <a class="botao" href="#cadastro" data-page="cadastro">${projeto.acao}</a>
                </div>
            </div>
        </article>`;
}

function templateCampo({ id, rotulo, tipo, largo = false, atributos = '' }) {
    return `
        <p class="campo${largo ? ' campo-largo' : ''}">
            <label for="${id}">${rotulo}</label>
            <input type="${tipo}" id="${id}" name="${id}" ${atributos} aria-describedby="erro-${id}" required>
            <span class="mensagem-erro" id="erro-${id}"></span>
        </p>`;
}

export function templateInicio() {
    return `
        <section class="secao secao-destaque" aria-labelledby="sobre-titulo">
            <div class="container">
                <div class="destaque-texto">
                    <span class="badge badge-sucesso">ONG ativa</span>
                    <h1 class="destaque-titulo" tabindex="-1">Solidariedade em Ação</h1>
                    <h2 id="sobre-titulo" class="destaque-subtitulo">Sobre a ONG</h2>
                    <p>A Solidariedade em Ação é uma organização dedicada ao desenvolvimento de projetos sociais voltados para pessoas em situação de vulnerabilidade.</p>
                    <p>Nosso objetivo é promover solidariedade, educação e apoio social por meio da participação de voluntários e doadores.</p>
                    <div class="grupo-botoes">
                        <a class="botao" href="#projetos" data-page="projetos">Conheça nossos projetos</a>
                        <a class="botao botao-secundario" href="#cadastro" data-page="cadastro">Quero participar</a>
                    </div>
                </div>
                <figure class="destaque-imagem">
                    <img src="${imagens.home}" width="1448" height="1086" fetchpriority="high"
                         alt="Voluntários sorridentes da Solidariedade em Ação entregando cestas com alimentos a uma moradora da comunidade, ao ar livre, com o Pão de Açúcar ao fundo.">
                </figure>
            </div>
        </section>

        <section class="secao secao-clara" aria-labelledby="missao-titulo">
            <div class="container">
                <div class="secao-cabecalho">
                    <h2 id="missao-titulo">Nossa missão</h2>
                    <p class="texto-grande">Desenvolver ações que contribuam para melhorar a qualidade de vida das comunidades atendidas, incentivando a participação social e o trabalho voluntário.</p>
                </div>
                <ul class="pilares">
                    ${pilares.map((pilar) => `
                        <li class="pilar">
                            <h3>${pilar.titulo}</h3>
                            <p>${pilar.texto}</p>
                        </li>`).join('')}
                </ul>
            </div>
        </section>

        <section class="secao" aria-labelledby="contato-titulo">
            <div class="container">
                <div class="contato">
                    <h2 id="contato-titulo">Entre em contato</h2>
                    <address class="contato-lista">
                        <p><strong>E-mail:</strong> <a href="mailto:contato@solidariedadeemacao.org.br">contato@solidariedadeemacao.org.br</a></p>
                        <p><strong>Telefone:</strong> <a href="tel:+5521999999999">(21) 99999-9999</a></p>
                        <p><strong>Localização:</strong> Rua da Esperança, 100 – Centro, Rio de Janeiro – RJ</p>
                    </address>
                </div>
            </div>
        </section>`;
}

export function templateProjetos() {
    return `
        <header class="cabecalho-pagina">
            <div class="container">
                <div class="cabecalho-pagina-texto">
                    <h1 tabindex="-1">Projetos sociais</h1>
                    <p>Conheça as iniciativas da Solidariedade em Ação e descubra como você pode participar.</p>
                </div>
            </div>
        </header>

        <section class="secao" aria-labelledby="iniciativas-titulo">
            <div class="container">
                <div class="secao-cabecalho iniciativas-cabecalho">
                    <h2 id="iniciativas-titulo">Nossas iniciativas</h2>
                    <p>Projetos contínuos que atendem crianças, adolescentes e famílias das comunidades.</p>
                </div>
                ${projetos.map(templateCardProjeto).join('')}
            </div>
        </section>

        <section class="secao secao-clara" id="participe" tabindex="-1" aria-label="Como participar">
            <div class="container">
                <figure class="participe-imagem">
                    <img src="${imagens.home}" width="1448" height="1086" loading="lazy" decoding="async"
                         alt="Voluntários da Solidariedade em Ação entregando pacotes de arroz, feijão, óleo e frutas a uma moradora da comunidade.">
                </figure>

                <div class="participe-opcoes">
                    <section class="painel" id="voluntariado" tabindex="-1" aria-labelledby="voluntariado-titulo">
                        <span class="badge badge-info">Voluntariado</span>
                        <h2 id="voluntariado-titulo">Voluntariado</h2>
                        <p>Os voluntários podem participar da organização das doações, das atividades educativas e das ações realizadas nas comunidades.</p>
                        <div class="grupo-botoes">
                            <a class="botao" href="#cadastro" data-page="cadastro">Cadastre-se como voluntário</a>
                        </div>
                    </section>

                    <section class="painel" id="doacoes" tabindex="-1" aria-labelledby="doacoes-titulo">
                        <span class="badge badge-aviso">Doações</span>
                        <h2 id="doacoes-titulo">Doações</h2>
                        <p>Pessoas interessadas também podem colaborar por meio de contribuições financeiras ou da doação de alimentos, roupas e produtos de higiene.</p>
                        <div class="grupo-botoes">
                            <a class="botao botao-secundario" href="#cadastro" data-page="cadastro">Cadastre-se como doador</a>
                        </div>
                    </section>
                </div>
            </div>
        </section>

        <section class="secao" id="componentes" tabindex="-1" aria-labelledby="componentes-titulo">
            <div class="container">
                <div class="secao-cabecalho">
                    <h2 id="componentes-titulo">Componentes da interface</h2>
                    <p>Padrões visuais do Design System usados nas páginas do site.</p>
                </div>

                <div class="vitrine">
                    <h3>Badges</h3>
                    <ul class="lista-badges" aria-label="Exemplos de badges">
                        ${badgesVitrine.map((badge) => `<li class="badge ${badge.classe}">${badge.texto}</li>`).join('')}
                    </ul>
                </div>

                <div class="vitrine">
                    <h3>Botões</h3>
                    <div class="grupo-botoes">
                        <button type="button">Botão principal</button>
                        <button type="button" class="botao-secundario">Botão secundário</button>
                        <button type="button" disabled>Botão desabilitado</button>
                    </div>
                </div>

                <div class="vitrine vitrine-larga">
                    <h3>Alertas</h3>
                    <div class="grade-alertas">
                        ${alertasVitrine.map((alerta) => `
                            <div class="alerta alerta-${alerta.tipo}">
                                <p><strong>${alerta.titulo}:</strong> ${alerta.texto}</p>
                            </div>`).join('')}
                    </div>
                </div>

                <div class="vitrine vitrine-larga">
                    <h3>Toast</h3>
                    <p>O toast confirma ações sem recarregar a página e some sozinho após alguns segundos.</p>
                    <div class="grupo-botoes">
                        <button type="button" data-toast="Cadastro salvo com sucesso!">Mostrar toast de sucesso</button>
                    </div>
                </div>
            </div>
        </section>`;
}

export function templateCadastro() {
    return `
        <header class="cabecalho-pagina">
            <div class="container">
                <div class="cabecalho-pagina-texto">
                    <h1 tabindex="-1">Cadastro de voluntários e doadores</h1>
                    <p>Preencha o formulário abaixo para participar das ações da Solidariedade em Ação. Todos os campos são obrigatórios.</p>
                </div>
            </div>
        </header>

        <div class="secao">
            <div class="container">
                <aside class="cadastro-ajuda" aria-label="Orientações de preenchimento">
                    <div class="alerta alerta-info">
                        <p><strong>Todos os campos são obrigatórios.</strong> Seus dados ficam salvos neste navegador para você revisar depois.</p>
                    </div>
                    <div class="alerta alerta-aviso">
                        <p><strong>Formatos:</strong> CPF 000.000.000-00, telefone (00) 00000-0000 e CEP 00000-000. A máscara é aplicada enquanto você digita.</p>
                    </div>
                    <div id="cadastro-salvo"></div>
                </aside>

                <form class="formulario" id="formulario-cadastro" action="#" method="post" novalidate>
                    <fieldset>
                        <legend>Dados pessoais</legend>
                        <div class="campos">
                            ${camposDadosPessoais.map(templateCampo).join('')}
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Endereço</legend>
                        <div class="campos">
                            ${camposEndereco.map(templateCampo).join('')}
                            <p class="campo">
                                <label for="estado">Estado</label>
                                <select id="estado" name="estado" autocomplete="address-level1" aria-describedby="erro-estado" required>
                                    <option value="">Selecione o estado</option>
                                    ${estados.map((estado) => `<option value="${estado.sigla}">${estado.nome} (${estado.sigla})</option>`).join('')}
                                </select>
                                <span class="mensagem-erro" id="erro-estado"></span>
                            </p>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Forma de participação</legend>
                        <div class="opcoes" id="grupo-participacao">
                            ${formasParticipacao.map((forma, indice) => `
                                <p class="opcao">
                                    <input type="radio" id="${forma.valor}" name="participacao" value="${forma.valor}" aria-describedby="erro-participacao"${indice === 0 ? ' required' : ''}>
                                    <label for="${forma.valor}">${forma.rotulo}</label>
                                </p>`).join('')}
                        </div>
                        <span class="mensagem-erro" id="erro-participacao"></span>
                        <p class="info-participacao" id="info-participacao" aria-live="polite"></p>
                    </fieldset>

                    <div id="feedback-formulario" aria-live="polite"></div>

                    <div class="grupo-botoes">
                        <button type="submit">Enviar cadastro</button>
                        <button type="reset" class="botao-secundario">Limpar campos</button>
                    </div>
                </form>
            </div>
        </div>`;
}

/** Resumo do cadastro salvo exibido ao lado do formulário. */
export function templateCadastroSalvo(dados) {
    const forma = formasParticipacao.find((item) => item.valor === dados.participacao);
    const salvoEm = dados.salvoEm ? new Date(dados.salvoEm) : null;
    const dataFormatada = salvoEm && !Number.isNaN(salvoEm.getTime())
        ? salvoEm.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
        : '';

    return `
        <div class="alerta alerta-sucesso cadastro-salvo">
            <p><strong>Cadastro salvo neste navegador.</strong></p>
            <p>${escaparHtml(dados.nome)}${forma ? ` · ${forma.rotulo}` : ''}${dataFormatada ? ` · salvo em ${dataFormatada}` : ''}</p>
            <div class="grupo-botoes">
                <button type="button" class="botao-secundario botao-pequeno" data-acao="apagar-cadastro">Apagar cadastro salvo</button>
            </div>
        </div>`;
}

/** Resumo exibido quando o envio falha na validação. */
export function templateErrosFormulario(rotulosInvalidos) {
    const quantidade = rotulosInvalidos.length;
    return `
        <div class="alerta alerta-erro">
            <p><strong>${quantidade === 1 ? 'Há 1 campo' : `Há ${quantidade} campos`} para corrigir:</strong> ${rotulosInvalidos.map(escaparHtml).join(', ')}.</p>
        </div>`;
}
