import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { InstagramPosts } from '../../instagramPosts.entity';
import { CreateInstagramPostsXCommand } from './create-instagram-posts-x-command';
import { CreateInstagramPostsXResponse } from './create-instagram-posts-x-response';

@CommandHandler(CreateInstagramPostsXCommand)
export class CreateInstagramPostsXHandler implements ICommandHandler<CreateInstagramPostsXCommand> {
  async execute(cmd: CreateInstagramPostsXCommand): Promise<CreateInstagramPostsXResponse> {
    const post = InstagramPosts.create({ image: cmd.image.path, link: cmd.link });
    await InstagramPosts.save(post);
    return plainToInstance(CreateInstagramPostsXResponse, post, { excludeExtraneousValues: true });
  }
}