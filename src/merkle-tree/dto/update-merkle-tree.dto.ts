import { PartialType } from '@nestjs/mapped-types';
import { CreateMerkleTreeDto } from './create-merkle-tree.dto';

export class UpdateMerkleTreeDto extends PartialType(CreateMerkleTreeDto) {}
