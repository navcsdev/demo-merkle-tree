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
    this.logger.log({ leaf: '0x2c0d15441d05d6d9937538aaeeb48c96700b1f0f' + Buffer.from(',', 'utf8').toString('hex') + Buffer.from('60', 'utf8').toString('hex')});
    // this.logger.log({ leaf: Buffer.from('0x2c0d15441d05d6d9937538aaeeb48c96700b1f0f', 'hex') + Buffer.from(',', 'hex') + Buffer.from('60', 'hex')});

    const leaves = [
      { address: '0x2c0d15441d05d6d9937538aaeeb48c96700b1f0f', amount: '60' },
      { address: '0xfbf7ea75cf2f11d484513ae26dd7895de0778a8a', amount: '100' },
      { address: '0xe6e332697ef99faf915d76c9e7af240dddcc247f', amount: '111' }
    ].map(item => keccak256(item.address + Buffer.from(',', 'utf8').toString('hex') + Buffer.from(item.amount, 'utf8').toString('hex')));

    this.merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
    this.rootHash = this.merkleTree.getHexRoot();
    this.logger.log({root: this.rootHash, tree: this.merkleTree.toString()})
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
    const hash = keccak256(createMerkleTreeDto.address + Buffer.from(',', 'utf8').toString('hex') + Buffer.from(createMerkleTreeDto.amount, 'utf8').toString('hex'))
    this.logger.log({hash: hash.toString('hex')}, 'verify');
    return this.merkleTree.verify(createMerkleTreeDto.proof, hash, this.rootHash);
  }

  getProof(createMerkleTreeDto: CreateMerkleTreeDto) {
    const hash = keccak256(createMerkleTreeDto.address + Buffer.from(',', 'utf8').toString('hex') + Buffer.from(createMerkleTreeDto.amount, 'utf8').toString('hex'))
    this.logger.log({hash: hash.toString('hex')}, 'getProof');
    const proof = this.merkleTree.getHexProof(hash);
    return proof;
  }

  update(id: number, updateMerkleTreeDto: UpdateMerkleTreeDto) {
    return `This action updates a #${id} merkleTree`;
  }

  remove(id: number) {
    return `This action removes a #${id} merkleTree`;
  }
}
