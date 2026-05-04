import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { InstagramPosts } from '../../instagramPosts.entity';
import { UpdateInstagramPostsXCommand } from './update-instagram-posts-x-command';
import { UpdateInstagramPostsXResponse } from './update-instagram-posts-x-response';

@CommandHandler(UpdateInstagramPostsXCommand)
export class UpdateInstagramPostsXHandler implements ICommandHandler<UpdateInstagramPostsXCommand> {
  async execute(cmd: UpdateInstagramPostsXCommand): Promise<UpdateInstagramPostsXResponse> {
    const post = await InstagramPosts.findOneBy({ id: cmd.id });
    if (!post)
      throw new NotFoundException('Instagram post not found');
    if (cmd.image) {
      if (post.image && fs.existsSync(post.image)) fs.rmSync(post.image);
      post.image = cmd.image.path;
    }
    if (cmd.link)
      post.link = cmd.link;
    await InstagramPosts.save(post);
    return plainToInstance(UpdateInstagramPostsXResponse, post, { excludeExtraneousValues: true });
  }
}