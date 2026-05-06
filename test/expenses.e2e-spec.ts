import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('ExpensesController (e2e)', () => {
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

  //////////////////////Post Admin

  it('POST expenses/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/expenses/admin')
      .send({
        amount: 500,
        date: '2025-01-01',
        title: 'Unauthorized',
        description: 'Some description',
        transactionId: 'TXN001',
      })
      .expect(401);
  });

  it('POST expenses/admin -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/expenses/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        amount: 500,
        date: '2025-01-01',
        title: 'Office Supplies',
        description: 'Bought pens and paper',
        transactionId: 'TXN001',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Office Supplies');
    expect(res.body.amount).toBe(500);
  });

  //////////////////////Patch Admin

  it('PATCH expenses/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/expenses/admin/1')
      .send({ title: 'Nothing' })
      .expect(401);
  });

  it('PATCH expenses/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/expenses/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Something', amount: 100, date: '2025-02-01', description: 'desc', transactionId: 'TXN002' })
      .expect(404);
  });

  it('PATCH expenses/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/expenses/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        amount: 750,
        date: '2025-02-01',
        title: 'Updated Supplies',
        description: 'Updated description',
        transactionId: 'TXN002',
      })
      .expect(200);

    expect(res.body.title).toBe('Updated Supplies');
    expect(res.body.amount).toBe(750);
  });

  //////////////////////Get Admin

  it('GET expenses/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/expenses/admin')
      .expect(401);
  });

  it('GET expenses/admin -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/expenses/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET expenses/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/expenses/admin/1')
      .expect(401);
  });

  it('GET expenses/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/expenses/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET expenses/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/expenses/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('amount');
  });

  //////////////////////Get Public

  it('GET expenses -> should respond with 200 and return data (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/expenses')
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET expenses/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/expenses/6')
      .expect(404);
  });

  it('GET expenses/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/expenses/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('amount');
  });

  //////////////////////Delete Admin

  it('DELETE expenses/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/expenses/admin/1')
      .expect(401);
  });

  it('DELETE expenses/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/expenses/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE expenses/admin/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/expenses/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE expenses/admin/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/expenses/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});