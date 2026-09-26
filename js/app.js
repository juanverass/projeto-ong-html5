// Ponto de entrada: registra os eventos globais (uma única vez) e integra os módulos.
// Todos os listeners usam delegação no document, então re-renderizar #app não os duplica.

import { iniciarRouter, navegarPorLink } from './router.js';
import { obterCadastro, removerCadastro, salvarCadastro } from './storage.js';
import { formasParticipacao, templateCadastroSalvo } from './templates.js';
import {
    destruirMascaras,
    iniciarMascaras,
    limparValidacao,
    mostrarToast,
    obterDadosFormulario,
    preencherFormulario,
    validarCampo,
    validarFormulario
} from './validacoes.js';

const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu-principal');

/* Menu responsivo ------------------------------------------------------ */

function definirMenuAberto(aberto) {
    menu.classList.toggle('ativo', aberto);
    botaoMenu.setAttribute('aria-expanded', String(aberto));
}

/* Cadastro ------------------------------------------------------------- */

function obterFormulario() {
    return document.getElementById('formulario-cadastro');
}

function atualizarResumoCadastro() {
    const area = document.getElementById('cadastro-salvo');
    if (!area) {
        return;
    }
    const cadastro = obterCadastro();
    area.innerHTML = cadastro ? templateCadastroSalvo(cadastro) : '';
}

function atualizarInfoParticipacao(formulario) {
    const escolhida = formulario.querySelector('input[name="participacao"]:checked');
    const forma = formasParticipacao.find((item) => item.valor === escolhida?.value);
    formulario.querySelector('#info-participacao').textContent = forma ? forma.info : '';
}

function iniciarPaginaCadastro() {
    const formulario = obterFormulario();
    iniciarMascaras(formulario);

    const cadastro = obterCadastro();
    if (cadastro) {
        preencherFormulario(formulario, cadastro);
        atualizarInfoParticipacao(formulario);
    }
    atualizarResumoCadastro();
}

/* Eventos -------------------------------------------------------------- */

function aoClicar(evento) {
    // Navegação SPA
    const link = evento.target.closest('a[data-page]');
    const abrirEmNovaAba = evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.button !== 0;
    if (link && !abrirEmNovaAba) {
        evento.preventDefault();
        definirMenuAberto(false);
        navegarPorLink(link);
        return;
    }

    // Menu hambúrguer
    if (evento.target.closest('.menu-toggle')) {
        definirMenuAberto(!menu.classList.contains('ativo'));
        return;
    }

    // Botões de demonstração do toast
    const botaoToast = evento.target.closest('[data-toast]');
    if (botaoToast) {
        mostrarToast(botaoToast.dataset.toast);
        return;
    }

    // Apagar o cadastro salvo no localStorage
    if (evento.target.closest('[data-acao="apagar-cadastro"]')) {
        removerCadastro();
        obterFormulario()?.reset();
        atualizarResumoCadastro();
        mostrarToast('Cadastro removido deste navegador.');
    }
}

function aoEnviar(evento) {
    const formulario = evento.target;
    if (formulario.id !== 'formulario-cadastro') {
        return;
    }

    evento.preventDefault();

    if (!validarFormulario(formulario)) {
        return;
    }

    if (salvarCadastro(obterDadosFormulario(formulario))) {
        atualizarResumoCadastro();
        mostrarToast('Cadastro salvo com sucesso!');
    } else {
        mostrarToast('Não foi possível salvar o cadastro neste navegador.');
    }
}

// input: feedback em tempo real enquanto o usuário digita
function aoDigitar(evento) {
    const campo = evento.target;
    if (campo.form?.id === 'formulario-cadastro' && campo.matches('input:not([type="radio"])')) {
        validarCampo(campo);
    }
}

// change: select de estado, rádios de participação e data
function aoAlterar(evento) {
    const campo = evento.target;
    if (campo.form?.id !== 'formulario-cadastro' || !campo.matches('select, input[type="radio"], input[type="date"]')) {
        return;
    }
    validarCampo(campo);
    if (campo.name === 'participacao') {
        atualizarInfoParticipacao(campo.form);
    }
}

function aoLimpar(evento) {
    const formulario = evento.target;
    if (formulario.id === 'formulario-cadastro') {
        limparValidacao(formulario);
        formulario.querySelector('#info-participacao').textContent = '';
    }
}

function aoPressionarTecla(evento) {
    if (evento.key === 'Escape' && menu.classList.contains('ativo')) {
        definirMenuAberto(false);
        botaoMenu.focus();
    }
}

/* Inicialização -------------------------------------------------------- */

document.addEventListener('click', aoClicar);
document.addEventListener('submit', aoEnviar);
document.addEventListener('input', aoDigitar);
document.addEventListener('change', aoAlterar);
document.addEventListener('reset', aoLimpar);
document.addEventListener('keydown', aoPressionarTecla);

window.addEventListener('paginaSaindo', (evento) => {
    if (evento.detail.pagina === 'cadastro') {
        destruirMascaras();
    }
});

window.addEventListener('paginaRenderizada', (evento) => {
    if (evento.detail.pagina === 'cadastro') {
        iniciarPaginaCadastro();
    }
});

iniciarRouter();
