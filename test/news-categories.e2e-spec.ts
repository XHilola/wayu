import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('NewsCategoriesController (e2e)', () => {
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

  it('POST news-categories/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/news-categories/admin')
      .send({ title: 'Unauthorized' })
      .expect(401);
  });

  it('POST news-categories/admin -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/news-categories/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Politics' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Politics');
  });

  //////////////////////Patch

  it('PATCH news-categories/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/news-categories/admin/1')
      .send({ title: 'Nothing' })
      .expect(401);
  });

  it('PATCH news-categories/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/news-categories/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Something' })
      .expect(404);
  });

  it('PATCH news-categories/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/news-categories/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Updated Politics' })
      .expect(200);

    expect(res.body.title).toBe('Updated Politics');
  });

  //////////////////////Get Admin

  it('GET news-categories/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/news-categories/admin')
      .expect(401);
  });

  it('GET news-categories/admin -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/news-categories/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET news-categories/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/news-categories/admin/1')
      .expect(401);
  });

  it('GET news-categories/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/news-categories/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET news-categories/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/news-categories/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Get Public

  it('GET news-categories -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/news-categories')
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET news-categories/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/news-categories/6')
      .expect(404);
  });

  it('GET news-categories/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/news-categories/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Delete

  it('DELETE news-categories/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/news-categories/admin/1')
      .expect(401);
  });

  it('DELETE news-categories/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/news-categories/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE news-categories/admin/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/news-categories/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE news-categories/admin/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/news-categories/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});