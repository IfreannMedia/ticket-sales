import request from "supertest";
import { app } from "../../app";
import supertest from "supertest";

const validCreds = {
    email: 'test@test.com',
    password: 'Passw0rd'
};

it('clears cookie on signout', async () => {
    await validSignup();
    const response: supertest.Response = await request(app).post('/api/users/signout')
    .send()
    .expect(200);
    expect(response.get('Set-Cookie')[0].includes('session=; ')).toBeTruthy();
});

async function validSignup() {
    return request(app).post('/api/users/signup').send(validCreds).expect(201);
}