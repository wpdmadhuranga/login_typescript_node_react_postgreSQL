import { User, IUser } from '../models/User';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
}

export class UserRepository {
  public static async create(userData: CreateUserData): Promise<User> {
    return await User.create(userData);
  }

  public static async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: { email, isActive: true },
      attributes: { include: ['password'] } // Include password for authentication
    });
  }

  public static async findById(id: number): Promise<User | null> {
    return await User.findOne({
      where: { id, isActive: true }
    });
  }

  public static async findByIdWithPassword(id: number): Promise<User | null> {
    return await User.findOne({
      where: { id, isActive: true },
      attributes: { include: ['password'] }
    });
  }

  public static async existsByEmail(email: string): Promise<boolean> {
    const user = await User.findOne({
      where: { email, isActive: true },
      attributes: ['id']
    });
    return !!user;
  }

  public static async updateById(id: number, updateData: Partial<IUser>): Promise<User | null> {
    await User.update(updateData, {
      where: { id, isActive: true }
    });
    return await this.findById(id);
  }

  public static async deleteById(id: number): Promise<boolean> {
    const [affectedRows] = await User.update(
      { isActive: false },
      { where: { id, isActive: true } }
    );
    return affectedRows > 0;
  }

  public static async getAllUsers(limit: number = 10, offset: number = 0): Promise<User[]> {
    return await User.findAll({
      where: { isActive: true },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
  }
}
