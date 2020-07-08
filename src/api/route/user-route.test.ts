import request from 'supertest';

const url = 'http://127.0.0.1:1313';
const mockRequest = {
  name: 'teste',
  cpf: '17369591077',
  birthdate: '1995-06-10',
  cellphone: '5330271219',
  email: 'qweeqeqteste@teste.com',
  password: 'teste',
};

describe('/user', () => {
  it('add user', async () => {
    return request(url)
      .post('/user')
      .send(mockRequest)
      .expect(201)
      .then((response) => {
        expect(response.body.email).toEqual('qweeqeqteste@teste.com');
      });
  });
});
