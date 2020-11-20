import { Profile } from './profile.model';
import path from 'path';


export const getOneProfile = async (req, res) => {
    try {
        const profile = await Profile.find({ _id: req.params.id }).populate('user', ['fullname', 'email', 'password']);

        if (!profile) {
            res.status(404).send({ message: 'Invalid Document' });
        }
        res.status(200).send({ data: profile });

    } catch (error) {
        console.error(error.message);
        res.status(400).send({ message: 'Error.' }).end();
    }
}

export const postProfile = async (req, res)=>{
    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.json(profile);
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
}

export const putProfile = async (req, res) => {
    const {
        gender,
        phone,
        level
    }
    const profile = {
        gender,
        phone,
        level
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}