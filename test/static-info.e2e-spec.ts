import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('StaticInfoController (e2e)', () => {
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

  it('POST static-info/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/static-info/admin')
      .send({ appStoreLink: 'https://apps.apple.com', playMarketLink: 'https://play.google.com', aboutUs: 'About us text' })
      .expect(401);
  });

  it('POST static-info/admin -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/static-info/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ appStoreLink: 'https://apps.apple.com', playMarketLink: 'https://play.google.com', aboutUs: 'About us text' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.appStoreLink).toBe('https://apps.apple.com');
    expect(res.body.playMarketLink).toBe('https://play.google.com');
  });

  //////////////////////Patch Admin

  it('PATCH static-info/admin/patch/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/static-info/admin/patch/1')
      .send({ aboutUs: 'Nothing' })
      .expect(401);
  });

  it('PATCH static-info/admin/patch/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/static-info/admin/patch/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ aboutUs: 'Something' })
      .expect(404);
  });

  it('PATCH static-info/admin/patch/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/static-info/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ appStoreLink: 'https://apps.apple.com/updated', playMarketLink: 'https://play.google.com/updated', aboutUs: 'Updated about us' })
      .expect(200);

    expect(res.body.aboutUs).toBe('Updated about us');
  });

  //////////////////////Get Admin

  it('GET static-info/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/static-info/admin')
      .expect(401);
  });

  it('GET static-info/admin -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/static-info/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  it('GET static-info/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/static-info/admin/1')
      .expect(401);
  });

  it('GET static-info/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/static-info/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET static-info/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/static-info/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('appStoreLink');
    expect(res.body).toHaveProperty('playMarketLink');
  });

  //////////////////////Get Public

  it('GET static-info/ -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/static-info/')
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  it('GET static-info/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/static-info/6')
      .expect(404);
  });

  it('GET static-info/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/static-info/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('appStoreLink');
  });

  //////////////////////Delete Admin

  it('DELETE static-info/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/static-info/admin/1')
      .expect(401);
  });

  it('DELETE static-info/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/static-info/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE static-info/admin/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/static-info/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE static-info/admin/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/static-info/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});