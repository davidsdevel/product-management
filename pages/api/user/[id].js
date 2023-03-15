import {users} from '@/lib/deta/connection';

export default async function User(req, res) {
  if (req.method !== 'GET')
    return res.status(405).send('Method Not Allowed');

  const {id} = req.query;

  const user = await users.get(id);

  if (!user)
    return res.status(404).json({
      message: 'User doesn\'t found'
    });

  res.json({
    user
  });
}