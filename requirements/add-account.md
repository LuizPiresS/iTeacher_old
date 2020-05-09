# Cadastro

> ## Caso de sucesso

1. ⛔️ Recebe uma requisição do tipo **POST** na rota **/api/teacher**
2. ✅ Valida dados obrigatórios **name**, **cpf**, **lattes/cv**, **email** e **password**
3. ✅ **Valida** se já se o cpf já existem no sistema
4. ✅ **Valida** se o e-mail e o cpf são validos
5. ⛔️ **hash** senha
6. ⛔️ Gerar **Token** de acesso
7. ⛔️ **Salvar** token (onde?)
8. ⛔️ Retorna **200**

> ## Exceções

1. ⛔️ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **400** se **name**, **cpf**, **lattes/cv**, **email** e **password** não forem fornecidos pelo professor
3. ✅ Retorna erro **400** se o cpf já já estivem em uso
4. ✅ Retorna erro **400** se o e-mail ou o  cpf forem inválidos
5. ⛔️ Retorna erro **400** se não for possivel crioptografar a senha
6. ⛔️ Retorna erro **500** se não conseguir gerar o token
7. ⛔️ Retorna erro **500** se não conseguir salvar o token
8. ⛔️ Retorna erro **500** se der erro ao tentar criar uma nova conta

<!-- ✅ ⛔️ -->

<!-- a situação é a seguinte: um customer se registra na API e ela recebe o uuid referente ao email ou telefone dela, é enviada um código por email ou sms para o cliente e isso é encriptado no "password", o próximo passo é o app passar o uuid e o customer digitar o código que foi enviado para o email/celular e validar como password, validando, registra o token único e entrega ao customer. A partir daí ele usa uuid / token para identificar -->

<!-- Passwordless -->
