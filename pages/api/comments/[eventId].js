import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  let result;

  try {
    client = await MongoClient.connect(
      'mongodb+srv://egonzalez442:QFBYPZivRrviFQTI@cluster0.l74ygga.mongodb.net/events?retryWrites=true&w=majority'
    );
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Connecting to Database failed.', err: err });
  }

  if (req.method === 'POST') {
    //add server side validation
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      return res.status(422).json('Invalid input.');
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    try {
      const db = client.db();
      result = await db.collection('comments').insertOne(newComment);
      client.close();
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Error updating database.', err: err });
    }

    newComment._id = result.insertedId;

    res
      .status(201)
      .json({ message: 'New comment added.', comment: newComment });
  }

  if (req.method === 'GET') {
    try {
      const db = client.db();
      result = await db
        .collection('comments')
        .find({ eventId: eventId })
        .sort({ _id: -1 })
        .toArray();

      client.close();
    } catch (err) {
      return res.status(500).json({
        message: 'Error fetching information from database.',
        err: err,
      });
    }

    res.status(200).json({ comments: result });
  }
}

export default handler;
