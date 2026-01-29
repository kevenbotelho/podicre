# Podicrê - Website

Site estático para o videocast Podicrê, desenvolvido com foco em performance extrema e design responsivo.

## 🎯 Características

- **Performance Extrema**: Carregamento < 500ms
- **Design Maximalista Tátil**: Elementos 3D e texturas urbanas
- **Mobile First**: Totalmente responsivo
- **SEO Otimizado**: Meta tags e estrutura semântica
- **Integrações**: Player híbrido YouTube/Áudio, newsletter, redes sociais

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Animações, gradientes, 3D
- **JavaScript ES6+**: Interatividade sem frameworks
- **Google Fonts**: Space Grotesk + JetBrains Mono
- **GitHub Pages**: Deploy estático

## 🎨 Identidade Visual

- **Paleta**: Preto (#050505), Roxo Elétrico (#8A2BE2), Amarelo Marca-Texto (#CCFF00)
- **Tipografia**: Space Grotesk (títulos), JetBrains Mono (corpo)
- **Estética**: Maximalismo Tátil com elementos 3D flutuantes

## 📁 Estrutura de Arquivos

```
podicre/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md          # Documentação
```

## 🚀 Deploy no GitHub Pages

1. Faça fork deste repositório
2. No GitHub, vá em Settings > Pages
3. Selecione a branch `main` e a pasta `/ (root)`
4. O site estará disponível em `https://seu-usuario.github.io/podicre/`

## 📱 Funcionalidades

- **Player Híbrido**: Vídeo YouTube + Áudio Sticky
- **Newsletter**: Integração via formulário
- **E-commerce Estático**: Botões de compra externos
- **Navegação**: Menu fixo com scroll suave
- **Animações**: Scroll reveal e hover effects

## 🔧 Personalização

### Cores
Edite as variáveis CSS em `:root` no `style.css`:

```css
--primary-color: #8A2BE2; /* Roxo Elétrico */
--secondary-color: #CCFF00; /* Amarelo Marca-Texto */
```

### Conteúdo
Atualize os arrays de dados no `script.js`:

```javascript
const episodes = [...]; // Episódios
const products = [...]; // Produtos da loja
```

### Fontes
Modifique as importações no `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

## 📈 Performance

- **Imagens**: WebP com lazy loading
- **CSS**: Minificado e crítico inline
- **JavaScript**: Módulos e debounce
- **Fonts**: Preload e fallback
- **SEO**: Meta tags Open Graph

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nome-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona feature X'`
4. Push para a branch: `git push origin feature/nome-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

## 🙏 Agradecimentos

Aos ouvintes do Podicrê por fazerem esse projeto possível!

---

**Cultura que respira.**