<img src="https://github.com/S6-2025/NutriFacil/blob/develop/readme_assets/banners.png" alt="banner"/>

# 🍐𝚂𝚘𝚋𝚛𝚎

O NutriFácil é um sistema de planejamento alimentar personalizado, desenvolvido como trabalho prático por estudantes de Ciência da Computação. O projeto tem como objetivo auxiliar usuários a montarem seu plano alimentar conforme seus objetivos (emagrecimento ou hipertrofia), preferências alimentares e restrições, como alergias e intolerâncias.

Desenvolvido com abordagem **mobile first**, o sistema prioriza a experiência em dispositivos móveis, garantindo acessibilidade e usabilidade desde telas pequenas até desktops.

O sistema oferece:

- Seleção de dietas (Mediterrânea, Low Carb, Cetogênica, Vegetariana);

- Cálculo de TMB (Taxa de Metabolismo Basal), IMC (Índice de Massa Corporal) e ingestão diária de água;

- Recomendação de alimentos por categoria (proteínas, legumes, verduras, carboidratos);

- Personalização de acordo com objetivos e perfil do usuário.

# ⚙𝚃𝚎𝚌𝚗𝚘𝚕𝚘𝚐𝚒𝚊𝚜

## 𝐁𝐚𝐜𝐤-𝐞𝐧𝐝

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white)

## 𝐅𝐫𝐨𝐧𝐭-𝐞𝐧𝐝

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) 
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) 


# 🚀Como rodar o projeto localmente

O projeto ***Nutrifacil*** é dividido em duas pastas principais: ***Back-End*** e ***Front-End*** e o banco de dados ***Postgre***. Para rodá-lo localmente é necessário instalar o **NodeJS** e o **Java**, também é preciso instalar e configurar o **Maven** nas variáveis de ambiente.

Após realizar esses pré-requisitos, siga os passos abaixo:

 - Clone o repositorio:
   
   > cmd
   ~~~
   git clone https://github.com/S6-2025/NutriFacil.git
   ~~~

- Inicie o **Front-End**

  Primeiramente, abra a pasta **Front-End** com seu editor de preferência e no CMD execute os seguintes comandos, em ordem:

  > cmd
  ~~~
  cd Front-End/site
  npm install
  npm run dev
  ~~~

- Após isso, inicie a API na pasta **Back-End**

  Execute o arquivo `AppApplication.java`, localizado em: `NutriFacil/Back-End/src/main/java/com/nutrifacil`
/app/

### 🗃️ Configuração do banco de dados

Certifique-se de que o Neon PostgreSQL está configurado e rodando. Em seguida, atualize o arquivo `application.properties` na pasta `Back-End/src/main/resources` com suas credenciais de acesso:

 > Application.properties
 ~~~
 spring.datasource.url=jdbc:postgresql://<seu-host>.neon.tech/<seu-banco>?sslmode=require
 spring.datasource.username=<seu-usuario>
 spring.datasource.password=<sua-senha>
 ~~~

# 🧪Casos de teste

Para visualizar os casos de testes realizados, veja o arquivo [CASOS DE TESTE](./casosDeTeste.md).

# 📃 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

 
<h1 align=center> 🍎 𝚁𝚎𝚊𝚕𝚒𝚣𝚊𝚍𝚘𝚛𝚎𝚜 🍎 </h1>

<div align="center"> 

<table>
  <thead>
    <tr>
      <th>Front-End</th>
      <th>Designer</th>
      <th>Back-End</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/gabriellesote">
          <img src="https://avatars.githubusercontent.com/u/137116157?v=4" width="115"><br>
          <b>Gabrielle Soares</b>
        </a><br><br>
        <a href="https://www.linkedin.com/in/gabrielle-soares-teixeira/">
          <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/vinimagod">
          <img src="https://avatars.githubusercontent.com/u/67203291?v=4" width="115"><br>
          <b>Vinícius Godinho</b>
        </a><br><br>
        <a href="https://www.linkedin.com/in/vinicius-m-godinho-b4155623a/">
          <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/gabsevamac">
          <img src="https://avatars.githubusercontent.com/u/146457912?v=4" width="115"><br>
          <b>Gabriel Evaristo</b>
        </a><br><br>
        <a href="https://www.linkedin.com/in/gabriel-evaristo-26391a232/">
          <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
        </a>
      </td>
    </tr>
  </tbody>
</table>

</div>









