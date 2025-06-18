# Casos de teste

## Cenários Gherkin

> **Funcionalidade: Questionário**

~~~Gherkin
Cenário: Usuário realiza o questionário de dieta.
    Dado que o usuário não está logado
    E clica em "Comece agora" ou em "Montar minha dieta"
    Quando o usuário responder Sexo biológico: "Feminino", Data de nascimento: "22/10/2000", Altura: "1,65", Peso: "65", Objetivo: "Emagrecimento", Alergia: "Nenhuma", Dieta: "Low Carb", Atividade física: "Leve"
    E clicar em finalizar
    Então o sistema deve salvar essas informções e redirecionar para a página de registro.
~~~~

> **Funcionalidade: Registro**

~~~Gherkin
Cenário: Usuário realiza o seu cadastro.
    Dado que o usuário não possua um cadastro
    E que tenha respondido o questionário
    Quando o usuário digitar o nome: "Júlia da Silva", Username: "Juju", E-mail: "juju@gmail.com" e senha: "Ju123"
    E clicar em "Próxima etapa"
    Então o sistema deve retornar a mensagem: "Usuário registrado com sucesso"
    E realizar o login redirecionando para a pagina de resultados.
~~~

> **Funcionalidade: Login**

~~~Gherkin
Cenário: Usuário realiza o login no sistema.
    Dado que o usuário tenha um registro
    E não esteja logado
    Quando ele clicar em "login"
    E preencher com os seus dados, Username: "Juju" e Senha: "ju123"
    E o clicar em "LogIn"
    Então o sistema deve entrar na página de resultados.
~~~

> **Funcionalidade: Página de resultados**

~~~Gherkin
Cenário: Usuário entra na página de resultados.
    Dado que o usuário realizou o login
    Quando ele entrar na página de resultados
    E visualizar as informações
    Então o sistema deve mostrar o resultado conforme as respostas do questionário.
~~~

> **Funcionalidade: Edição de perfil**

~~~Gherkin
Cenário: Usuário deseja alteraro perfil pessoal.
    Dado que o usuário está logado
    Quando ele acessar o menu "Editar perfil"
    E clicar no botão "Editar"
    E informar telefone: "31940028922"
    E clicar em "Salvar"
    Então o sistema deve salvar as informações editadas.
~~~

---

## Testes de funcionalidade

> ***Critérios de Aceitação***
> ✅ Passou: Resultado Obtido igual ao Resultado Esperado
> ❌ Falhou: Há divergência entre Resultado Obtido e Esperado

