import {users, products} from '@/lib/deta/connection';

export default async function Request(req, res) {

  const {productID, userID} = req.body;
  let {name, email, phone} = req.body;

  let user = userID ? await users.get(userID) : null;
  const product = productID ? await products.get(productID) : null;

  if (!product)
    return res.status(400).send('Bad request');

  if (user) {
    name = user.name;
    phone = user.phone;
  } else {
    user = await users.put({name, email, phone});
  }

  const r = await fetch(`https://api.callmebot.com/whatsapp.php?phone=${process.env.CALLBOT_PHONE}&text=El%20cliente%20%2A${name}%2A%20esta%20solicitando%20la%20disponibilidad%20de%3A%20%2A${product.name}%2A%0A%0AResponder%20a%3A%20%2A${phone.replace('+', '%2B')}%2A&apikey=${process.env.CALLBOT_API_KEY}`);

  res.json({
    status: 'OK',
    user
  });
}