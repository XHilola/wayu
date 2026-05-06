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

describe('NewsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    const password = await argon2.hash('qwer');
    await dataSource.query(`INSERT INTO users ("fullName", "login", "loginType", "isVerified", "isActive", "role", "password")
                            VALUES ('Ali', 'ali@gmail.com', 'email', true, true, 'superAdmin', '${password}')`);
    await dataSource.query(`INSERT INTO news_categories ("title") VALUES ('Politics')`);
    await dataSource.query(`INSERT INTO countries ("title", "flag") VALUES ('Uzbekistan', 'flag.png')`);
    await dataSource.query(`INSERT INTO tags ("title") VALUES ('Breaking')`);
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

  it('POST news/admin/create -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/news/admin/create')
      .field('categoryId', '1')
      .field('title', 'Unauthorized News')
      .field('date', '2025-01-01')
      .field('content', 'Some content')
      .field('countryId', '1')
      .field('tagIds', '1')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .expect(401);
  });

  it('POST news/admin/create -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/news/admin/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('categoryId', '1')
      .field('title', 'Breaking News')
      .field('date', '2025-01-01')
      .field('content', 'Some content')
      .field('countryId', '1')
      .field('tagIds', '1')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Breaking News');
  });

  //////////////////////Patch

  it('PATCH news/admin/patch/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/news/admin/patch/1')
      .field('title', 'Nothing')
      .expect(401);
  });

  it('PATCH news/admin/patch/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/news/admin/patch/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Something')
      .field('content', 'Some content')
      .expect(404);
  });

  it('PATCH news/admin/patch/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/news/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Updated News')
      .field('content', 'Updated content')
      .field('date', '2025-02-01')
      .expect(200);

    expect(res.body.title).toBe('Updated News');
  });

  it('PATCH news/admin/patch/:id -> should respond with 200 with new image', async () => {
    const res = await request(app.getHttpServer())
      .patch('/news/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Updated News With Image')
      .field('content', 'Updated content')
      .field('date', '2025-02-01')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  //////////////////////Get Admin

  it('GET news/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/news/admin')
      .expect(401);
  });

  it('GET news/admin -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/news/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET news/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/news/admin/1')
      .expect(401);
  });

  it('GET news/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/news/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET news/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/news/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Get Public

  it('GET news/ -> should respond with 200 and return array (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/news/')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET news/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/news/6')
      .expect(404);
  });

  it('GET news/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/news/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Delete

  it('DELETE news/admin/delete/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/news/admin/delete/1')
      .expect(401);
  });

  it('DELETE news/admin/delete/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/news/admin/delete/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE news/admin/delete/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/news/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE news/admin/delete/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/news/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});