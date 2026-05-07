import { Module } from '@nestjs/common';
import {
  CreateEventCategoriesXHandler
} from './event-categories/admin/create-event-categories-x/create-event-categories-x-handler';
import {
  DeleteEventCategoriesXHandler
} from './event-categories/admin/delete-event-categories-x/delete-event-categories-x-handler';
import {
  GetAllEventCategoriesXHandler
} from './event-categories/admin/get-all-event-categories-x/get-all-event-categories-x-handler';
import {
  GetOneEventCategoriesXHandler
} from './event-categories/admin/get-one-event-categories-x/get-one-event-categories-x-handler';
import {
  UpdateEventCategoriesXHandler
} from './event-categories/admin/update-event-categories-x/update-event-categories-x-handler';
import {
  GetAllEventCategoriesHandler
} from './event-categories/public/get-all-event-categories/get-all-event-categories-handler';
import {
  GetOneEventCategoriesHandler
} from './event-categories/public/get-one-event-categories/get-one-event-categories-handler';
import { CreateEventsXHandler } from './events/admin/create-events-x/create-events-x-handler';
import { DeleteEventsXHandler } from './events/admin/delete-events-x/delete-events-x-handler';
import { GetAllEventsXHandler } from './events/admin/get-all-events-x/get-all-events-x-handler';
import { GetOneEventsXHandler } from './events/admin/get-one-events-x/get-one-events-x-handler';
import { UpdateEventsXHandler } from './events/admin/update-events-x/update-events-x-handler';
import { GetAllEventsHandler } from './events/public/get-all-events/get-all-events-handler';
import { GetOneEventsHandler } from './events/public/get-one-events/get-one-events-handler';
import { EventsController, EventsXController } from './events/events.controller';
import { EventCategoriesController, EventCategoriesXController } from './event-categories/event-categories.controller';

@Module({
  providers:[
    CreateEventCategoriesXHandler,
    DeleteEventCategoriesXHandler,
    GetAllEventCategoriesXHandler,
    GetOneEventCategoriesXHandler,
    UpdateEventCategoriesXHandler,
    GetAllEventCategoriesHandler,
    GetOneEventCategoriesHandler,

    CreateEventsXHandler,
    DeleteEventsXHandler,
    GetAllEventsXHandler,
    GetOneEventsXHandler,
    UpdateEventsXHandler,
    GetAllEventsHandler,
    GetOneEventsHandler,
  ],
  controllers:[
    EventsController,
    EventsXController,
    EventCategoriesController,
    EventCategoriesXController,
  ],
})
export class EventsModule{}