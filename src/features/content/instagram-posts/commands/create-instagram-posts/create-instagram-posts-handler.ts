import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { InstagramPosts } from '../../instagramPosts.entity';
import { CreateInstagramPostsCommand } from './create-instagram-posts-command';
import { CreateInstagramPostsResponse } from './create-instagram-posts-response';

@CommandHandler(CreateInstagramPostsCommand)
export class CreateInstagramPostsHandler implements ICommandHandler<CreateInstagramPostsCommand> {
  async execute(cmd: CreateInstagramPostsCommand): Promise<CreateInstagramPostsResponse> {
    const post = InstagramPosts.create({ image: cmd.image.path, link: cmd.link });
    await InstagramPosts.save(post);
    return plainToInstance(CreateInstagramPostsResponse, post, { excludeExtraneousValues: true });
  }
}