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
