# 📜 Gerenciamento e automatização de Emissão de Certificados  

**Projeto para geração automática de certificados em PDF, que podem ser acessados pelo seu estudante através de seu CPF, e podem ser administrados e bloqueados através de um sistema de administrador.
Também contém funcionalidades extras, como um sistema de registro de presença com geração de QRCode. É uma versão genérica que construí com base em um outro projeto que fiz para um cliente na área de educação, com a devida permissão.**  

**No projeto original, utilizei Vercel e Railway como formas de hospedagem dos componentes do projeto, e depois o migrei para servidores próprios do cliente.**  

---
## ! Imagens  
![image](https://github.com/user-attachments/assets/975da2a0-0977-4a64-b1ca-9655d983907c)

![image](https://github.com/user-attachments/assets/ad900c7c-504b-4db8-b8ea-1b05233f689a)

![image](https://github.com/user-attachments/assets/d9628495-bd2a-426a-a491-5017990a06c3)

![image](https://github.com/user-attachments/assets/095be398-59b6-4611-bef6-92e468d3800c)

![image](https://github.com/user-attachments/assets/342e5f5d-8bda-496a-9995-eeb3b3a9bf88)

![image](https://github.com/user-attachments/assets/599b817c-1a30-455a-b51d-076c0ff14ba1)

## ✨ Funcionalidades  

- 🖨️ Impressão de Certificados em PDF individualmente (pelo estudante) e coletivamente (todos os certificados de uma turma, pela página de administrador);
- ✏️ **Personalização automática** com nomes, datas e informações específicas; 
- 📊 Suporte a **Google Spreadsheets** como entrada de dados dos estudantes;
- 🎨 **Modelos customizáveis** (assinaturas, nome de professores, etc.);
- 📁 Menu intuitivo com alta camada de abstração para o administrador;
- :cookie: Autenticação segura do administrador utilizando cookies http only com token JWT;

---

## 🛠️ Tecnologias/Requisitos  

- ReactJS
- NodeJS
- Express
- PostgreSQL
- NPM
- Google Spreadsheets API
- Tailwind CSS

---

## ⚙️ Instalação  
1. **Clonar repositório**:  
   ```bash
   git clone https://github.com/leonardo-mota-filho/certificados_public.git
   cd certificados_public.git
2. **Instalar dependências**:
   ```bash
   cd .\frontend\
   npm install
   cd .\backtend\
   npm install
3. **Hospedar banco de dados PostgreSQL, depois inicializá-lo utilizando o arquivo .sql na raíz do projeto;**
4. **Inserir seu token de autenticação da Google Spreadsheets API em ./backend/models (arquivo deve se chamar google.json)**
5. **Em .\backend\.env, alterar as variáveis do ambiente de acordo com as variáveis do banco de dados hospedado;**
6. **Inicializar projeto**
   ```bash
   cd .\frontend\
   npm run dev
   cd .\backtend\
   npm start

NOTAS:
1- Em um projeto formal, seria inviável deixar as variáveis do ambiente tão fáceis de serem acessadas;
2- Em um projeto formal, o script que monta o banco de dados também não estaria incluido no projeto;
3- A página de login do administrador está na subpágina /adminLogin
4- Usuário e Senha padrão do administrador são ambos "admin", sem as aspas;
