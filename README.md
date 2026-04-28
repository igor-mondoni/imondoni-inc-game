# Imondoni Inc Game

## Sobre o Projeto

Imondoni Inc Game é um jogo idle/clicker desenvolvido em React + TypeScript com foco em progressão incremental e temática corporativa voltada para o universo de tecnologia e empresas de T.I.

A proposta do projeto é simular a evolução de um profissional ou empresa de tecnologia, onde o jogador acumula **Dev Points (DP)** através de clicks manuais ou baseado em DP/s acumulado de upgrades e ativos que o usuário possui.

O projeto foi criado não apenas como um jogo, mas também como um portfólio técnico para demonstrar conhecimentos em:

* Arquitetura Front-End escalável
* Gerenciamento de estado global
* Componentização profissional
* Persistência de dados
* Integração com serviços externos
* Estruturação de regras de negócio
* Pensamento de produto e game design

---

## Principais Mecânicas

### Click Manual

O jogador pode clicar manualmente para gerar Dev Points.

O valor gerado por clique é controlado pela variável:

```ts
clickPower
```

O clickpower é baseado no ativos + upgrades em que o usuário possui, quanto mais ativos de um tipo possuir, mais clickpower aquele ativo vai oferecer.

---

## Produção Passiva (Idle System)

Além dos clques manuais, o jogo possui geração passiva de pontos por segundo:

```ts
pointsPerSecond
```

Isso representa automações e crescimento estrutural da empresa, como:

O sistema utiliza um game loop com atualização contínua para simular o crescimento automático a cada 1 Segundo.

Exemplo:

```ts
setInterval(() => {
  dispatch(addPassiveIncome(pointsPerSecond / 10))
}, 100)
```

---

## Sistema de Assets

Assets são investimentos permanentes que aumentam a produção da empresa.
A ideia é que a partir daqui uma empresa esta sendo montada baseado em ativos de materiais e ativos de mão de obra.

Exemplos:

* Desenvolvedores
* Peças para o trabalho
* Melhorias no local de trabalho

Cada asset pode fornecer:

* aumento de DP por segundo
* aumento de poder de clique

Exemplo de estrutura:

```ts
interface Asset {
  id: number
  category: string[]
  name: string
  originalCostReal: number
  originalCostDevPoints: number
  devPointsCost: number
  pps: number
  owned: number
  clickpower: number
  image: string
}
```
---

## Sistema de produtividade

O projeto conta com um sistema de progresso baseado na quantidade de clicks que o usuário fez
Existem alguns milestones baseado na quantidade e quanto maior a quantidade de clicks, maior será o bonus

```ts
      if (newClickedTimes > 0 && newClickedTimes % 100000 === 0) {
        xpGained = 50;
        bonus = (currentStatus.pointsPerSecond * 10) + (currentStatus.pointsPerSecond * (currentStatus.clickpower * 10)) + 10000000
        message = `+${Math.floor(bonus)} DP de bônus por produtividade máxima!`
      } else if (newClickedTimes > 0 && newClickedTimes % 10000 === 0) {
        xpGained = 30;
        bonus = (currentStatus.pointsPerSecond * 10) + (currentStatus.pointsPerSecond * (currentStatus.clickpower * 1.5)) + Math.floor(Math.random() * (999999 - 1 + 1)) + 1
        message = `+${Math.floor(bonus)} DP de bônus por super produtividade!`
      } else if (newClickedTimes > 0 && newClickedTimes % 1000 === 0) {
        xpGained = 10;
        bonus = (currentStatus.pointsPerSecond * 10) + (currentStatus.pointsPerSecond * (currentStatus.clickpower * 0.35)) + Math.floor(Math.random() * (9999 - 1 + 1)) + 1
        message = `+${Math.floor(bonus)} DP de bônus por bastante produtividade!`
      } else if (newClickedTimes > 0 && newClickedTimes % 100 === 0) {
        xpGained = 5;
        bonus = (currentStatus.pointsPerSecond * 10) + (currentStatus.pointsPerSecond * (currentStatus.clickpower * 0.01)) + Math.floor(Math.random() * (999 - 1 + 1)) + 1
        message = `+${Math.floor(bonus)} DP de bônus por produtividade!`
      }
```
---

