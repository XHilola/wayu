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

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    const password = await argon2.hash('qwer');
    await dataSource.query(`INSERT INTO users ("fullName", "login", "loginType",  "isActive", "role", "password")
                            VALUES ('Ali', 'ali@gmail.com', 'email', true,'superAdmin', '${password}')`);
    // Seed a category so events can reference a valid categoryId
    await dataSource.query(`INSERT INTO event_categories ("title") VALUES ('Music')`);
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

  it('POST events/admin/create -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/events/admin/create')
      .field('categoryId', '1')
      .field('title', 'Unauthorized Event')
      .field('content', 'Some content')
      .field('date', '2025-12-01')
      .field('address', '123 Main St')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .expect(401);
  });

  it('POST events/admin/create -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/events/admin/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('categoryId', '1')
      .field('title', 'Music Festival')
      .field('content', 'A great music festival')
      .field('date', '2025-12-01')
      .field('address', '123 Main St')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Music Festival');
    expect(res.body.address).toBe('123 Main St');
  });

  //////////////////////Patch

  it('PATCH events/admin/patch/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/events/admin/patch/1')
      .field('title', 'Nothing')
      .expect(401);
  });

  it('PATCH events/admin/patch/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/events/admin/patch/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Something')
      .field('content', 'Some content')
      .expect(404);
  });

  it('PATCH events/admin/patch/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/events/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Updated Festival')
      .field('content', 'Updated content')
      .field('date', '2025-12-15')
      .field('address', '456 Updated Ave')
      .expect(200);

    expect(res.body.title).toBe('Updated Festival');
    expect(res.body.address).toBe('456 Updated Ave');
  });

  it('PATCH events/admin/patch/:id -> should respond with 200 with new image', async () => {
    const res = await request(app.getHttpServer())
      .patch('/events/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Updated Festival With Image')
      .field('content', 'Updated content')
      .field('date', '2025-12-15')
      .field('address', '456 Updated Ave')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  //////////////////////Get Admin

  it('GET events/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/events/admin')
      .expect(401);
  });

  it('GET events/admin -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/events/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET events/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/events/admin/1')
      .expect(401);
  });

  it('GET events/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/events/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET events/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/events/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('address');
  });

  //////////////////////Get Public

  it('GET events/ -> should respond with 200 and return array (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/events/')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET events/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/events/6')
      .expect(404);
  });

  it('GET events/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/events/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Delete

  it('DELETE events/admin/delete/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/events/admin/delete/1')
      .expect(401);
  });

  it('DELETE events/admin/delete/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/events/admin/delete/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE events/admin/delete/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/events/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE events/admin/delete/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/events/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});