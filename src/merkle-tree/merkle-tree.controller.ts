import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MerkleTreeService } from './merkle-tree.service';
import { CreateMerkleTreeDto } from './dto/create-merkle-tree.dto';
import { UpdateMerkleTreeDto } from './dto/update-merkle-tree.dto';

@Controller('merkle-tree')
export class MerkleTreeController {
  constructor(private readonly merkleTreeService: MerkleTreeService) {}

  @Post()
  create(@Body() createMerkleTreeDto: CreateMerkleTreeDto) {
    return this.merkleTreeService.create(createMerkleTreeDto);
  }

  @Get()
  findAll() {
    return this.merkleTreeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merkleTreeService.findOne(+id);
  }

  @Post('verify')
  verify(@Body() createMerkleTreeDto: CreateMerkleTreeDto) {
    return this.merkleTreeService.verify(createMerkleTreeDto);
  }

  @Post('proof')
  getProof(@Body() createMerkleTreeDto: CreateMerkleTreeDto) {
    return this.merkleTreeService.getProof(createMerkleTreeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMerkleTreeDto: UpdateMerkleTreeDto) {
    return this.merkleTreeService.update(+id, updateMerkleTreeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merkleTreeService.remove(+id);
  }
}
