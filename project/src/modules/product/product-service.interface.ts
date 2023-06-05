import { DocumentType } from '@typegoose/typegoose';
import { ProductEntity } from './product.entity.js';
import CreateProductDto from './dto/create-product.dto.js';
import EditProductDto from './dto/edit-product.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';

export interface ProductServiceInterface extends DocumentExistsInterface{
  create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>>;
  editById(productId: string, dto: EditProductDto): Promise<DocumentType<ProductEntity> | null>;
  deleteById(productId: string): Promise<DocumentType<ProductEntity> | null>;
  find(count?: number): Promise<DocumentType<ProductEntity>[]>;
  findByGuitar(guitar: string, count?: number): Promise<DocumentType<ProductEntity>[]>;
  findByCord(cord: number, count?: number): Promise<DocumentType<ProductEntity>[]>;
  findById(productId: string): Promise<DocumentType<ProductEntity>[] | null>;
  exists(productId: string): Promise<boolean>;
}
