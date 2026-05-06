import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('FaqsController (e2e)', () => {
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

  it('POST faqs/create -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/faqs/create')
      .send({ question: 'What is this?', answer: 'This is a test.', tagIds: [] })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.question).toBe('What is this?');
    expect(res.body.answer).toBe('This is a test.');
  });

  //////////////////////Patch (Public)

  it('PATCH faqs/patch/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/faqs/patch/6')
      .send({ question: 'Updated?', answer: 'Updated answer.', tagIds: [] })
      .expect(404);
  });

  it('PATCH faqs/patch/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/faqs/patch/1')
      .send({ question: 'Updated question?', answer: 'Updated answer.', tagIds: [] })
      .expect(200);

    expect(res.body.question).toBe('Updated question?');
    expect(res.body.answer).toBe('Updated answer.');
  });

  //////////////////////Get Public

  it('GET faqs/ -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/faqs/')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET faqs/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/faqs/6')
      .expect(404);
  });

  it('GET faqs/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/faqs/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('question');
    expect(res.body).toHaveProperty('answer');
  });

  //////////////////////Get Admin

  it('GET faqs/admin/get -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/faqs/admin/get')
      .expect(401);
  });

  it('GET faqs/admin/get -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/faqs/admin/get')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET faqs/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/faqs/admin/1')
      .expect(401);
  });

  it('GET faqs/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/faqs/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET faqs/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/faqs/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('question');
  });

  //////////////////////Delete (Public)

  it('DELETE faqs/delete/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/faqs/delete/6')
      .expect(404);
  });

  it('DELETE faqs/delete/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/faqs/delete/1')
      .expect(200);
  });

  it('DELETE faqs/delete/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/faqs/delete/1')
      .expect(404);
  });
});