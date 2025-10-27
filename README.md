# Portfólio Acadêmico — Gabriel Sarubi Motta Ferreira

Projeto em **Node.js + Express + EJS** com **CRUD** (GET/POST/PUT/DELETE) para cumprir os requisitos da Atividade Avaliativa.

## Como rodar

```bash
npm install
npm start
# abra http://localhost:3000
```

## Rotas principais

- `/` — Apresentação
- `/formacao` — Formação e cursos
- `/projetos` — Lista + CRUD de projetos (com endpoints REST)
- `/competencias` — Competências técnicas e interpessoais
- `/contato` — Links

### CRUD de Projetos (também via API)

- `GET /api/projetos` — lista JSON
- `POST /projetos` — cria (formulário na página)
- `PUT /projetos/:id` — edita (usa `?_method=PUT`)
- `DELETE /projetos/:id` — exclui (usa `?_method=DELETE`)

> Os dados dos projetos estão **em memória** (array). Ao reiniciar o servidor, volta ao estado inicial.
