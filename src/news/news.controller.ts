import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
// import { UpdateNewsDto } from './dto/update-News.dto';

@Controller('News')
export class NewsController {
  constructor(private readonly NewsService: NewsService) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.NewsService.create(createNewsDto);
  }

  @Get()
  findAll() {
    return this.NewsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') params) {
    return this.NewsService.findOne(params);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
  //   return this.NewsService.update(+id, updateNewsDto);
  // }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.NewsService.remove(+id);
  }
}
