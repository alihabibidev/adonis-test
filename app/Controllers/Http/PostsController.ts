import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostsController {
  public index({ response }: HttpContextContract) {
    return response.status(200).json('ok')
  }

  public async ali({ view }: HttpContextContract) {
    const user = {
      id: 1,
      name: 'sajad',
    }

    const users = [
      {
        id: 1,
        name: 'sajad',
      },
      {
        id: 2,
        name: 'amin',
      },
      {
        id: 3,
        name: 'sadegh',
      },
    ]
    const html = await view.render('index', { title: 'ali habibi', user, users })
    return html
  }
}