| <div align="center">ID</div> | <div align="center">Funcionalidade</div> | <div align="center">Pré-condição</div> | <div align="center">Passos</div> | <div align="center">Dados de Entrada</div> | <div align="center">Resultado Esperado</div> | <div align="center">Resultado Obtido</div> | <div align="center">Status</div> |
|:----------------------------:|:----------------------------------------:|:--------------------------------------:|:----------------------------------:|:--------------------------------------------:|:----------------------------------------------:|:--------------------------------------------:|:-------------------------------:|
| <div align="center">FT-01</div> | <div align="center">Seleção de dieta "Low Carb"</div> | <div align="center">Usuário não deve estar logado</div> | <div align="center">1. Clicar em "Comece agora" ou "Montar minha dieta"<br>2. Responder: "Feminino", "22/10/2000", "1,65", "65", "Emagrecimento", "Nenhuma", "Low Carb", "Leve" e clicar em "Finalizar".</div> | <div align="center">Sexo: Feminino<br>Nasc: 22/10/2000<br>Altura: 1,65<br>Peso: 65<br>Objetivo: Emagrecimento<br>Alergia: Nenhuma<br>Dieta: Low Carb<br>Atividade: Leve</div> | <div align="center">O sistema deve salvar as informações e apresentá-las na tela de resultado após o login.</div> | <div align="center">O sistema salvou e solicitou o registro. Após login, a dieta foi exibida corretamente.</div> | <div align="center">✅</div> |
| <div align="center">FT-02</div> | <div align="center">Seleção de Alergia "Nenhuma"</div> | <div align="center">Usuário não deve estar logado</div> | <div align="center">1. Clicar em "Comece agora" ou "Montar minha dieta"<br>2. Responder: "Masculino", "10/05/2003", "1,83", "78", "Hipertrofia", "Nenhuma", "Mediterrânea", "Moderado" e clicar em "Finalizar".</div> | <div align="center">Sexo: Masculino<br>Nasc: 10/05/2003<br>Altura: 1,83<br>Peso: 78<br>Objetivo: Hipertrofia<br>Alergia: Nenhuma<br>Dieta: Mediterrânea<br>Atividade: Moderado</div> | <div align="center">O sistema deve salvar as informações e apresentá-las na tela de resultado após o login.</div> | <div align="center">O sistema salvou e solicitou o registro. Após login, a dieta foi exibida corretamente.</div> | <div align="center">✅</div> |
| <div align="center">FT-03</div> | <div align="center">Login do usuário "Carlão Giga"</div> | <div align="center">Usuário não deve estar logado e deve ter cadastro</div> | <div align="center">1. Clicar em "Login"<br>2. Preencher usuário "Carlão Giga"<br>3. Preencher senha "1234"<br>4. Clicar em "Login"</div> | <div align="center">N/A</div> | <div align="center">Realizar o login e abrir a tela de resultados com os dados preenchidos</div> | <div align="center">Login realizado, mas os dados do usuário não apareceram</div> | <div align="center">❌</div> |
| <div align="center">FT-04</div> | <div align="center">Alterar o campo data de nascimento</div> | <div align="center">Usuário deve estar logado</div> | <div align="center">1. Clicar em "Editar perfil"<br>2. Clicar em "Editar"<br>3. Alterar data para "11/05/2003"<br>4. Clicar em "Salvar"</div> | <div align="center">Nova data: 11/05/2003</div> | <div align="center">Salvar os dados com as novas informações preenchidas</div> | <div align="center">Campo aparenta salvar, mas ao recarregar a página volta ao valor anterior</div> | <div align="center">❌</div> |
| <div align="center">FT-05</div> | <div align="center">Alterar alergia para "Lactose"</div> | <div align="center">Usuário deve estar logado</div> | <div align="center">1. Clicar em "Preferências Nutricionais"<br>2. Clicar em "Editar"<br>3. Alterar alergia para "Lactose"<br>4. Clicar em "Salvar"</div> | <div align="center">Nova alergia: Lactose</div> | <div align="center">Salvar os dados com as novas informações</div> | <div align="center">Os dados foram alterados corretamente</div> | <div align="center">✅</div> |

## Registro de bugs

| ID do Bug | Caso de Teste Relacionado | Descrição do Problema                                                                 | Severidade | Status     | Responsável        | Link para Issue no GitHub |
|-----------|----------------------------|----------------------------------------------------------------------------------------|------------|------------|---------------------|----------------------------|
| BUG-01    | FT-02                      | É possível pular a questão de alergia sem marcar nada.                                | Média      | Em aberto  | Gabrielle           | N/A                        |
| BUG-02    | FT-03                      | Nomes com acentuação não salvam os dados do questionário nem de registro.             | Alta       | Finalizado | Gabriel Evaristo    | N/A                        |
| BUG-03    | FT-04                      | Data de nascimento não estava aparecendo mesmo preenchendo no questionário.           | Média      | Finalizado | Gabrielle           | N/A                        |

---

## Testes de Usabilidade

> **Metas de usabilidade**
>
> - O usuário deve conseguir configurar seu plano alimentar completo em até 3 minutos.
> - O usuário deve conseguir se registrar e fazer login em menos de 2 minutos.
> - O usuário deve conseguir localizar e editar suas informações pessoais em até 6 cliques.
> - O sistema deve apresentar os dados corretos (ex: dieta, alergia, dados salvos) com no máximo 1 tentativa de atualização.
> - Ao menos 80% dos usuários testados devem entender, sem ajuda externa, como iniciar o processo de montagem da dieta.


