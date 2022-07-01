import MerkleTree from'merkletreejs';
import * as bytes32 from 'bytes32';
const keccak256 = require('keccak256')

import { Injectable, Logger } from '@nestjs/common';
import { CreateMerkleTreeDto } from './dto/create-merkle-tree.dto';
import { UpdateMerkleTreeDto } from './dto/update-merkle-tree.dto';

@Injectable()
export class MerkleTreeService {
  private readonly logger = new Logger(MerkleTreeService.name);
  private merkleTree: MerkleTree;
  private rootHash: string;

  constructor() {
    const leaves = ['0x2C0d15441d05D6d9937538aAEeb48c96700b1F0f', '0xfbf7ea75cf2f11d484513ae26dd7895de0778a8a', '0xe6e332697ef99faf915d76c9e7af240dddcc247f'].map(x => keccak256(x))
    this.merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
    this.rootHash = this.merkleTree.getHexRoot();
    this.logger.log({root: this.rootHash})
  }

  create(createMerkleTreeDto: CreateMerkleTreeDto) {
    return 'This action adds a new merkleTree';
  }

  findAll() {
    return `This action returns all merkleTree`;
  }

  findOne(id: number) {
    return `This action returns a #${id} merkleTree`;
  }

  verify(createMerkleTreeDto: CreateMerkleTreeDto) {
    const address = keccak256(createMerkleTreeDto.address);
    this.logger.log(address.toString('hex'));
    this.logger.log({proof: this.merkleTree.getHexProof(address)});
    return this.merkleTree.verify(createMerkleTreeDto.proof, address, this.rootHash);
  }

  getProof(createMerkleTreeDto: CreateMerkleTreeDto) {
    const address = keccak256(createMerkleTreeDto.address);
    const proof = this.merkleTree.getHexProof(address);
    return proof;
  }

  update(id: number, updateMerkleTreeDto: UpdateMerkleTreeDto) {
    return `This action updates a #${id} merkleTree`;
  }

  remove(id: number) {
    return `This action removes a #${id} merkleTree`;
  }
}
