# Sistema HYPE - How You Plan Events
## Projeto de Labsoft 2 - 2016

---
### Grupo:
* Eduardo Levy
* Felipe Paiva
* Filipe Arena
* Pedro Martinez
* Thais Monti

---
### Como rodar o sistema:
1. Instalar o Node (https://nodejs.org/)
2. Instalar um servidor mysql (sugerimos o mamp - https://www.mamp.info/en/)
3. Entrar na pasta do projeto
4. $ npm install
5. $ npm install -g nodemon
6. Rodar o servidor mysql. Verificar se está na porta 3306.
7. Criar database no mySQL. De preferencia "utf8_general_ci"
8. $ nodemon server.js
9. Abrir outro terminal e rodar $ gulp
10. Abrir um navegador e escrever localhost:8080

---
### Docs relevantes para estudo:
#### BACKEND (Docs)
1. [express](http://expressjs.com/en/api.html)
2. [sequelize](http://sequelize.readthedocs.org/en/latest/)
3. [epilogue](https://github.com/dchester/epilogue)

#### FRONTEND (Docs)
1. [angular](https://docs.angularjs.org/api)
2. [jquery](http://api.jquery.com/)
3. [bootstrap](http://getbootstrap.com/css/)

#### DEVTOOLS (Docs)
1. [node](https://nodejs.org/api/)
2. [gulp](https://github.com/gulpjs/gulp/blob/master/docs/README.md)

#### TUTORIAIS
1. [spa simples express + angular](https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular)
2. [sequelize com express](http://docs.sequelizejs.com/en/1.7.0/articles/express/)
3. [gulp](https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js)

---
### FILE STRUCTURE:
* server.js - configuração e inicialização do backend.
* app.js - configuração e incialização do frontend.
* front_modules/ - bibliotecas baixadas para o front (angular, bootstrap, jquery)
* models/ - models do sistema. Usados pelo sequelize.
* modulos/ - cada um dos modulos que vamos desenvolver no sistema
  * api/ - colocar aqui o controller do módulo
  * web/ - colocar aqui as views e sua interatividade (tudo que vai ao client)
* public/ - arquivos disploniveis para os clientes.
  * index.html - pagina base para o app.
  * styles.css - css próprio do app.
  * app.js - configurações do angular
  * compiled.min.js - todo o codigo de front minificado