## Sistema de Upgrades Especiais

Além dos assets tradicionais, existem upgrades especiais que oferecem melhorias estratégicas.
Inicialmente a melhor estratégia é a compra desses upgrades em momentos estratégicos da progressão, pois eles são acumulativos baseado no valor de clickpower ou DP/s do momento da compra
Exemplos:

* Melhorias no prédio
* Melhorias de trabalho
* Melhorias de café
* Melhorias "Mágicas"

Esses upgrades impactam diretamente:

* clickpower
* pointsPerSecond

E ajudam a criar sensação de progressão acelerada.

(WIP) - Quantidades fixas para limite de compra de alguns upgrades
---

## Sistema de XP e Level

O jogador também possui um sistema de experiência profissional.

Cada Pontuação de produtividade gera uma quantidade X de xp

O level influencia:

* multiplicadores de produção (clickpower e DP/s)
* desbloqueio de assets (WIP)

A progressão utiliza uma tabela dinâmica de XP para evitar crescimento linear e tornar a evolução mais estratégica.

---

## Sistema de Inventário com Itens Dinâmicos (WIP)

Estou trabalhando em uma feature de inventário onde serão gerados itens através de uma I.A com uma LLM simples apenas para criação dos itens.
Toda vez em que houver um bonus de produtividades, terá uma pequena chance de ativar uma função em que irá enviar um prompt

`
Voce é uma I.A integrada a um jogo idle clicker e sua função é randomizar itens... como funciona: Toda vez que eu acionar esse prompt eu quero que voce escolha um numero de 0 a 1000 e se caso caia em um numero menor que 900 voce deve me fornecer um item comum, mas se cair de 900 pra cima, voce deve me retornar um item lendario preciso que vc retorne um json no seguinte formato 
{ "name": "" //Crie um nome aleatório com o tema do projeto, caso for comum eu quero algo mais simples como "café novo generico" e lendario algo como "Café Gourmet Mágico" "type": "" //clickpower ou pps - para ambos os itens 
"value": 0 // 0 a 900 - comum | 901 a 1000 - lendario 
"description": "" //Crie uma descrição pequena a ver com o item gerado, itens comum devem ser mais pé no chao e itens lendarios devem ser especiais 
}
evitar esses itens: [%variavel com o nomed de itens em que o usuario ja possui%]
Utilizar apenas itens, licenças especiais ou algo relacionado a um objeto ou coisa a possuir; evitar itens com nome de rotinas ou a alguma ação no mundo real; Caso seja um item lendário, pode criar itens viajados e mágicos caso faça sentido com o contexto
`
---

## Persistência em Nuvem WIP

O projeto possui planejamento de integração com:

* Firebase Authentication
* Firebase Firestore

Objetivos:

* criação de usuários
* login persistente
* salvamento em nuvem
* progresso individual por jogador
* sincronização entre dispositivos

Estrutura prevista:

```json
{
  "userId": "uuid",
  "progress": {
  devPointsOwned: 1000000
  clickpower: 5487
  clickedTimes: 2360
  pointsPerSecond: 125462
  ownedAssets: [['id'=>'1', 'qtd'=> 2],['id'=>'2', 'qtd'=> 7]] 
  ownedItens: []
  ownedUpgrades:[['id'=>'1', 'qtd'=> 2],['id'=>'2', 'qtd'=> 7]]
  experienceOwned: 272
  currentLevel: 5
  }
}
```

---

## Tecnologias Utilizadas

## Front-End

* React JS
* TypeScript
* CSS Modules

## Gerenciamento de Estado

* Redux Toolkit
* Redux Thunk

## Persistência (WIP)

* Firebase Auth
* Firestore

## Qualidade

* ESLint
* Prettier
* Testes unitários (planejado com Jest + React Testing Library) (WIP)

---

## Estrutura do Projeto