# Relatório de Testes de Usabilidade

### Objetivos do Teste

1. Avaliar a facilidade de seleção de dieta
2. Medir o tempo para preencher dados pessoais
3. Verificar a clareza do plano alimentar gerado
4. Identificar dificuldades em localizar campos importantes

## Participante 01

- **Nome / Código:** Participante 01
- **Perfil (ex.: iniciante / avançado):** Iniciante
- **Data:** 18/06/2025
- **Moderador:** Gabrielle
- **Dispositivo / Navegador:** Notebook / Google Chrome

### Tarefas

| Nº | Descrição da Tarefa | Tempo Alvo | Tempo Real (s) | Sucesso (S/N) | Erros / Dificuldades | Observações do Usuário |
|----|----------------------|------------|----------------|---------------|------------------------|--------------------------|
| 1 | Selecionar a dieta “Low Carb” | 30 s | 48 s | S | - | Tranquilo. |
| 2 | Informar peso, altura, idade e sexo | 60 s | 29 s | S | - | Tranquilo |
| 3 | Editar dados pessoais| 60 s | 49 s | S | - | Ok |
| 4 | Visualizar as recomendações de alimentos| 30 s | 66 s | S | - | - |
| 5 | Identificar onde alterar alergias/intolerâncias | 30 s | 20 s | S | - | Tranquilo. |

### Métricas de Satisfação

| Critério | Nota (1–5) | Comentários |
|----------|------------|-------------|
| Facilidade de navegação | 4 | - |
| Clareza das instruções | 5 | - |
| Velocidade de resposta | 4 | - |
| Layout e design | 5 | - |
| Confiança ao usar a ferramenta | 4 | - |

---

## Participante 02

### Dados do Participante

- **Nome / Código:** Participante 02
- **Perfil (ex.: iniciante / avançado):** Avançado
- **Data:** 18/06/2025
- **Moderador:** Gabrielle
- **Dispositivo / Navegador:** Celular / Google Chrome

### Tarefas

| Nº | Descrição da Tarefa | Tempo Alvo | Tempo Real (s) | Sucesso (S/N) | Erros / Dificuldades | Observações do Usuário |
|----|----------------------|------------|----------------|---------------|------------------------|--------------------------|
| 1 | Selecionar a dieta “Low Carb” | 30 s | 52 s | S | - | Fácil e intuitivo |
| 2 | Informar peso, altura, idade e sexo | 60 s | 21 s | S | - | Bem tranquilo |
| 3 | Editar dados pessoais| 60 s | 64 s | S | - | Tranquilo. |
| 4 | Visualizar as recomendações de alimentos| 30 s | 61 s | S | Campo escondido | Campos poderiam já iniciarem abertos. |
| 5 | Identificar onde alterar alergias/intolerâncias | 30 s | 20 s | S | - |Normal|

### Métricas de Satisfação

| Critério | Nota (1–5) | Comentários |
|----------|------------|-------------|
| Facilidade de navegação | 5 | - |
| Clareza das instruções | 4 | - |
| Velocidade de resposta | 4 | - |
| Layout e design | 4 | - |
| Confiança ao usar a ferramenta | 3 | Precisa melhorar |

---

## Participante 03

### Dados do Participante

- **Nome / Código:** Participante 03
- **Perfil (ex.: iniciante / avançado):** Iniciante
- **Data:** 18/06/2025
- **Moderador:** Vinicius Madureira
- **Dispositivo / Navegador:** Notebook / Edge

### Tarefas

