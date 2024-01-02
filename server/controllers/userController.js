import { formatDate } from '../utils/helpers.js'
import User from '../models/user.model.js';
import Note from '../models/note.model.js';


class UserController {
  static async notes(req, res, next) {
    console.log('im here')
    const user = await User.findById(req.user.id);
    const query = {
      createdBy: req.user.id,
    };

    let notesObj = Note.find(query).lean();

    notesObj = notesObj.sort('-createdAt');

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const totalNotes = await Note.countDocuments(notesObj);

    notesObj = notesObj.skip(skip).limit(limit);

    const numOfPage = Math.ceil(totalNotes / limit);

    const notes = await notesObj;

    res.status(200).json({
      user,
      notes,
      totalNotes,
      numOfPage,
      page,
      limit,
    });
  }

  static async addNote(req, res) {
    console.log(req.body);
    const { title, content } = req.body;
    req.body.createdBy = req.user.id;
    if (!title) {
      const message = 'Title field required'
      return res.status(400).send(message)
    }
    const newNote = await Note.create(req.body);

    res.status(201).send({
        noteId: newNote._id,
    });
  }

  static async updateNote(req, res) {
    const { title, content } = req.body;
    if (!title || !content) {
      const message = 'field required'
      return res.status(400).send(message)
    }

    try {
      await Note.findByIdAndUpdate(req.params.id, req.body).where(req.user.id);
      res.status(200).send({
        success: true,
        message: 'Note updated successfully'
      });
    } catch (err) {
      console.log(err)
      res.status(500).redirect(`/dashboard/note/${req.params.id}`);
    }

  }

  static async deleteNote(req, res) {
    const note = await Note.findOne({ _id: req.params.id}).where(req.user.id);
    if (!note) {
      return res.status(404).render('404');
    }
    await Note.findByIdAndDelete(req.params.id).where(req.user.id);
    res.status(200).send({
      success: true,
      message: 'Note deleted successfully'
    });
  }

  static async getNote(req, res, next) {
    console.log('Open')
    const note = await Note.findOne({
      _id: req.params.id,
    }).where({
      createdBy: req.user.id,
    }).lean()
    const formatDate = new Date(note.createdAt);
    note.createdAt = formatDate.toLocaleString();
    res.render('dashboard/viewNote', {
      layout: '../views/layouts/dashboardPage',
      note,
    })
  }
}

export default UserController;
