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

## Registro de bugs

| ID do Bug | Caso de Teste Relacionado | Descrição do Problema                                                                 | Severidade | Status     | Responsável        | Link para Issue no GitHub |
|-----------|----------------------------|----------------------------------------------------------------------------------------|------------|------------|---------------------|----------------------------|
| BUG-01    | FT-02                      | É possível pular a questão de alergia sem marcar nada.                                | Média      | Em aberto  | Gabrielle           | N/A                        |
| BUG-02    | FT-03                      | Nomes com acentuação não salvam os dados do questionário nem de registro.             | Alta       | Finalizado | Gabriel Evaristo    | N/A                        |
| BUG-03    | FT-04                      | Data de nascimento não estava aparecendo mesmo preenchendo no questionário.           | Média      | Finalizado | Gabrielle           | N/A                        |
