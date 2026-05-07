import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { createTestApp } from './utils/test-app';
import argon2 from 'argon2';
import { teardownTestApp } from './utils/teardown';
import request = require('supertest');

describe('representativesController (e2e)',()=>{
  let app:INestApplication;
  let dataSource:DataSource;
  let jwtToken:string;

  beforeAll(async ()=>{
    ({app,dataSource}=await createTestApp());
    const password = await argon2.hash('qwer');
    await dataSource.query(`INSERT INTO users ("fullName", "login", "loginType", "isActive", "role", "password")
                            VALUES ('Ali', 'ali@gmail.com', 'email', true, 'superAdmin', '${password}')`);
    await dataSource.query(`INSERT INTO representatives ("fullName","image","email","phoneNumber","resume") VALUES ('Eric Someo','sth.png','erics@gmail.com','909999999','word.pdf')`);
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
  /////////////////////Post
  it(
    'POST representatives/admin/create -> Unauthorized,should respond with 401 without token',
    async () => {
      await request(app.getHttpServer())
        .post('/representatives/admin/create')
        .field('fullName', 'Some One')
        .field('image','image.png')
        .field('email','email@gmail.com')
        .field('phoneNumber','909999999')
        .field('resume','resume.pdf')
        .expect(401)
    });

  it(
    'POST representatives/admin/create ->Posted, should respond with 201 without token',
    async () => {
      await request(app.getHttpServer())
        .post('representatives/admin/create')
        .set('Authorization', `Bearer ${jwtToken}`)
        .field('countryId', '1')
        .field('representativeId','1')
        .field('city','London')
        .field('latitude','12.55')
        .field('longitude','16.56')
        .field('phoneNumber','909999999')
        .expect(201)
    });
  //////////////PATCH
  it(
    'PATCH representatives/admin/patch/:id -> should respond with 401 without token ',
    async () => {
      await request(app.getHttpServer())
        .patch('/representatives/admin/patch/1')
        .field('city','HonKong')
        .expect(401)
    });

  it(
    'PATCH representatives/admin/patch/:id -> should respond 200 ',
    async () => {
      await request(app.getHttpServer())
        .patch('/representatives/admin/patch/1')
        .set('Authorization', `Bearer ${jwtToken}`)
        .field('city','HonKong')
        .expect(200)
    });

  /////////////////Get Admin
  it('GET representatives/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/representatives/admin/get')
      .expect(401);
  });

  it('GET representatives/admin -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/representatives/admin/get')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET branch/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('representatives/admin/get/')
      .expect(401);
  });

  it('GET branch/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/representatives/admin/get/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET branch/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/representatives/admin/get/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('countryId');
    expect(res.body).toHaveProperty('representativesId');
    expect(res.body).toHaveProperty('latitude')
    expect(res.body).toHaveProperty('longitude')
    expect(res.body).toHaveProperty('phoneNumber')

  });
  //////////////////////Get Public
  it('GET representatives/ -> should respond with 200 and return array (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/representatives/')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET representatives/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/representatives/get/6')
      .expect(404);
  });

  it('GET representatives/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/representatives/get/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('countryId');
    expect(res.body).toHaveProperty('representativesId');
    expect(res.body).toHaveProperty('latitude')
    expect(res.body).toHaveProperty('longitude')
    expect(res.body).toHaveProperty('phoneNumber')
  });

  //////////////////////Delete

  it('DELETE branch/admin/delete/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .delete('/representatives/admin/delete/')
      .expect(401);
  });

  it('DELETE representatives/admin/delete/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/representatives/admin/delete/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE representatives/admin/delete/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/representatives/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE representatives/admin/delete/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/representatives/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

})
