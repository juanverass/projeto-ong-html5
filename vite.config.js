import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// O projeto mantém as pastas html/, css/, js/ e imagens/ exigidas pela atividade.
// Por isso há duas entradas HTML: a SPA em html/index.html e o index.html da raiz,
// que só redireciona para ela.
export default defineConfig({
    // Caminhos relativos: a build funciona na raiz de um domínio (Vercel)
    // ou dentro de uma subpasta (GitHub Pages).
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                redirecionamento: resolve(import.meta.dirname, 'index.html'),
                app: resolve(import.meta.dirname, 'html/index.html')
            }
        }
    }
});
