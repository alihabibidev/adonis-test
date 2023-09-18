import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'
const users = [
  {
    email: 'ali@gmail.com',
    first_name: 'ali',
    last_name: 'habibi',
    password: '123456789',
  },
]

export default class extends BaseSeeder {
  public async run() {
    try {
      await Database.table('users').multiInsert(users)
      console.info('users seeded')
    } catch (error) {
      console.error(error)
    }
  }
}
