import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('EventCategoriesController (e2e)', () => {
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

  //////////////////////Post

  it('POST event-categories/admin/create -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/event-categories/admin/create')
      .send({ title: 'Unauthorized' })
      .expect(401);
  });

  it('POST event-categories/admin/create -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/event-categories/admin/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Music' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Music');
  });

  //////////////////////Patch

  it('PATCH event-categories/admin/patch/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/event-categories/admin/patch/1')
      .send({ title: 'Nothing' })
      .expect(401);
  });

  it('PATCH event-categories/admin/patch/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/event-categories/admin/patch/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Something' })
      .expect(404);
  });

  it('PATCH event-categories/admin/patch/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/event-categories/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Updated Music' })
      .expect(200);

    expect(res.body.title).toBe('Updated Music');
  });

  //////////////////////Get Admin

  it('GET event-categories/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/event-categories/admin')
      .expect(401);
  });

  it('GET event-categories/admin -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/event-categories/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET event-categories/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/event-categories/admin/1')
      .expect(401);
  });

  it('GET event-categories/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/event-categories/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET event-categories/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/event-categories/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Get Public

  it('GET event-categories/ -> should respond with 200 and return array (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/event-categories/')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET event-categories/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/event-categories/6')
      .expect(404);
  });

  it('GET event-categories/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/event-categories/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Delete

  it('DELETE event-categories/admin/delete/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/event-categories/admin/delete/1')
      .expect(401);
  });

  it('DELETE event-categories/admin/delete/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/event-categories/admin/delete/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE event-categories/admin/delete/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/event-categories/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE event-categories/admin/delete/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/event-categories/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});