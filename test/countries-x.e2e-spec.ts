import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';
import * as path from 'path';

describe('CountriesController (e2e)', () => {
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

  it('POST countries/admin/create -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/countries/admin/create')
      .field('title', 'Unauthorized')
      .attach('flag', path.resolve(__dirname, './fixtures/test-flag.png'))
      .expect(401);
  });

  it('POST countries/admin/create -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/countries/admin/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Uzbekistan')
      .attach('flag', path.resolve(__dirname, './fixtures/test-flag.png'))
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Uzbekistan');
  });

  //////////////////////Patch

  it('PATCH countries/admin/patch/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/countries/admin/patch/1')
      .field('title', 'Nothing')
      .expect(401);
  });

  it('PATCH countries/admin/patch/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/countries/admin/patch/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Something')
      .expect(404);
  });

  it('PATCH countries/admin/patch/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/countries/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Updated Uzbekistan')
      .expect(200);

    expect(res.body.title).toBe('Updated Uzbekistan');
  });

  it('PATCH countries/admin/patch/:id -> should respond with 200 and update flag', async () => {
    const res = await request(app.getHttpServer())
      .patch('/countries/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Updated Uzbekistan')
      .attach('flag', path.resolve(__dirname, './fixtures/test-flag.png'))
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  //////////////////////Get Admin

  it('GET countries/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/countries/admin')
      .expect(401);
  });

  it('GET countries/admin -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/countries/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET countries/admin/get/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/countries/admin/get/1')
      .expect(401);
  });

  it('GET countries/admin/get/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/countries/admin/get/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET countries/admin/get/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/countries/admin/get/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Get Public

  it('GET countries/ -> should respond with 200 and return array (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/countries/')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET countries/get/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/countries/get/6')
      .expect(404);
  });

  it('GET countries/get/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/countries/get/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Delete

  it('DELETE countries/admin/delete/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/countries/admin/delete/1')
      .expect(401);
  });

  it('DELETE countries/admin/delete/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/countries/admin/delete/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE countries/admin/delete/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/countries/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE countries/admin/delete/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/countries/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});