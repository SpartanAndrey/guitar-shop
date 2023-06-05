import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type';
import { generateRandomValue, getRandomItem } from '../../utils/random.js';
import { ProductGeneratorInterface } from './product-generator.interface';

const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class ProductGenerator implements ProductGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const guitar = getRandomItem<string>(this.mockData.guitars);
    const sku = getRandomItem<string>(this.mockData.skus);
    const cord = getRandomItem<string>(this.mockData.cords);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const image = getRandomItem<string>(this.mockData.images);

    return [
      title, description, postDate, guitar, sku, cord, price, image
    ].join('\t');
  }
}