| Nº | Descrição da Tarefa | Tempo Alvo | Tempo Real (s) | Sucesso (S/N) | Erros / Dificuldades | Observações do Usuário |
|----|----------------------|------------|----------------|---------------|------------------------|--------------------------|
| 1 | Selecionar a dieta “Low Carb” | 30 s | 20 s | S | - | - |
| 2 | Informar peso, altura, idade e sexo | 60 s | 52 s | S | - | - |
| 3 | Editar dados pessoais| 60 s | 57 s | S | - | Tranquilo. |
| 4 | Visualizar as recomendações de alimentos| 30 s | 56 s | S | Dificuldade ao localizar o campo | Poderia melhorar a percepção que o campo expande |
| 5 | Identificar onde alterar alergias/intolerâncias | 30 s | 47 s | S | - | - |

### Métricas de Satisfação

| Critério | Nota (1–5) | Comentários |
|----------|------------|-------------|
| Facilidade de navegação | 4 | - |
| Clareza das instruções | 5 | - |
| Velocidade de resposta | 5 | Não travou |
| Layout e design | 3 | Precisa melhorar o entendimento|
| Confiança ao usar a ferramenta | 4 |-|

---


## Participante 04

### Dados do Participante

- **Nome / Código:** Participante 04
- **Perfil (ex.: iniciante / avançado):** Iniciante
- **Data:** 18/06/2025
- **Moderador:** Gabriel Evaristo
- **Dispositivo / Navegador:** Celular / Google Chrome


### Tarefas

| Nº | Descrição da Tarefa | Tempo Alvo | Tempo Real (s) | Sucesso (S/N) | Erros / Dificuldades | Observações do Usuário |
|----|----------------------|------------|----------------|---------------|------------------------|--------------------------|
| 1 | Selecionar a dieta “Low Carb” | 30 s | 36 s | S | - | Poderia ser mais direto. |
| 2 | Informar peso, altura, idade e sexo | 60 s | 57 s | S | - | - |
| 3 | Editar dados pessoais| 60 s | 84 s | S | - | Demorei a entender onde tinha que clicar primeiro |
| 4 | Visualizar as recomendações de alimentos| 30 s | 67 s | S | - | - |
| 5 | Identificar onde alterar alergias/intolerâncias | 30 s | 35 s | S | - | Igual o outro |

### Métricas de Satisfação

| Critério | Nota (1–5) | Comentários |
|----------|------------|-------------|
| Facilidade de navegação | 4 | - |
| Clareza das instruções | 5 | - |
| Velocidade de resposta | 5 | - |
| Layout e design | 4 | - |
| Confiança ao usar a ferramenta | 5 | - |

---

## Participante 05

### Dados do Participante

- **Nome / Código:** Participante 05
- **Perfil (ex.: iniciante / avançado):** Intermediário
- **Data:** 18/06/2025
- **Moderador:** Vinicius Madureira
- **Dispositivo / Navegador:** Desktop/ Google Chrome

### Tarefas

| Nº | Descrição da Tarefa | Tempo Alvo | Tempo Real (s) | Sucesso (S/N) | Erros / Dificuldades | Observações do Usuário |
|----|----------------------|------------|----------------|---------------|------------------------|--------------------------|
| 1 | Selecionar a dieta “Low Carb” | 30 s | 28 s | S | - | - |
| 2 | Informar peso, altura, idade e sexo | 60 s | 51 s | S | - | De boa |
| 3 | Editar dados pessoais| 60 s | 56 s | S | - | meio chato mas ok |
| 4 | Visualizar as recomendações de alimentos| 30 s | 35 s | S | - | Normal |
| 5 | Identificar onde alterar alergias/intolerâncias | 30 s | 67 s | S | - | De boa |

### Métricas de Satisfação

| Critério | Nota (1–5) | Comentários |
|----------|------------|-------------|
| Facilidade de navegação | 5 | - |
| Clareza das instruções | 4 | Edição não muito clara |
| Velocidade de resposta | 5 | - |
| Layout e design | 4 | - |
| Confiança ao usar a ferramenta | 5 | - |

---

## Participante 06

### Dados do Participante

- **Nome / Código:** Participante 06
- **Perfil (ex.: iniciante / avançado):** Iniciante
- **Data:** 18/06/2025
- **Moderador:** Gabriel Evaristo
- **Dispositivo / Navegador:** Celular / Google Chrome



