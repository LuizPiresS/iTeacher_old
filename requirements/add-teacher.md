# Cadastro

> ## Caso de sucesso

1. ⛔️ Recebe uma requisição do tipo **POST** na rota **/api/jobs**
2. ⛔️ Verifica se o usuário esta logado
3. ⛔️ Valida dados obrigatórios **job**, **url**, **description**
4. ⛔️ **Valida** se já existe um job com a mesma url
5. ⛔️ Retorna **200**

> ## Exceções

1. ⛔️ Retorna erro **404** se a API não existir
2. ⛔️ Retorna erro **403** se o usuário não estiver logado
3. ⛔️ Retorna erro **400** se job, url ou description não forem fornecidos pelo client
4. ⛔️ Retorna erro **403** se a url fornecida já estiver em uso
5. ⛔️ Retorna erro **500** se der erro ao tentar criar o novo job

<!-- ✅ ⛔️ -->
