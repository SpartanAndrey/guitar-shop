import {inject, injectable} from 'inversify';
import { ProductServiceInterface } from './product-service.interface.js';
import CreateProductDto from './dto/create-product.dto.js';
import EditProductDto from './dto/edit-product.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { ProductEntity } from './product.entity.js';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { DEFAULT_IMAGE_FILE_NAME, DEFAULT_PRODUCT_COUNT } from './product.constant.js';
import { SortType } from '../../types/sort.type.js';
import mongoose from 'mongoose';

@injectable()
export default class ProductService implements ProductServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.ProductModel) private readonly productModel: types.ModelType<ProductEntity>,
  ) {}

  public async create(dto: CreateProductDto): Promise<DocumentType<ProductEntity>> {
    const result = await this.productModel.create({...dto, image: DEFAULT_IMAGE_FILE_NAME});
    this.logger.info(`New product created: ${dto.title}`);

    return result;
  }

  public async findById(productId: string): Promise<DocumentType<ProductEntity>[] | null> {
    return this.productModel
      .aggregate([
        {
          $match: {'_id': new mongoose.Types.ObjectId(productId)},
        },
      ]);
  }

  public async editById(productId: string, dto: EditProductDto): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findByIdAndUpdate(productId, dto, {new: true})
      .exec();
  }

  public async deleteById(productId: string): Promise<DocumentType<ProductEntity> | null> {
    return this.productModel
      .findByIdAndDelete(productId)
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<ProductEntity>[]> {
    const limit = count ?? DEFAULT_PRODUCT_COUNT;
    return this.productModel
      .aggregate([
        {
          $limit: limit
        },
        {
          $sort: { postDate: SortType.Down }
        }
      ]);
  }
  
  public async findByGuitar(guitar: string, count?: number): Promise<DocumentType<ProductEntity>[]> {
    const limit = count ?? DEFAULT_PRODUCT_COUNT;
    return this.productModel
      .aggregate([
        {
          $match: {'guitar': guitar},
        },
        {
          $limit: limit
        },
        {
          $sort: { postDate: SortType.Down }
        }
      ]);
  }

  public async findByCord(cord: number, count?: number): Promise<DocumentType<ProductEntity>[]> {
    const limit = count ?? DEFAULT_PRODUCT_COUNT;
    return this.productModel
      .aggregate([
        {
          $match: {'cord': cord},
        },
        {
          $limit: limit
        },
        {
          $sort: { postDate: SortType.Down }
        }
      ]);
  }

  public async exists(productId: string): Promise<boolean> {
    return (await this.productModel
      .exists({_id: productId})) !== null;
  }
}
