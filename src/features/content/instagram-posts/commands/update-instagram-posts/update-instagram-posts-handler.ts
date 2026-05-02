import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { InstagramPosts } from '../../instagramPosts.entity';
import { UpdateInstagramPostsCommand } from './update-instagram-posts-command';
import { UpdateInstagramPostsResponse } from './update-instagram-posts-response';

@CommandHandler(UpdateInstagramPostsCommand)
export class UpdateInstagramPostsHandler implements ICommandHandler<UpdateInstagramPostsCommand> {
  async execute(cmd: UpdateInstagramPostsCommand): Promise<UpdateInstagramPostsResponse> {
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
    return plainToInstance(UpdateInstagramPostsResponse, post, { excludeExtraneousValues: true });
  }
}