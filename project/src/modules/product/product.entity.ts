import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { Product } from '../../types/product.type';

const {prop, modelOptions} = typegoose;

export interface ProductEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'products'
  }
})

export class ProductEntity extends defaultClasses.TimeStamps implements Product {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true, required: true})
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({required: true})
  public guitar!: string;

  @prop({required: true})
  public sku!: string;

  @prop({required: true})
  public cord!: Number;

  @prop({required: true})
  public price!: number;

  @prop({required: true})
  public image!: string;
}

export const ProductModel = getModelForClass(ProductEntity);
