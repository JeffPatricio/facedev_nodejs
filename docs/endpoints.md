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

# GET (/searchUser?search=)
* Buscar usuários

Entrada (URL):
- search (*): nome do usuário a ser buscado

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- users: usuários encontrados

============================================================

# GET (/users/:userId)
* Visualizar dados do usuário

Entrada (URL):
- userId (*): id do usuário a ser buscado

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- user: usuário encontrado

============================================================

# GET (/users)
* Visualizar dados do usuário

Entrada (headers):
- authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- user: usuário encontrado

============================================================

# GET (/lastUsers) 
* Listar últimos usuários cadastrados

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- users: usuários encontrados

============================================================

# GET (/indexUsers?page=)
* Listar usuários cadastrados

Entrada (URL):
- page: paginação de usuários, 9 por página

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- users: usuários encontrados
- totalPages: total de páginas para listar usuários cadastrados

============================================================

# GET (/feed)
* Listar feed principal

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- feed: postagens encontrados

============================================================

# GET (/profile/:userId)
* visualizar dados e feed do usuário

Entrada (URL):
- userId (*): id do usuário a ser buscado

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- user: dados do usuário
- feed: postagens encontradas

============================================================

# GET (/sessions)
* Validar sessão ativa

Entrada (headers):
- authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação

============================================================

# POST (/feed) (Multipart form)
* Cadastrar postagem

Entrada (headers):
- authorization (*): token de acesso do usuário

Entrada (body):
- file: imagem da postagem
- description: descrição da postagem

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- feed: dados da postagem

============================================================

# PUT (/users/profileImage) (Multipart form)
* Atualziar foto de perfil

Entrada (headers):
- authorization (*): token de acesso do usuário

Entrada (Multipart form):
- file: imagem do perfil

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação

============================================================

# PUT (/users/backgroundImage) (Multipart form)
* Atualziar foto de background

Entrada (headers):
- authorization (*): token de acesso do usuário

Entrada (Multipart form):
- file: imagem do background

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação

============================================================

# PUT (/users) (JSON)
* Atualizar foto de background

Entrada (headers):
- authorization (*): token de acesso do usuário

Entrada (JSON):
- name: nome do usuário
- title: título do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação

============================================================

# DELETE (/users/profileImage)
* remover foto de perfil

Entrada (headers):
- authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação

============================================================

# DELETE (/users/backgroundImage)
* remover foto de background

Entrada (headers):
- authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação

============================================================