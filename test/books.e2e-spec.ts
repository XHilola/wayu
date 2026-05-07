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

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    const password = await argon2.hash('qwer');
    await dataSource.query(`INSERT INTO users ("fullName", "login", "loginType", "isActive", "role", "password")
                            VALUES ('Ali', 'ali@gmail.com', 'email', true,  'superAdmin', '${password}')`);
    await dataSource.query(`INSERT INTO authors ("fullName") VALUES ('Leo Tolstoy')`);
    await dataSource.query(`INSERT INTO book_categories ("title") VALUES ('Fiction')`);
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

  it('POST books/admin/create -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/books/admin/create')
      .field('authorId', '1')
      .field('categoryId', '1')
      .field('title', 'Unauthorized Book')
      .field('pages', '100')
      .field('year', '2020')
      .field('description', 'Some description')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .attach('file', path.resolve(__dirname, './fixtures/test-book.pdf'))
      .expect(401);
  });

  it('POST books/admin/create -> should respond with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/books/admin/create')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('authorId', '1')
      .field('categoryId', '1')
      .field('title', 'War and Peace')
      .field('pages', '665')
      .field('year', '1869')
      .field('description', 'A novel')
      .attach('image', path.resolve(__dirname, 'test.png'))
      .attach('file', path.resolve(__dirname, 'test.pdf'))
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('War and Peace');
    expect(res.body.pages).toBe(1225);
  });

  //////////////////////Patch

  it('PATCH books/admin/patch/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .patch('/books/admin/patch/1')
      .field('title', 'Nothing')
      .expect(401);
  });

  it('PATCH books/admin/patch/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .patch('/books/admin/patch/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Something')
      .field('pages', '200')
      .expect(404);
  });

  it('PATCH books/admin/patch/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .patch('/books/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Updated War and Peace')
      .field('pages', '1300')
      .field('year', '1869')
      .field('description', 'Updated description')
      .expect(200);

    expect(res.body.title).toBe('Updated War and Peace');
    expect(res.body.pages).toBe(1300);
  });

  it('PATCH books/admin/patch/:id -> should respond with 200 with new image and file', async () => {
    const res = await request(app.getHttpServer())
      .patch('/books/admin/patch/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .field('title', 'Updated War and Peace')
      .field('pages', '1300')
      .field('year', '1869')
      .field('description', 'Updated description')
      .attach('image', path.resolve(__dirname, './fixtures/test-image.png'))
      .attach('file', path.resolve(__dirname, './fixtures/test-book.pdf'))
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  //////////////////////Get Admin

  it('GET books/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/books/admin')
      .expect(401);
  });

  it('GET books/admin -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/books/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET books/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/books/admin/1')
      .expect(401);
  });

  it('GET books/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/books/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET books/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/books/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('pages');
  });

  //////////////////////Get Public

  it('GET books/ -> should respond with 200 and return array (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/books/')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET books/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/books/6')
      .expect(404);
  });

  it('GET books/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/books/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title');
  });

  //////////////////////Delete

  it('DELETE books/admin/delete/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/books/admin/delete/1')
      .expect(401);
  });

  it('DELETE books/admin/delete/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/books/admin/delete/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE books/admin/delete/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/books/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE books/admin/delete/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/books/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});