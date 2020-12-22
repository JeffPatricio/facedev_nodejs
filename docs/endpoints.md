# auth_api
5993d7a73d9f9a694e411ba0788cfe2d

# Server URL
http://localhost:8081

============================================================

# POST (/users) (JSON)
* Cadastrar usuários

Entrada (body):
- name (*): nome do usuário
- email (*): email do usuário
- github_user (*): nome de usuário do github
- password (*): senha do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- auth: token de autenticação do usuário
- user: dados do usuário

============================================================

# POST (/sessions) (JSON)
* Fazer login

Entrada (body):
- email (*): email do usuário
- password (*): senha do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- auth: token de autenticação do usuário
- user: dados do usuário

============================================================

# GET (/searchUser?search=) (JSON)
* Buscar usuários

Entrada (URL):
- search (*): nome do usuário a ser buscado

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- users: usuários encontrados
