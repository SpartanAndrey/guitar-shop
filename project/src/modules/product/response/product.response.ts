import { Expose } from 'class-transformer';

export default class ProductCardResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  public price!: number;

  @Expose()
  public image!: string;
}

