#language:pt

Funcionalidade: API MENSAGEM

# INDEX
Cenário: Procuro todas as mensagens do chat com mensagem criada.
Dado que existe 1 'MENSAGEM' criada
Quando o cliente solicita "GET" "api/v1/mensagens"
Então o status deve ser "OK"
E deve retornar uma lista com 1 'MENSAGEM'

Cenário: Procuro todas as mensagens do chat sem mensagem criada.
Quando o cliente solicita "GET" "api/v1/mensagens"
Então o status deve ser "OK"
E deve retornar uma lista com 0 'MENSAGEM'

# CREATE
Cenário: Crio uma nova mensagem com dados validos.
Quando o cliente solicita "POST" "api/v1/mensagens" com "DADOS VALIDOS"
Então o status deve ser "CREATED"
E deve retornar a 'MENSAGEM CRIADA'

Cenário: Crio uma nova mensagem com dados invalidos.
Quando o cliente solicita "POST" "api/v1/mensagens" com "DADOS INVALIDOS"
Então o status deve ser "UNPROCESSABLE_ENTITY"
E deve retornar um 'ERRO'
