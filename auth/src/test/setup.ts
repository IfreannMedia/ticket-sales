import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from "supertest";
import { app } from '../app';
import { validCreds } from '../routes/__tests__/signin.test';

declare global {
    var signup: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = 'dummy-jwt-key';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    // clear out memory DB before each unit test
    const collections = await mongoose.connection.db.collections();

    collections.forEach(async col => await col.deleteMany({}))
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

// global helper function for testing with auth cookie
global.signup = async () => {
    const response = await request(app).post('/api/users/signup').send(validCreds);
    return response.get('Set-Cookie');
}