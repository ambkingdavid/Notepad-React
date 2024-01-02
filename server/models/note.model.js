import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

noteSchema.post(['find', 'findOne'], function () {
  
});

export default mongoose.model('Note', noteSchema);
