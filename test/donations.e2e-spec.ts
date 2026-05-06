import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('DonationsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    const password = await argon2.hash('qwer');
    await dataSource.query(`INSERT INTO users ("fullName", "login", "loginType", "isVerified", "isActive", "role", "password")
                            VALUES ('Ali', 'ali@gmail.com', 'email', true, true, 'superAdmin', '${password}')`);
  });
  afterAll(async () => await teardownTestApp(app, dataSource));

  it('POST /auth/sign-in -> should respond with a jwt token and 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ login: 'ali@gmail.com', password: 'qwer' })
      .expect(201);

    expect(res.body.accessToken).toBeDefined();
    jwtToken = res.body.accessToken;
  });

  //////////////////////Post (Public)

  it('POST donations -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/donations')
      .send({
        amount: 100,
        fullName: 'John Doe',
        date: '2025-01-01',
        paidBy: 'card',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.fullName).toBe('John Doe');
    expect(res.body.amount).toBe(100);
  });

  //////////////////////Patch (Public)

  it('PATCH donations/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/donations/6')
      .send({ amount: 200, fullName: 'Jane Doe', date: '2025-02-01', paidBy: 'cash' })
      .expect(404);
  });

  it('PATCH donations/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/donations/1')
      .send({ amount: 200, fullName: 'Updated Doe', date: '2025-02-01', paidBy: 'cash' })
      .expect(200);

    expect(res.body.fullName).toBe('Updated Doe');
    expect(res.body.amount).toBe(200);
  });

  //////////////////////Get Public

  it('GET donations -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/donations')
      .expect(200);

    expect(res.body).toBeDefined();
  });

  //////////////////////Get Admin

  it('GET donations (admin) -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/donations')
      .expect(401);
  });

  it('GET donations (admin) -> should respond with 200 and return data', async () => {
    const res = await request(app.getHttpServer())
      .get('/donations')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET donations/:id (admin) -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/donations/1')
      .expect(401);
  });

  it('GET donations/:id (admin) -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/donations/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET donations/:id (admin) -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/donations/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('fullName');
    expect(res.body).toHaveProperty('amount');
  });

  //////////////////////Delete (Public)

  it('DELETE donations/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/donations/6')
      .expect(404);
  });

  it('DELETE donations/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/donations/1')
      .expect(200);
  });

  it('DELETE donations/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/donations/1')
      .expect(404);
  });
});