# Podicrê - Podcast Website

Um site de podcast moderno e responsivo, 100% compatível com GitHub Pages. Sem necessidade de banco de dados ou backend.

## 🎙️ Sobre o Podicrê

O Podicrê é um podcast de inspiração diária que aborda temas como desenvolvimento pessoal, criatividade, produtividade, bem-estar e muito mais. Este site foi criado para ser uma plataforma simples e eficiente para compartilhar episódios e conectar-se com a comunidade de ouvintes.

## ✨ Características

- **Totalmente estático**: Sem banco de dados, perfeito para GitHub Pages
- **Design responsivo**: Funciona perfeitamente em todos os dispositivos
- **Player de áudio integrado**: Reprodução contínua de episódios
- **Busca e filtragem**: Encontre episódios por título, descrição ou categoria
- **Modal de episódios**: Visualização detalhada de cada episódio
- **Design moderno**: Interface limpa e atraente
- **Tema claro/escuro**: Alternância entre modos claro e escuro
- **Cores vibrantes**: Laranja (#ff900e) e vermelho escuro (#931c1c)
- **Performance otimizada**: Carregamento rápido e eficiente

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com Grid, Flexbox e animações
- **JavaScript ES6+**: Lógica interativa sem frameworks
- **JSON**: Armazenamento de dados de episódios e categorias
- **Font Awesome**: Ícones modernos
- **Google Fonts**: Tipografia elegante

## 📁 Estrutura do Projeto

```
podicre/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── app.js                  # Lógica JavaScript
├── data/                   # Dados do podcast
│   ├── episodes.json       # Lista de episódios
│   └── categories.json     # Categorias de episódios
├── assets/                 # Imagens e recursos
└── README.md              # Este arquivo
```

## 📝 Como Adicionar Novos Episódios

1. **Edite o arquivo `data/episodes.json`**
2. **Adicione um novo objeto de episódio** seguindo este formato:

```json
{
  "id": 16,
  "title": "Título do Novo Episódio",
  "description": "Descrição detalhada do episódio.",
  "audioUrl": "URL_DO_ARQUIVO_DE_AUDIO",
  "imageUrl": "URL_DA_IMAGEM_DO_EPISÓDIO",
  "categoryId": 2,
  "date": "2024-01-20",
  "duration": "25:30"
}
```

3. **Campos obrigatórios**:
   - `id`: Número único do episódio
   - `title`: Título do episódio
   - `description`: Descrição do episódio
   - `audioUrl`: URL do arquivo de áudio (MP3)
   - `imageUrl`: URL da imagem de capa
   - `categoryId`: ID da categoria (deve existir em categories.json)
   - `date`: Data de publicação (formato: YYYY-MM-DD)
   - `duration`: Duração do episódio (formato: MM:SS)

## 🏷️ Como Adicionar Novas Categorias

1. **Edite o arquivo `data/categories.json`**
2. **Adicione um novo objeto de categoria**:

```json
{
  "id": 9,
  "name": "Nome da Categoria",
  "slug": "nome-da-categoria"
}
```

## 🌐 Deploy no GitHub Pages

1. **Faça fork deste repositório** ou clone para sua máquina
2. **Faça as alterações necessárias** nos arquivos JSON
3. **Faça commit e push** para o repositório
4. **No GitHub**, vá para as configurações do repositório
5. **Role até a seção "Pages"**
6. **Selecione a branch** (normalmente `main` ou `master`)
7. **Escolha a pasta** `/ (root)` 
8. **Salve as configurações**

O site estará disponível em: `https://seu-usuario.github.io/podicre/`

## 🎨 Personalização

### Cores do Tema
Edite as variáveis CSS em `styles.css`:

```css
:root {
    --primary-color: #667eea;     /* Cor principal */
    --secondary-color: #764ba2;   /* Cor secundária */
    --accent-color: #f093fb;      /* Cor de destaque */
    --text-color: #333;           /* Cor do texto */
    --bg-color: #f8f9fa;          /* Cor de fundo */
}
```

### Tipografia
As fontes são carregadas do Google Fonts. Para mudar:

1. **Altere o link no `<head>` do `index.html`**
2. **Atualize as declarações `font-family` no `styles.css`**

### Logo e Identidade
Substitua as imagens na pasta `assets/`:
- `cover-art.jpg`: Capa principal do podcast
- `about-image.jpg`: Imagem da seção Sobre

## 🔧 Desenvolvimento

### Requisitos
- Nenhum! Apenas um editor de texto e um navegador.

### Para testar localmente
1. **Abra o arquivo `index.html`** no seu navegador
2. **Ou use um servidor local** como Live Server (VS Code extension)

### Estrutura de Dados

#### Episódios
```javascript
{
  id: number,
  title: string,
  description: string,
  audioUrl: string,
  imageUrl: string,
  categoryId: number,
  date: string,
  duration: string
}
```

#### Categorias
```javascript
{
  id: number,
  name: string,
  slug: string
}
```

## 📱 Compatibilidade

- **Navegadores modernos**: Chrome, Firefox, Safari, Edge
- **Dispositivos móveis**: iOS, Android
- **GitHub Pages**: Totalmente compatível

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Dê push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Unsplash](https://unsplash.com/) - Imagens de alta qualidade
- [SoundHelix](https://www.soundhelix.com/) - Áudios de demonstração
- [Font Awesome](https://fontawesome.com/) - Ícones incríveis
- [Google Fonts](https://fonts.google.com/) - Tipografia maravilhosa

---

**Podicrê** - Inspiração para o seu dia a dia 🌟

Para mais informações, entre em contato ou visite nosso repositório no GitHub.