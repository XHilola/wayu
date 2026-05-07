import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('AuthorsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    const password = await argon2.hash('qwer');
    await dataSource.query(`INSERT INTO users ("fullName", "login", "loginType", "isActive", "role", "password")
                            VALUES ('Ali', 'ali@gmail.com', 'email', true, 'superAdmin', '${password}')`);
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

  it('POST authors/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/authors/admin')
      .send({ fullName: 'Unauthorized Author' })
      .expect(401);
  });

  it('POST authors/admin -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/authors/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ fullName: 'Tolstoy' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.fullName).toBe('Tolstoy');
  });

  //////////////////////Patch

  it('PATCH authors/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/authors/admin/1')
      .send({ fullName: 'Nothing' })
      .expect(401);
  });

  it('PATCH authors/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/authors/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ fullName: 'Unknown Author' })
      .expect(404);
  });

  it('PATCH authors/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/authors/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ fullName: 'Updated Tolstoy' })
      .expect(200);

    expect(res.body.fullName).toBe('Updated Tolstoy');
  });

  //////////////////////Get Admin

  it('GET authors/admin -> should respond with 401 no token', async () => {
    await request(app.getHttpServer())
      .get('/authors/admin')
      .expect(401);
  });

  it('GET authors/admin -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/authors/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET authors/admin/:id -> should respond with 401 ', async () => {
    await request(app.getHttpServer())
      .get('/authors/admin/1')
      .expect(401);
  });

  it('GET authors/admin/:id -> should respond with 404 ', async () => {
    await request(app.getHttpServer())
      .get('/authors/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET authors/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/authors/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('fullName');
  });

  //////////////////////Get Public

  it('GET authors -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/authors')
      .expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET authors/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/authors/999')
      .expect(404);
  });

  it('GET authors/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/authors/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('fullName');
  });

  //////////////////////Delete

  it('DELETE authors/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/authors/admin/1')
      .expect(401);
  });

  it('DELETE authors/admin/:id -> should respond with 404 no id', async () => {
    await request(app.getHttpServer())
      .delete('/authors/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE authors/admin/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/authors/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE authors/admin/:id -> should respond with 404', async () => {
    await request(app.getHttpServer())
      .delete('/authors/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});