// Único módulo que acessa o localStorage diretamente.

const CHAVE_CADASTRO = 'solidariedadeCadastro';
const CHAVE_ALTO_CONTRASTE = 'solidariedadeAltoContraste';

/**
 * Salva o cadastro com a data do salvamento.
 * Retorna false se o navegador bloquear o armazenamento (modo privado, cota cheia).
 */
export function salvarCadastro(dados) {
    const registro = { ...dados, salvoEm: new Date().toISOString() };

    try {
        localStorage.setItem(CHAVE_CADASTRO, JSON.stringify(registro));
        return true;
    } catch (erro) {
        console.error('Não foi possível salvar o cadastro:', erro);
        return false;
    }
}

/**
 * Retorna o cadastro salvo ou null quando não existe ou está corrompido.
 */
export function obterCadastro() {
    let valor;

    try {
        valor = localStorage.getItem(CHAVE_CADASTRO);
    } catch {
        return null;
    }

    if (!valor) {
        return null;
    }

    try {
        const dados = JSON.parse(valor);
        return dados && typeof dados === 'object' ? dados : null;
    } catch {
        // Conteúdo inválido (editado à mão, por exemplo): descarta para não quebrar a tela.
        removerCadastro();
        return null;
    }
}

export function removerCadastro() {
    try {
        localStorage.removeItem(CHAVE_CADASTRO);
    } catch {
        // Sem acesso ao storage não há o que remover.
    }
}

/* Preferência de alto contraste ---------------------------------------- */

export function salvarPreferenciaContraste(ativo) {
    try {
        localStorage.setItem(CHAVE_ALTO_CONTRASTE, ativo ? 'ativo' : 'inativo');
    } catch {
        // Sem storage, a preferência vale só até recarregar a página.
    }
}

export function obterPreferenciaContraste() {
    try {
        return localStorage.getItem(CHAVE_ALTO_CONTRASTE) === 'ativo';
    } catch {
        return false;
    }
}
