import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '',
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findUserByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findUserById(userId: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }
}
