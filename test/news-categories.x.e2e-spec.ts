import 'dotenv/config';
import {INestApplication} from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import {createTestApp} from './utils/test-app';
// @ts-ignore
import {teardownTestApp} from './utils/teardown';
import {DataSource} from 'typeorm';

describe('NewsCategoriesXController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    ({app, dataSource} = await createTestApp());
  });
  afterAll(async () => await teardownTestApp(app, dataSource));

  it(
    'POST /news-categories/admin should response with 201',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/news-categories/admin')
        .send({title:"Breaking News"})
        .expect(201);

      // expect(res.body.accessToken).toBeDefined();
    },
  );
});
