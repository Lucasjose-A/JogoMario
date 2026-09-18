# Jogo Mario

## Descrição

**Jogo Mario** é uma recriação do tutorial fornecido, feita apenas com HTML, CSS e JavaScript. O jogo utiliza um `gameboard` relativo, imagens posicionadas de forma absoluta, pipe com animação CSS linear infinita, Mario em GIF animado, pulo disparado por teclado, detecção de colisão e tela de game over.

## Objetivo do Projeto

Praticar a construção incremental apresentada no vídeo: criar a estrutura HTML, estilizar o cenário, animar o pipe com `@keyframes`, disparar a classe de pulo por `keydown`, verificar colisões em um loop, trocar para `game-over.png` ao perder e finalizar com céu, grama, HUD de pontos/tempo/recorde e nuvens animadas.

## Tecnologias Utilizadas

- HTML5 semântico e DOM
- CSS3 com `position: absolute`, `@keyframes` e `linear-gradient`
- JavaScript ES2022 com `setInterval`, `setTimeout` e eventos de teclado
- Vite e Node.js
- Web Audio API como fallback de efeitos sonoros
- Assets fornecidos em PNG, GIF e OGG

## Instalação

```bash
cd frontend
npm install
```

## Execução

```bash
npm run dev
```

Abra a URL indicada pelo Vite. Para uma build de produção, use `npm run build`.

## Controles

- **Espaço**, **W** ou **seta para cima**: pular
- **A/D** ou **setas esquerda/direita**: controles auxiliares do tutorial
- **R**: reiniciar após o game over

## Integrantes

| Nome | Matrícula | Papel |
| --- | --- | --- |
| João Ferreira | 2024001 | Scrum Master |
| Maria Santos | 2024002 | Documentador |
| Pedro Oliveira | 2024003 | Desenvolvedor |
| Ana Costa | 2024004 | Desenvolvedor |
| Carlos Souza | 2024005 | Testador |
| Juliana Lima | 2024006 | Testador |

## Estrutura

O código do produto está em `frontend/`, enquanto `backend/` e `docs/` preservam a estrutura acadêmica exigida. As pastas sem artefatos imediatos possuem `.gitkeep` para serem versionadas.

## Licença

Distribuído sob a licença MIT. Os assets fornecidos permanecem sujeitos às condições de uso definidas pelo responsável pela atividade.
