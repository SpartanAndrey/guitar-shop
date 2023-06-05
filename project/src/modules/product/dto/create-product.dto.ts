import { IsDateString, IsEnum, IsInt, MaxLength, MinLength, IsString, Max, Min, IsPositive, Matches } from 'class-validator';
import { Guitar } from '../../../types/guitar.type.js';
import { Cord } from '../../../types/cord.type.js';

export default class CreateProductDto {
  @MinLength(10, {message: 'Minimum title length must be 2'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date;

  @IsEnum(Guitar, {message: 'guitar type must be Elector/Acoustic/Ukulele'})
  public guitar!: string;

  @IsString({message: 'sku must be a string'})
  public sku!: string;

  @IsEnum(Cord, {message: 'cord number must be 4/6/7/12'})
  public cord!: Number;

  @IsInt({message: 'price must be an integer'})
  @IsPositive({message: 'price must be positive'})
  @Min(10, {message: 'Minimum price must be 10'})
  @Max(1000000, {message: 'Maximum price must be 1000000'})
  public price!: number;

  @IsString({message: 'image must be a string'})
  @Matches(/(\S+(\.jpg|png)$)/, {message: 'image extension must be jpg or png'})
  public image!: string;
}
