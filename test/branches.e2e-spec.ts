import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { createTestApp } from './utils/test-app';
import argon2 from 'argon2';
import { teardownTestApp } from './utils/teardown';
import request = require('supertest');

describe('BranchesController (e2e)',()=>{
  let app:INestApplication;
  let dataSource:DataSource;
  let jwtToken:string;

  beforeAll(async ()=>{
    ({app,dataSource}=await createTestApp());
    const password = await argon2.hash('qwer');
    await dataSource.query(`INSERT INTO users ("fullName", "login", "loginType", "isActive", "role", "password")
                            VALUES ('Ali', 'ali@gmail.com', 'email', true, 'superAdmin', '${password}')`);
    await dataSource.query(`INSERT INTO branches ("countryId","representativeId","city","latitude","longitude","phoneNumber") VALUES ('1','1','London','12.55', '16.56' , '909999999')`);
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
    'POST branches/admin/create -> Unauthorized,should respond with 401 without token',
    async () => {
      await request(app.getHttpServer())
        .post('branches/admin')
        .field('countryId', '1')
        .field('representativeId','1')
        .field('city','London')
        .field('latitude','12.55')
        .field('longitude','16.56')
        .field('phoneNumber','909999999')
        .expect(401)
  });

  it(
    'POST branches/admin/create ->Posted, should respond with 201 without token',
    async () => {
      await request(app.getHttpServer())
        .post('branches/admin')
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
    'PATCH branches/admin/patch/:id -> should respond with 401 without token ',
    async () => {
      await request(app.getHttpServer())
        .patch('/branches/admin/patch/1')
        .field('city','HonKong')
        .expect(401)
  });

  it(
    'PATCH branches/admin/patch/:id -> should respond 200 ',
    async () => {
      await request(app.getHttpServer())
        .patch('/branches/admin/patch/1')
        .set('Authorization', `Bearer ${jwtToken}`)
        .field('city','HonKong')
        .expect(200)
    });

  /////////////////Get Admin
  it('GET branches/admin -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/branches/admin/get')
      .expect(401);
  });

  it('GET branches/admin -> should respond with 200 and return array', async () => {
    const res = await request(app.getHttpServer())
      .get('/branches/admin/get')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET branch/admin/:id -> should respond with 401 without token', async () => {
    await request(app.getHttpServer())
      .get('branches/admin/get/')
      .expect(401);
  });

  it('GET branch/admin/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/branches/admin/get/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('GET branch/admin/:id -> should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/branches/admin/get/1')
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
  it('GET branches/ -> should respond with 200 and return array (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/branches/')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET branches/:id -> should respond with 404 for non-existent id (public)', async () => {
    await request(app.getHttpServer())
      .get('/branches/get/6')
      .expect(404);
  });

  it('GET branches/:id -> should respond with 200 (public)', async () => {
    const res = await request(app.getHttpServer())
      .get('/branches/get/1')
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
      .delete('/branches/admin/delete/')
      .expect(401);
  });

  it('DELETE branches/admin/delete/:id -> should respond with 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .delete('/branches/admin/delete/6')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

  it('DELETE branches/admin/delete/:id -> should respond with 200', async () => {
    await request(app.getHttpServer())
      .delete('/branches/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });

  it('DELETE branches/admin/delete/:id -> should respond with 404 after already deleted', async () => {
    await request(app.getHttpServer())
      .delete('/branches/admin/delete/1')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });

})
