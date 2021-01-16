import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNewsDto } from './dto/create-news.dto';
import { News, NewsDocument } from './schema/news.schema';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private readonly newsModel: Model<NewsDocument>){}

  async create(createNewsDto: CreateNewsDto) {
    const assoInDB = await this.findNewsByName(createNewsDto.title);
    // check si la news existe déjà
    if(assoInDB){
      throw new HttpException('News already exist', HttpStatus.BAD_REQUEST);
    }
    const createdAsso = new this.newsModel(createNewsDto);
    return createdAsso.save();
  }

  async findAll(): Promise<News[]> {
    return this.newsModel.find().exec();
  }

  async findOne(assoId: number): Promise<News> {
    return this.newsModel.findById(assoId).exec();
  }

  async findNewsByName(title: string): Promise<News>{
    return this.newsModel.findOne({ title: title }).exec();
  }

  // update(id: number, updateANewsDto: UpdateNewsDto) {
  //   return `This action updates a #${id} News`;
  // }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
