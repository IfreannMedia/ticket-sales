import request from "supertest";
import { app } from "../../app";
import supertest from "supertest";
import { validCreds } from "./signin.test";

it('we get a current user', async () => {
    const cookie: string[] = await signup();
    const response: supertest.Response = await request(app).get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
    expect(response.body.currentUser).toBeDefined();
    expect(response.body.currentUser.email).toEqual(validCreds.email);
});