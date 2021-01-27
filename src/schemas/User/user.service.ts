// import { Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { User, UserDocument } from './user.schema';
// import { CreateUserDto } from './create-user.dto';

// import { InjectConnection } from '@nestjs/mongoose';
// import { Connection } from 'mongoose';

// @Injectable()
// export class UserService {
//   constructor(
//       @InjectConnection() private connection: Connection,
//       @InjectModel(User.name) private userModel: Model<UserDocument>
//   ) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const createdUser = new this.userModel(createUserDto);
//     return createdUser.save();
//   }

//   async findAll(): Promise<User[]> {
//     return this.userModel.find().exec();
//   }
// }