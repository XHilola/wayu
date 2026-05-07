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

describe('SocialLinksController (e2e)', () => {
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

  it('POST social-links/admin/create -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/social-links/admin/create')
      .field('title', 'Unauthorized')
      .field('link', 'https://instagram.com')
      .attach('icon', path.resolve(__dirname, './fixtures/test-icon.png'))
      .expect(401);
  });

  it('POST social-links/admin/create -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/social-links/admin/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Instagram')
      .field('link', 'https://instagram.com')
      .attach('icon', path.resolve(__dirname, './fixtures/test-icon.png'))
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Instagram');
    expect(res.body.link).toBe('https://instagram.com');
  });

  //////////////////////Patch

  it('PATCH social-links/admin/patch/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/social-links/admin/patch/1')
      .field('title', 'Nothing')
      .expect(401);
  });

  it('PATCH social-links/admin/patch/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/social-links/admin/patch/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Something')
      .field('link', 'https://example.com')
      .expect(404);
  });

  it('PATCH social-links/admin/patch/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/social-links/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Updated Instagram')
      .field('link', 'https://instagram.com/updated')
      .expect(200);

    expect(res.body.title).toBe('Updated Instagram');
    expect(res.body.link).toBe('https://instagram.com/updated');
  });

  it('PATCH social-links/admin/patch/:id -> should respond with 200 with new icon', async () => {
    const res = await request(app.getHttpServer())
      .patch('/social-links/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Updated Instagram')
      .field('link', 'https://instagram.com/updated')
      .attach('icon', path.resolve(__dirname, './fixtures/test-icon.png'))
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  //////////////////////Get Admin

  it('GET social-links/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/social-links/admin')
      .expect(401);
  });

  it('GET social-links/admin -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/social-links/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET social-links/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/social-links/admin/1')
      .expect(401);
  });

  it('GET social-links/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/social-links/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET social-links/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/social-links/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('link');
  });

  //////////////////////Get Public

  it('GET social-links/ -> should respond with 200 and return array (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/social-links/')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET social-links/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/social-links/6')
      .expect(404);
  });

  it('GET social-links/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/social-links/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('link');
  });

  //////////////////////Delete

  it('DELETE social-links/admin/delete/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/social-links/admin/delete/1')
      .expect(401);
  });

  it('DELETE social-links/admin/delete/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/social-links/admin/delete/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE social-links/admin/delete/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/social-links/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE social-links/admin/delete/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/social-links/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});