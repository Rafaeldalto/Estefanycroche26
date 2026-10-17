# PRD — Estefany Gusmão Crochê (Landing Page)

## Problema original
Criar uma landing page profissional, moderna, responsiva e otimizada para conversão para a marca "Estefany Gusmão Crochê" — artesanato em crochê feito à mão (amigurumis e polvinhos de crochê para bebês). Objetivo: divulgar a marca, transmitir confiança, apresentar qualidade e gerar pedidos/encomendas via WhatsApp ou Facebook, com destaque aos polvinhos. Briefing completo (10 seções, paleta, tipografia, copy, restrições de segurança) fornecido na mensagem inicial.

## Arquitetura
- Frontend: React (CRA) + Tailwind CSS + Framer Motion (reveals, micro-interações) + Lenis (scroll suave). Página única, sem rotas extras, sem backend próprio de conteúdo.
- Backend: template FastAPI mantido apenas com health-check (`/api/`); a landing não depende de banco para conteúdo.
- SEO (skill farm-seo-setup): title/description/robots/OG/Twitter/JSON-LD (Organization) + noscript em `public/index.html`; `robots.txt` e `llms.txt` em `public/`; favicon SVG próprio (marca do polvinho). Sitemap e canonical pendentes de domínio próprio.
- Config de contato editável: `src/config.js` (`WHATSAPP_NUMBER` vazio → todos os CTAs apontam para o Facebook oficial).

## Personas
- Pais/mães e familiares buscando presente artesanal e seguro para bebês.
- Amigas/dindas/avós encomendando presentes de chá de bebê.
- A artesã (Estefany), dona do conteúdo: valores, prazos, cores e composições são informados por ela no atendimento.

## Requisitos essenciais (briefing)
10 seções na ordem do briefing, linguagem responsável (sem promessas terapêuticas, sem preços/prazos/depoimentos/certificações inventados), CTAs distribuídos, responsivo, acessível, SEO básico.

## Implementado (2026-10-17)
- Cabeçalho sticky glass com menu responsivo (drawer animado) + CTA "Quero encomendar".
- Hero com reveal tipográfico mascarado linha a linha, parallax sutil na foto (arco), 3 diferenciais com ícones.
- Marquee editorial lento (faixa marrom-escura em serifa itálica).
- Catálogo bento com 4 modelos sugeridos (Nuvem, Aconchego, Jardim, Soninho): fotos ilustrativas geradas (marcadas "Foto ilustrativa"), cores em pastilhas, "Valor sob consulta", "Feito sob encomenda", botão "Quero este polvinho" com mensagem pré-preenchida; nota de que catálogo/nomes/valores são definidos pela artesã.
- Seção de inspiração dos tentáculos (cordão umbilical) com enquadramento responsável.
- "Nosso cuidado": 5 pilares + composição de texturas + disclaimer sobre alegações de materiais.
- "Sobre a artesã": texto sugerido do briefing, citação do slogan, assinatura, imagem ilustrativa do processo.
- "Como encomendar": 3 etapas + CTA.
- "Segurança e confiança": 4 orientações responsáveis + card "Informações da peça".
- FAQ: 10 perguntas com respostas de referência honestas (sem promessas), accordion animado.
- CTA final emocional + botões (encomendar / Facebook).
- Rodapé escuro com aviso de variações artesanais; botão flutuante de contato (Facebook enquanto não há WhatsApp).
- SEO completo no head estático; `robots.txt` e `llms.txt` servidos como arquivo real.

## Backlog / Próximas tarefas
- P0: Ativar WhatsApp (inserir número em `src/config.js` → todos os botões passam a abrir wa.me com mensagem pronta).
- P0: Substituir imagens ilustrativas pelas fotos reais das peças.
- P1: Painel simples (backend) para a artesã editar catálogo, valores e disponibilidade.
- P1: Canonical, sitemap.xml e og:image quando houver domínio próprio confirmado.
- P2: Simulador de combinações de cores para o visitante.
- P2: Seção de depoimentos (somente com relatos reais de clientes).

## Campos editáveis pendentes (não inventados no site)
- Número de WhatsApp da artesã.
- Instagram oficial (fora do rodapé até ser informado).
- Valores, prazos, composição de fios, instruções de higienização e certificações (informados pela artesã no atendimento).
- Fotografia real da artesã e das peças.