```txt
src/
 ├── app/              # Configurações do redux 
 ├── assets/           # Imagens, ícones e arquivos estáticos
 ├── components/       # Componentes reutilizáveis da interface (A melhorar)
 │    ├── ClickerPanel/
 │    ├── PurchasePanel/
 │    └── StatsBar/
 ├── features/         # Módulos principais do jogo separados por domínio, contendo os reducers e thunks do projeto
 │    ├── assets/      # Ativos compráveis do jogo
 │    ├── game/        # Regras gerais e estado principal do game
 │    ├── player/      # Reducer das informações do jogador para o controle de estado do mesmo
 │    └── upgrades/    # Upgrades especiais
 ├── game/
 │    └── data/        # Dados fixos do jogo, como tabelas e configurações para balanceamento do jogo
 ├── pages/            # Páginas/telas da aplicação (WIP - dados do desenvolvedor / tela de estatísticas do usuário)
 ├── services/         # Serviços externos e integrações futuras (aqui ficará a principal integração com o Firebase)
 ├── styles/           # Estilos globais ou compartilhados
 ├── test/             # Testes automatizados (WIP)
 ├── types/            # Tipagens globais TypeScript
 ├── App.tsx           # Componente raiz (WIP - irei alterar para utilizar o React Routes e carregar as paginas dinamicamente)
 ├── index.css         # Estilos globais principais
 └── main.tsx          # Ponto de entrada da aplicação

```
Essa organização permite separar claramente:

* regras de negócio
* UI
* persistência
* integração externa
* controle global de estado

---

## Objetivo Profissional

Este projeto foi desenvolvido também como peça de portfólio técnico.

Mais do que um jogo, ele representa:

* organização de arquitetura real
* escalbilidade de projeto
* tomada de decisão técnica
* modelagem de sistemas
* visão de produto
* capacidade de evolução contínua

A proposta é demonstrar domínio de desenvolvimento Full Stack através de um projeto autoral com identidade própria.
O motivo de ser um game é pela minha criatividade ao trabalhar com esse tipo de projeto e tambem para ser divertido a programação
---

## Roadmap Futuro

### Em desenvolvimento

* Sistema de leveis ser mais abrangente com o projeto tendo efeito na quantidade de objetos que se pode comprar, nos upgrades liberados a compra e melhor balanceamento do projeto
* sistema de inventário com I.A
* persistência em nuvem com FIREBASE
* Animações para level-up, compras de ativos, compras de upgrades, recebimento de XP e melhorar a animação do bônus de produtividade
* Painel do jogo para mostrar visualmente o progresso do jogador mostrando os ativos, upgrades e itens obtidos 

### Futuramente

* Mini games integrados que ajudam na progressão tanto positivamente quanto negativamente
* eventos aleatórios que aumenta dinamicamente o clickpower ou DP/s assim como aumentar ou diminuir um ativo individualmente
* sistema de conquistas com integração a progressão do jogo

---

## Instalação, Execução e Deploy

Este projeto foi desenvolvido em React JS utilizando Vite.

### Pré-requisitos

- Node.js na versão LTS
- npm
- Git

### Instalação

```bash
git clone https://github.com/igor-mondoni/imondoni-inc-game.git
cd imondoni-inc-game
npm install
npm run dev
```

A aplicação ficará disponível em:

http://localhost:5173

Deploy em produção

O deploy em produção está automatizado por meio da integração com o GitHub.

Sempre que uma alteração é enviada para a branch master, a plataforma de hospedagem identifica o novo push, executa automaticamente o processo de build e publica a versão atualizada da aplicação.

Configuração utilizada no ambiente de produção:

Branch de produção: master
Build command: npm run build
Output directory: dist


## Processo de Desenvolvimento

Esse projeto foi baseado em um outro projeto meu com o mesmo propósito (https://igor-mondoni.github.io/curriculum-clicker/)
Durante o desenvolvimento, utilizei ferramentas de apoio como IA generativa para acelerar pesquisas, validar abordagens arquiteturais, revisar estruturas e explorar alternativas de implementação, mantendo sempre a validação técnica e a tomada de decisão final sob minha responsabilidade.

## Autor

Projeto desenvolvido por Igor Henrique Mondoni
Full Stack Developer
Especialista React.js, PHP e NODE.JS

LinkedIn: [LinkedIn](https://www.linkedin.com/in/igor-henrique-mondoni17)
GitHub: [Github](https://github.com/igor-mondoni)

---
