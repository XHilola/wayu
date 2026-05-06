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

describe('InstagramPostsController (e2e)', () => {
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

  it('POST instagram-posts/admin/create -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/instagram-posts/admin/create')
      .field('link', 'https://instagram.com/p/unauthorized')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .expect(401);
  });

  it('POST instagram-posts/admin/create -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/instagram-posts/admin/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('link', 'https://instagram.com/p/test123')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.link).toBe('https://instagram.com/p/test123');
  });

  //////////////////////Patch

  it('PATCH instagram-posts/admin/patch/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/instagram-posts/admin/patch/1')
      .field('link', 'https://instagram.com/p/nothing')
      .expect(401);
  });

  it('PATCH instagram-posts/admin/patch/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/instagram-posts/admin/patch/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('link', 'https://instagram.com/p/something')
      .expect(404);
  });

  it('PATCH instagram-posts/admin/patch/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/instagram-posts/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('link', 'https://instagram.com/p/updated')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body.link).toBe('https://instagram.com/p/updated');
  });

  it('PATCH instagram-posts/admin/patch/:id -> should respond with 200 with new image', async () => {
    const res = await request(app.getHttpServer())
      .patch('/instagram-posts/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('link', 'https://instagram.com/p/updated-with-image')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  //////////////////////Get Admin

  it('GET instagram-posts/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/instagram-posts/admin')
      .expect(401);
  });

  it('GET instagram-posts/admin -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/instagram-posts/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET instagram-posts/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/instagram-posts/admin/1')
      .expect(401);
  });

  it('GET instagram-posts/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/instagram-posts/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET instagram-posts/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/instagram-posts/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('link');
  });

  //////////////////////Get Public

  it('GET instagram-posts/ -> should respond with 200 and return array (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/instagram-posts/')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET instagram-posts/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/instagram-posts/6')
      .expect(404);
  });

  it('GET instagram-posts/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/instagram-posts/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('link');
  });

  //////////////////////Delete

  it('DELETE instagram-posts/admin/delete/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/instagram-posts/admin/delete/1')
      .expect(401);
  });

  it('DELETE instagram-posts/admin/delete/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/instagram-posts/admin/delete/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE instagram-posts/admin/delete/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/instagram-posts/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE instagram-posts/admin/delete/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/instagram-posts/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});