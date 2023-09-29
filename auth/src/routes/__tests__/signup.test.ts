// import { request } from "express";
import request from "supertest";
import { app } from "../../app";

it('returns a 201 on succesfull signup', async () => {
    return request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'Passw0rd'
    }).expect(201)
});

it('returns a 400 with invalid email', async () => {
    return request(app).post('/api/users/signup').send({
        email: 'test123test.com',
        password: 'Passw0rd'
    }).expect(400)
});

it('returns a 400 with invalid password', async () => {
    return request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'P'
    }).expect(400)
});


it('returns a 400 with missing creds', async () => {
    await request(app).post('/api/users/signup').send({
    }).expect(400);

    await request(app).post('/api/users/signup').send({
        email: 'test@test.com'
    }).expect(400)

    await request(app).post('/api/users/signup').send({
        password: 'Passw0rd'
    }).expect(400)
});

it('disallows multiple emails', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'Passw0rd'
    }).expect(201)

    return request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'Passw0rd'
    }).expect(400)
});

it('sets a cookie after signup', async () => {
    const response = await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'Passw0rd'
    }).expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
});
