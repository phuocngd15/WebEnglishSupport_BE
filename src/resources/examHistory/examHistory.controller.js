import { examHistory } from './examHistory.model';

export const postExamHistory = async (req, res) => {
  try {
    const { point } = req.body;
    const { accountId, fullexamId } = req.params;

    const examhistory = new examHistory({
      point,
      fullexamId,
      accountId
    });
    await examhistory.save();
    return res.status(200).json({ data: examhistory });
  } catch (error) {
    res
      .status(400)
      .send({ message: 'Error.' })
      .end();
  }
};

export const getAll = async (req, res) => {
  try {
    const { accountId } = req.params;
    const examhistory = await examHistory.find({ accountId: accountId });
    const sortedByCreattionDate = examhistory.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    return res.status(200).json(sortedByCreattionDate);
  } catch (error) {
    console.error(error.message);
    return res.status(400).end();
  }
};
