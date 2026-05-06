import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('NewsCategoriesXController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    let password = await argon2.hash('qwer');
    await dataSource.query(`INSERT INTO users ("fullName", "login", "loginType", "isVerified", "isActive", "role",
                                               "password")
                            VALUES ('Ali', 'ali@gmail.com', 'email', true, true, 'superAdmin', '${password}')`);
  });
  afterAll(async () => await teardownTestApp(app, dataSource));

  it(
    'POST /auth/sign-in -> should respond with a jwt token and 201',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ login: 'ali@gmail.com', password: 'qwer' })
        .expect(201);

      expect(res.body.accessToken).toBeDefined();
      jwtToken = res.body.accessToken;
    },
  );

  //////////////////////Post

  it('Post admin/news-categories should response with 401', async () => {
    await request(app.getHttpServer())
      .post('/news-categories/admin')
      .send({ title: 'Unauthorized' })
      .expect(401);
  });

  it('Post admin/news-categories, response with 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/news-categories/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'News' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('News');
  });

  ////////////////////////Patch

  it('should PATCH admin/news-categories 401', async () => {
    await request(app.getHttpServer())
      .patch('/news-categories/admin/1')
      .send({ title: 'Nothing' })
      .expect(401);
  });

  it('should PATCH admin/news-categories 404', async () => {
    await request(app.getHttpServer())
      .patch('/news-categories/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Sth' })
      .expect(404);
  });

  it('should PATCH admin/news-categories 200', async () => {
    await request(app.getHttpServer())
      .patch('/news-categories/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Updated' })
      .expect(200);
  });

  //////////////////////Get

  it('should GET admin/news-categories 401', async () => {
    await request(app.getHttpServer())
      .get('/news-categories/admin')
      .expect(401);
  });

  it('should GET admin/news-categories 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/news-categories/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  ///////////////////////Delete

  it('should DELETE admin/news-categories 401', async () => {
    await request(app.getHttpServer())
      .delete('/news-categories/admin/1')
      .expect(401);
  });

  it('should DELETE admin/news-categories 404', async () => {
    await request(app.getHttpServer())
      .delete('/news-categories/admin/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('should DELETE admin/news-categories 200', async () => {
    await request(app.getHttpServer())
      .delete('/news-categories/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('should DELETE admin/news-categories 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/news-categories/admin/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
});