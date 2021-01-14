import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Association } from './schema/association.schema';
import { UserSchema } from 'src/users/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Association.name, schema: UserSchema}])],
  controllers: [AssociationsController],
  providers: [AssociationsService]
})
export class AssociationsModule {}
