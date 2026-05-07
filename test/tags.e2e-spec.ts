import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('TagsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    const password = await argon2.hash('qwer');
    await dataSource.query(`INSERT INTO users ("fullName", "login", "loginType","isActive", "role", "password")
                            VALUES ('Ali', 'ali@gmail.com', 'email', true,'superAdmin', '${password}')`);
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

  it('POST tags/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/tags/admin')
      .send({ title: 'Unauthorized' })
      .expect(401);
  });

  it('POST tags/admin -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/tags/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Breaking' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Breaking');
  });

  //////////////////////Patch

  it('PATCH tags/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/tags/admin/1')
      .send({ title: 'Nothing' })
      .expect(401);
  });

  it('PATCH tags/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/tags/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Something' })
      .expect(404);
  });

  it('PATCH tags/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/tags/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Updated Breaking' })
      .expect(200);

    expect(res.body.title).toBe('Updated Breaking');
  });

  //////////////////////Get Admin

  it('GET tags/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/tags/admin')
      .expect(401);
  });

  it('GET tags/admin -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/tags/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET tags/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/tags/admin/1')
      .expect(401);
  });

  it('GET tags/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/tags/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET tags/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/tags/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Get Public

  it('GET tags -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/tags')
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET tags/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/tags/6')
      .expect(404);
  });

  it('GET tags/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/tags/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Delete

  it('DELETE tags/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/tags/admin/1')
      .expect(401);
  });

  it('DELETE tags/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/tags/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE tags/admin/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/tags/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE tags/admin/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/tags/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});