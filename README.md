# 🌿 Projeto EcoTrack: Controle seu Impacto Ambiental

Um aplicativo web interativo projetado para ajudar os usuários a calcular, visualizar e reduzir sua pegada de carbono diária. O projeto transforma o conceito abstrato de impacto ambiental em dados concretos e gerenciáveis.

<img width="1491" height="927" alt="image" src="https://github.com/user-attachments/assets/367b386e-dea0-428e-9134-8eb79dc3cf94" />

## O Problema
Muitas pessoas não têm uma noção clara de como suas atividades cotidianas — como se locomover, consumir energia e se alimentar — contribuem para as mudanças climáticas. A falta de ferramentas simples para medir esse impacto dificulta a adoção de hábitos mais sustentáveis.

## A Solução
O EcoTrack é uma ferramenta de conscientização que permite ao usuário registrar suas atividades diárias e ver o resultado imediato em emissões de CO₂. A aplicação oferece uma interface limpa e visual para que o acompanhamento do progresso seja fácil e motivador.

## Principais Funcionalidades

### Dashboard Central
- Apresenta a pegada total de CO₂ acumulada.
- Compara com metas diárias recomendadas.

### Registro de Atividades
Formulários intuitivos para adicionar informações sobre:

- **Transporte:** Distância percorrida e meio de transporte utilizado.  
- **Energia:** Consumo diário de eletricidade (em kWh).  
- **Alimentação:** Tipo de dieta do dia (ex: vegana, vegetariana, etc.).  

### Análise com Gráficos
Utilizando a biblioteca Chart.js, a aplicação exibe:

- Um **gráfico de rosca** que mostra a distribuição das emissões por categoria.  
- Um **gráfico de linha** que ilustra o histórico de emissões ao longo do tempo.  

### Dicas Sustentáveis
A plataforma oferece sugestões práticas e personalizadas para ajudar o usuário a diminuir sua pegada de carbono com base em seus maiores ofensores.

### Persistência de Dados
O histórico de atividades do usuário é salvo no **Local Storage** do navegador, garantindo que os dados não sejam perdidos ao fechar a página.

# 🚀 Como Usar o Aplicativo EcoTrack

Este guia mostra como interagir com a aplicação para monitorar sua pegada de carbono.

## 1. Conheça o Painel Principal
Ao abrir o EcoTrack, você verá o painel principal com três métricas:

- **Pegada Total de CO₂:** Mostra o total acumulado das suas atividades. Começa em zero.  
- **Meta Diária:** Um valor de referência para um consumo sustentável.  
- **Dica Sustentável:** Uma sugestão para ajudar a reduzir seu impacto.  

## 2. Adicione uma Atividade
Na seção **"Adicionar Atividade Sustentável"**, preencha um dos formulários:

### Para Transporte
1. Escolha o meio de transporte que você usou.  
2. Insira a distância da sua viagem em quilômetros (km).  
3. Clique em **"Adicionar Transporte"**.  

### Para Energia
1. Insira seu consumo de eletricidade em kWh.  
   *(Dica: você pode usar a média diária da sua conta de luz).*  
2. Clique em **"Adicionar Consumo"**.  

### Para Alimentação
1. Selecione o tipo de dieta que mais se aproxima da sua alimentação no dia.  
2. Clique em **"Adicionar Dieta"**.  

## 3. Veja os Resultados em Tempo Real
Assim que você adiciona uma atividade, a página se atualiza automaticamente:

- O valor da **Pegada Total de CO₂** no painel irá aumentar.  
- Os gráficos na seção **"Análise de Emissões"** serão atualizados para refletir a nova entrada.  
- A atividade aparecerá no topo da lista no **Histórico de Atividades**.  
- Uma nova **dica sustentável** pode aparecer com base nos seus dados.  

## 4. Acompanhe Seu Progresso
- Use os gráficos para entender quais categorias (**transporte, energia ou alimentação**) mais contribuem para o seu impacto.  
- Consulte o histórico para ver a evolução da sua pegada de carbono ao longo dos dias e identificar padrões.  

O objetivo é retornar ao aplicativo diariamente para registrar suas ações e observar como pequenas mudanças de hábitos podem fazer uma grande diferença.





## Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)  
- **Bibliotecas:** Chart.js para visualização de dados  
- **Armazenamento:** Local Storage API do navegador  

## Links Úteis

- [Meu GitHub](https://github.com/Melettz1)  
- [Repositório do Projeto EcoTrack](https://github.com/Melettz1/EcoTrack.git)
