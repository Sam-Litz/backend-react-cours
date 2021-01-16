import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssociationDto } from './dto/create-association.dto';
import { Association, AssociationDocument } from './schema/association.schema';
// import { UpdateAssociationDto } from './dto/update-association.dto';

@Injectable()
export class AssociationsService {
  constructor(@InjectModel(Association.name) private readonly associationModel: Model<AssociationDocument>){}

  async create(createAssociationDto: CreateAssociationDto) {
    const assoInDB = await this.findAssociationByName(createAssociationDto.nom);
    if(assoInDB){
      throw new HttpException('Association already exist', HttpStatus.BAD_REQUEST);
    }
    const createdAsso = new this.associationModel(createAssociationDto);
    return createdAsso.save();
  }

  async findAll(): Promise<Association[]> {
    return this.associationModel.find().exec();
  }

  async findOne(assoId: number): Promise<Association> {
    return this.associationModel.findById(assoId).exec();
  }

  async findAssociationByName(nom: string): Promise<Association>{
    return this.associationModel.findOne({ nom: nom }).exec();
  }

  // update(id: number, updateAssociationDto: UpdateAssociationDto) {
  //   return `This action updates a #${id} association`;
  // }

  remove(id: number) {
    return `This action removes a #${id} association`;
  }
}
