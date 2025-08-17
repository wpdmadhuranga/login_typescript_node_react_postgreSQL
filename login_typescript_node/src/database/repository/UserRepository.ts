import { User, IUser } from '../models/User';
import mongoose from 'mongoose';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export class UserRepository {
  public static async create(userData: CreateUserData): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  public static async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email, isActive: true }).select('+password');
  }

  public static async findById(id: string | mongoose.Types.ObjectId): Promise<IUser | null> {
    return await User.findOne({ _id: id, isActive: true });
  }

  public static async findByIdWithPassword(id: string | mongoose.Types.ObjectId): Promise<IUser | null> {
    return await User.findOne({ _id: id, isActive: true }).select('+password');
  }

  public static async existsByEmail(email: string): Promise<boolean> {
    const user = await User.findOne({ email, isActive: true }).select('_id');
    return !!user;
  }

  public static async updateById(id: string | mongoose.Types.ObjectId, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      id, 
      { ...updateData, updatedAt: new Date() }, 
      { new: true, runValidators: true }
    );
  }

  public static async deleteById(id: string | mongoose.Types.ObjectId): Promise<boolean> {
    const result = await User.findByIdAndUpdate(
      id, 
      { isActive: false, updatedAt: new Date() }
    );
    return !!result;
  }

  public static async getAllUsers(limit: number = 10, skip: number = 0): Promise<IUser[]> {
    return await User.find({ isActive: true })
      .select('-password')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
  }
}