### Tarefas 

| Nº | Descrição da Tarefa | Tempo Alvo | Tempo Real (s) | Sucesso (S/N) | Erros / Dificuldades | Observações do Usuário |
|----|----------------------|------------|----------------|---------------|------------------------|--------------------------|
| 1 | Selecionar a dieta “Low Carb” | 30 s | 39 s | N | Dificuldade ao localizar o campo | Poderia ser mais claro. |
| 2 | Informar peso, altura, idade e sexo | 60 s | 67 s | S | - | Tranquilo. |
| 3 | Editar dados pessoais| 60 s | 49 s | N | Dificuldade ao localizar o campo | Poderia ser mais claro. |
| 4 | Visualizar as recomendações de alimentos| 30 s | 46 s | N | Dificuldade ao localizar o campo | Poderia ser mais claro. |
| 5 | Identificar onde alterar alergias/intolerâncias | 30 s | 48 s | S | - | Tranquilo. |

### Métricas de Satisfação

| Critério | Nota (1–5) | Comentários |
|----------|------------|-------------|
| Facilidade de navegação | 4 | - |
| Clareza das instruções | 3 | Precisa melhorar |
| Velocidade de resposta | 5 | - |
| Layout e design | 4 | - |
| Confiança ao usar a ferramenta | 3 | Precisa melhorar |

---

## Feedback

### Participante 01

- **O que você mais gostou?**  
  _“Gostei da forma como os resultados são exibidos, ficou bem bonito.”_

- **O que você achou mais difícil?**  
  _“Levei um tempinho pra encontrar a recomendação de dieta.”_

- **Sugestões de melhoria:**  
  _“Talvez colocar dicas visuais ou tutoriais rápidos nas etapas.”_

---

### Participante 02

- **O que você mais gostou?**  
  _“A interface dos resultados é muito limpa e agradável mas poderia já vir aberta.”_

- **O que você achou mais difícil?**  
  _“Nada muito dificil, mas a edição poderia ser mais direta”_

- **Sugestões de melhoria:**  
  _“Não precisar clicar no botão "Editar" para mudar as informações, só no "Salvar".”_

---

### Participante 03

- **O que você mais gostou?**  
  _“A apresentação da dieta foi objetiva mas não muito clara, porém curti bastante.”_

- **O que você achou mais difícil?**  
  _“Sem grandes dificuldades.”_

- **Sugestões de melhoria:**  
  _“ - ”_

---

### Participante 04

- **O que você mais gostou?**  
  _“A parte final com o plano alimentar foi o que mais me chamou atenção.”_

- **O que você achou mais difícil?**  
  _“O login automático após o login me confundiiu um pouco”_

- **Sugestões de melhoria:**  
  _“Adicionar uma mensagem ao efetuar o login”_

---

### Participante 05

- **O que você mais gostou?**  
  _“Tudo ficou bem organizado”_

- **O que você achou mais difícil?**  
  _“Saber se a edição tinha salvado mesmo”_

- **Sugestões de melhoria:**  
  _“Adiconar mensagem de "Perfil salvo" ou algo do tipo pra indicar o salvamento”_

---

### Participante 06

- **O que você mais gostou?**  
  _“Gostei de como o sistema mostra meus resultados de imc no final”_

- **O que você achou mais difícil?**  
  _“Fiquei um pouco perdido pra achar os menus, mas depois foi tudo certo.”_

- **Sugestões de melhoria:**  
  _“Incluir um mini tutorial explicando o cada parte ajudaria.”_


## Conclusões dos moderadores

- **Principais bloqueios encontrados:**  
  1. Campo com as dicas de alimentação poderiam iniciar abertas.  
  2. Menu de editar poderia ser somente salvar.

- **Pontos fortes observados:**  
  1. Interface agradável.
  2. Preenchimento intuitivo.

- **Recomendações para próxima iteração:**  
  1. Melhorar visibilidade de campos críticos.
  2. Inserir mensagens de "Salvo com sucesso" etc.
  