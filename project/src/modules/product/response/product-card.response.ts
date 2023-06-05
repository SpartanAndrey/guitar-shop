import { Expose } from 'class-transformer';

export default class ProductCardResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  public guitar!: string;

  @Expose()
  public sku!: string;

  @Expose()
  public cord!: Number;

  @Expose()
  public price!: number;

  @Expose()
  public image!: string;
}
