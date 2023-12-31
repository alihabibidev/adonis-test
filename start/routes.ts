/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/post', 'PostsController.index')
Route.get('/post/ali', 'PostsController.ali')

Route.get('/home', async ({ view }) => {
  return view.render('page/home')
})
Route.get('/about', async ({ view }) => {
  return view.render('page/about')
})

Route.get('/users', async ({ response }) => {
  try {
    // const users = await Database.from('users').select('*')
    const users = await User.all()
    return response.status(200).json(users)
  } catch (error) {
    console.error(error)
    return response.status(400).json(error?.message)
  }
})

Route.post('/users', async ({ response, request }) => {
  try {
    const { email, password, last_name, first_name } = request.all()
    // await Database.insertQuery().table('users').insert({
    //   email: email,
    //   password: password,
    //   last_name: last_name,
    //   first_name: first_name,
    // })
    const result = await User.storeUser({
      email: email,
      password: password,
      last_name: last_name,
      first_name: first_name,
    })
    return response.status(200).json(result)
  } catch (error) {
    console.error(error)
    return response.status(400).json(error?.message)
  }
})

Route.put('/users/:id', async ({ request, params, response }) => {
  const { id } = params
  const { email, password, last_name, first_name } = request.all()
  try {
    await Database.from('users').where('id', id).update({
      first_name,
      last_name,
      password,
      email,
    })
    return response.status(200).json('user updated')
  } catch (error) {
    console.error(error)
    return response.status(400).json(error?.message)
  }
})

Route.delete('/users/:id', async ({ params, response }) => {
  const { id } = params

  try {
    await Database.from('users').where('id', id).delete()
    return response.status(200).json('user deleted')
  } catch (error) {
    console.error(error)
    return response.status(400).json(error?.message)
  }
})
