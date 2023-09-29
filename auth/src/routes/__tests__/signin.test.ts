import request from "supertest";
import { app } from "../../app";
import supertest from "supertest";

export const validCreds = {
    email: 'test@test.com',
    password: 'Passw0rd'
};

const wrongPasswordCreds = {
    email: 'test@test.com',
    password: 'goblinSlay3r'
};

it('fails on unkown email', async () => {
    await request(app).post('/api/users/signin')
    .send(validCreds)
    .expect(400)
});


it('fails on incorrect password', async () => {
    await validSignup();
    return request(app).post('/api/users/signin')
    .send(wrongPasswordCreds)
    .expect(400)
});

it('succeeds on correct creds', async () => {
    await validSignup();
    return request(app).post('/api/users/signin')
    .send(validCreds)
    .expect(200)
});

it('responds with a cookie on success', async () => {
    await validSignup();
    const response: supertest.Response = await request(app).post('/api/users/signin')
    .send(validCreds)
    .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

async function validSignup() {
    return request(app).post('/api/users/signup').send(validCreds).expect(201);
}
