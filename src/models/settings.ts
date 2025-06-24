import { Schema, model, models } from 'mongoose';

const settingsSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  appearance: { type: String, enum: ['Light', 'Dark'], default: 'Light' },
  language: { 
    type: String, 
    enum: ['English', 'Hindi', 'French', 'Russian', 'Urdu', 'Punjabi'], 
    default: 'English' 
  },
  twoFactorAuth: { type: Boolean, default: true },
  mobilePushNotifications: { type: Boolean, default: true },
  desktopNotifications: { type: Boolean, default: true },
  emailNotifications: { type: Boolean, default: true },
}, { timestamps: true });

export default models.Settings || model('Settings', settingsSchema);