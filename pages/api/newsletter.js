import { MongoClient } from 'mongodb';

async function handler(req, res) {
  let client;
  let connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.password}@${process.env.clustername}.l74ygga.mongodb.net/${process.env.newsletter}?retryWrites=true&w=majority`;

  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      return res.status(422).json('Invalid email address.');
    }

    try {
      client = await MongoClient.connect(connectionString);
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Error connecting to database client.', err: err });
    }

    try {
      const db = client.db();
      await db.collection('emails').insertOne({ email: userEmail });
      client.close();
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Error updating database.', err: err });
    }

    res.status(200).json(`${userEmail} is registered!`);
  }
}

export default handler;
