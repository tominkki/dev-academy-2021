import express from 'express';
import getNames from './services/name-service';

const router = express.Router();

router.get('/names', async (req, res) => {
  const args = req.query;
  const nameList = await getNames();

  if (Object.keys(args).length === 0) {
    const sorted = nameList.sort((a, b) => b.amount - a.amount
    );
    return res.json(sorted);
  }

  if (args.alphabetical) {
    const sorted = nameList.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    );
    return res.json(sorted);
  }

  if (args.total) {
    const totalAmount : number = nameList.reduce(
      (acc, name) => acc + name.amount
      , 0);
    return res.json({ totalAmount });
  }

  const [ match ] = nameList.filter(obj => obj.name.toLowerCase() === String(args.name).toLowerCase()
  );

  if (match) {
    return res.send(String(match.amount));
  }

  return res.status(400).send('400 Bad Request');
});

export default router;
