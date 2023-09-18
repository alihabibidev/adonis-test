import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

type StoreUserType = {
  email?: string
  password?: string
  first_name?: string
  last_name?: string
}

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  //remove password in response
  // @column({ serializeAs: null })
  @column()
  public password: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public remmember_token: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static storeUser = async (data: StoreUserType) => {
    await this.create({
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
    })
    return Promise.resolve('user created')
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
