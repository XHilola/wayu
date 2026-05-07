import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './features/authorization/auth-module';
import { CommonModule } from './features/common/common. module';
import { ContentModule } from './features/content/content.module';
import { EventsModule } from './features/events/events-module';
import { FinanceModule } from './features/finance/finance-module';
import { LibraryModule } from './features/library/library-module';
import { NewsModule } from './features/news/news-module';
import { OrganizationModule } from './features/organization/orgganization-module';
import { QuestionsModule } from './features/questions/questions-module';
import { RecruitmentModule } from './features/recruitment/recruitment-module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    JwtModule.register({
      global:true,
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({isGlobal:true}),
    CacheModule.register({
      isGlobal:true,
      ttl:1000*6
    }),
    AuthModule,
    CommonModule,
    ContentModule,
    EventsModule,
    FinanceModule,
    LibraryModule,
    NewsModule,
    OrganizationModule,
    QuestionsModule,
    RecruitmentModule,
  ]
})
export class AppModule {}