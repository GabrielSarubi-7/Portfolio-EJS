const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(express.urlencoded({ extended: true })); // parse body (forms)
app.use(express.json()); // parse JSON (APIs)
app.use(methodOverride("_method")); // permite PUT/DELETE via ?_method=PUT
app.use(express.static(path.join(__dirname, "public")));

// --- View Engine EJS ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- Dados dinâmicos do portfólio (poderia vir de DB; aqui é estático p/ a entrega) ---
const perfil = {
  nome: "Gabriel Sarubi Motta Ferreira",
  email: "bielsarubi@gmail.com",
  local: "Caçapava - SP",
  bio: "Olá! sou o Gabriel Sarubi, formado em Desenvolvimento de Sistemas na Etec Machado de Assis de Caçapava e atualmente cursando Análise e Desenvolvimento de Sistemas na Fatec Prof. Jessen Vidal. Me interesso por programação desde a infância e venho adquirindo conhecimento desde cedo visando me tornar um bom profissional. Dentre as linguagens que já tive contato, destaco Java, Python e MySQL.",
  fotoUrl: "/img/fotominha.jfif", 
  links: {
    linkedin: "https://www.linkedin.com/in/gabriel-sarubi-3050442b4/",
    github: "https://github.com/GabrielSarubi-7"
  },
  formacao: [
    {
      titulo: "Técnico em Desenvolvimento de Sistemas",
      instituicao: "ETEC Machado de Assis — Caçapava",
      link: "https://etecmachadodeassis.com",
      periodo: "Concluído"
    },
    {
      titulo: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      instituicao: "FATEC Prof. Jessen Vidal — São José dos Campos",
      link: "https://fatecsjc-prd.azurewebsites.net/",
      periodo: "Cursando"
    }
  ],
  cursos: [
    { nome: "HTML & CSS (intermediário)" },
    { nome: "JavaScript (intermediário)" },
    { nome: "Node.js (intermediário)" },
    { nome: "Git & GitHub" },
    { nome: "Excel / Word / Power BI (básico a intermediário)" }
  ],
  competenciasTecnicas: [
    "HTML (intermediário)",
    "CSS (intermediário)",
    "JavaScript (intermediário)",
    "Node.js (intermediário)",
    "GitHub",
    "Word, Excel, Power BI"
  ],
  competenciasInterpessoais: [
    "Criatividade",
    "Resolução de problemas",
    "Trabalho em equipe",
    "Comunicação"
  ]
};

// --- CRUD ---
let projetos = [
  {
    id: 1,
    titulo: "CRUD em Java",
    descricao: "Aplicação CRUD completa em Java.",
    tecnologias: "Java, Swing/JavaFX (ou CLI), JDBC",
    link: "https://github.com/GabrielSarubi-7/CRUD"
  },
  {
    id: 2,
    titulo: "EchoNova (parceria ENTRENOVA)",
    descricao: "Aplicação web em desenvolvimento com foco em diagnóstico empresarial.",
    tecnologias: "Next.js, TypeScript, MongoDB",
    link: "https://github.com/EquipeEcho/EchoNova"
  }
];
let nextId = 3;

// --- Rotas de páginas ---
app.get("/", (req, res) => {
  res.render("index", { perfil, pagina: "inicio" });
});

app.get("/formacao", (req, res) => {
  res.render("formacao", { perfil, pagina: "formacao" });
});

app.get("/projetos", (req, res) => {
  res.render("projetos", { perfil, pagina: "projetos", projetos });
});

app.get("/competencias", (req, res) => {
  res.render("competencias", { perfil, pagina: "competencias" });
});


// --- Endpoints CRUD (HTTP GET/POST/PUT/DELETE) ---

// Listar projetos (JSON)
app.get("/api/projetos", (req, res) => {
  res.json(projetos);
});

// Criar projeto
app.post("/projetos", (req, res) => {
  const { titulo, descricao, tecnologias, link } = req.body;
  if (!titulo || !descricao) {
    return res.status(400).send("Título e descrição são obrigatórios.");
  }
  const novo = { id: nextId++, titulo, descricao, tecnologias: tecnologias || "", link: link || "" };
  projetos.push(novo);
  // volta para a página de projetos
  res.redirect("/projetos");
});

// Atualizar projeto
app.put("/projetos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titulo, descricao, tecnologias, link } = req.body;
  const idx = projetos.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).send("Projeto não encontrado.");
  projetos[idx] = { ...projetos[idx], titulo, descricao, tecnologias, link };
  res.redirect("/projetos");
});

// Deletar projeto
app.delete("/projetos/:id", (req, res) => {
  const id = Number(req.params.id);
  projetos = projetos.filter(p => p.id !== id);
  res.redirect("/projetos");
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
