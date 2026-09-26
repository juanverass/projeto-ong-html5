// Navegação da SPA: resolve a rota, renderiza o template em #app e avisa os outros módulos.

import { templateInicio, templateProjetos, templateCadastro } from './templates.js';

const PAGINA_PADRAO = 'inicio';

const paginas = {
    inicio: { template: templateInicio, titulo: 'Início' },
    projetos: { template: templateProjetos, titulo: 'Projetos' },
    cadastro: { template: templateCadastro, titulo: 'Cadastro' }
};

// Seções internas que podem ser acessadas direto pelo hash (ex.: #voluntariado).
const secoes = {
    participe: 'projetos',
    voluntariado: 'projetos',
    doacoes: 'projetos',
    componentes: 'projetos'
};

let paginaAtual = null;

/** Converte um hash (#cadastro, #voluntariado) em { pagina, secao }. */
export function resolverRota(hash) {
    const alvo = decodeURIComponent(hash.replace(/^#/, ''));

    if (paginas[alvo]) {
        return { pagina: alvo, secao: null };
    }
    if (secoes[alvo]) {
        return { pagina: secoes[alvo], secao: alvo };
    }
    return null;
}

function atualizarMenu(pagina) {
    document.querySelectorAll('.menu [data-page]').forEach((link) => {
        const ativo = link.dataset.page === pagina && !link.dataset.secao;
        if (ativo) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

function posicionarFoco(secao, moverFoco) {
    const alvo = secao ? document.getElementById(secao) : null;

    if (alvo) {
        alvo.scrollIntoView({ block: 'start' });
        if (moverFoco) {
            alvo.focus({ preventScroll: true });
        }
        return;
    }

    window.scrollTo(0, 0);
    if (moverFoco) {
        // Leva o foco ao título da nova página para leitores de tela anunciarem a troca.
        document.querySelector('#app h1')?.focus({ preventScroll: true });
    }
}

/**
 * Renderiza a página dentro de #app.
 * moverFoco: true quando a navegação veio do usuário (não no carregamento inicial).
 */
export function navegar(pagina, { secao = null, moverFoco = true } = {}) {
    const app = document.querySelector('#app');
    const nomePagina = paginas[pagina] ? pagina : PAGINA_PADRAO;
    const { template, titulo } = paginas[nomePagina];

    if (nomePagina !== paginaAtual) {
        window.dispatchEvent(new CustomEvent('paginaSaindo', { detail: { pagina: paginaAtual } }));
        app.innerHTML = template();
        paginaAtual = nomePagina;
        document.title = `${titulo} | Solidariedade em Ação`;
        atualizarMenu(nomePagina);
        window.dispatchEvent(new CustomEvent('paginaRenderizada', { detail: { pagina: nomePagina } }));
    }

    posicionarFoco(secao, moverFoco);
}

/** Navegação disparada por um link com data-page: atualiza o hash sem recarregar. */
export function navegarPorLink(link) {
    const pagina = link.dataset.page;
    const secao = link.dataset.secao ?? null;
    const hash = `#${secao ?? pagina}`;

    if (location.hash !== hash) {
        history.pushState(null, '', hash);
    }
    navegar(pagina, { secao });
}

/** Carrega a rota inicial e acompanha o botão voltar/avançar do navegador. */
export function iniciarRouter() {
    window.addEventListener('hashchange', () => {
        const rota = resolverRota(location.hash);

        // Hashes que não são rotas (ex.: link "Pular para o conteúdo") seguem o comportamento nativo.
        if (!rota) {
            if (!location.hash || !document.getElementById(location.hash.slice(1))) {
                navegar(PAGINA_PADRAO);
            }
            return;
        }
        navegar(rota.pagina, { secao: rota.secao });
    });

    const rotaInicial = resolverRota(location.hash) ?? { pagina: PAGINA_PADRAO, secao: null };
    navegar(rotaInicial.pagina, { secao: rotaInicial.secao, moverFoco: false });
}
