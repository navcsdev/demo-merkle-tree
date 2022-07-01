import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MerkleTreeModule } from './merkle-tree/merkle-tree.module';

@Module({
  imports: [MerkleTreeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
