import * as core from 'express-serve-static-core';
import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.type.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { ProductServiceInterface } from './product-service.interface.js';
import ProductResponse from './response/product.response.js';
import { fillDTO } from '../../utils/common.js';
import CreateProductDto from './dto/create-product.dto.js';
import EditProductDto from './dto/edit-product.dto.js';
import ProductCardResponse from './response/product-card.response.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import {DocumentExistsMiddleware} from '../../common/middlewares/document-exists.middleware.js';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file.middleware.js';
import UploadImageResponse from './response/upload-image.response.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../common/errors/http-error.js';

type ParamsGetProduct = {
  productId: string;
}

@injectable()
export default class ProductController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.ProductServiceInterface) private readonly ProductService: ProductServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for ProductController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateProductDto)
      ]
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(this.ProductService, 'Product', 'productId')
      ]
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new ValidateDtoMiddleware(EditProductDto),
        new DocumentExistsMiddleware(this.ProductService, 'Product', 'productId')
      ]
    });
    this.addRoute({
      path: '/:productId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new DocumentExistsMiddleware(this.ProductService, 'Product', 'productId')
      ]
    });
    this.addRoute({
      path: '/:productId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('productId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
  }

  public async index({query}: Request<unknown, unknown, unknown, RequestQuery>, res: Response): Promise<void> {

    const limit = query.limit ? parseInt(query.limit, 10) : undefined;
    
    const selectedGuitar = query.guitar;

    const selectedCord = query.cord ? parseInt(query.cord, 10) : undefined;

    if (selectedGuitar) {
      const result = await this.ProductService.findByGuitar(selectedGuitar, limit);
      this.ok(
        res, fillDTO(ProductResponse, result)
      ); 
    }

    if (selectedCord) {
      const result = await this.ProductService.findByCord(selectedCord, limit);
      this.ok(
        res, fillDTO(ProductResponse, result)
      ); 
    }

    const result = await this.ProductService.find(limit);
      this.ok(
        res, fillDTO(ProductResponse, result)
      );
  }

  
  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateProductDto>, res: Response): Promise<void> {
    
    const result = await this.ProductService.create(body);
    this.created(
      res,
      fillDTO(ProductCardResponse, result)
    );
  }

  public async show({params}: Request<core.ParamsDictionary | ParamsGetProduct>, res: Response): Promise<void> {

    const product = await this.ProductService.findById(params.productId);
  
    if (!product) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'The product doesn\'t exist.',
        'ProductController'
      );
    }

    this.ok(
      res,
      fillDTO(ProductCardResponse, product)
    );
  }

  public async update({body, params}: Request<core.ParamsDictionary | ParamsGetProduct, Record<string, unknown>, EditProductDto>, res: Response): Promise<void> {

    const product = await this.ProductService.findById(params.productId);
  
    if (!product) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'The product doesn\'t exist.',
        'ProductController'
      );
    }

    const result = await this.ProductService.editById(params.productId, body);
    this.created(
      res,
      fillDTO(ProductCardResponse, result)
    );
  }

  public async delete({params}: Request, res: Response): Promise<void> {

    const product = await this.ProductService.findById(params.productId);
  
    if (!product) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'The product doesn\'t exist.',
        'ProductController'
      );
    }

    const result = await this.ProductService.deleteById(params.productId);
    this.noContent(
      res,
      result
    );
  }

  public async uploadImage(req: Request<core.ParamsDictionary | ParamsGetProduct>, res: Response) {
    const { productId } = req.params;
    const updateDto = { image: req.file?.filename };
    await this.ProductService.editById(productId, updateDto);
    this.created(res, fillDTO(UploadImageResponse, {updateDto}));
  }
}
