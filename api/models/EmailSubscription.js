const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const EmailSubscriptionSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

const EmailSubscriptionModel = model('EmailSubscription', EmailSubscriptionSchema);

module.exports = EmailSubscriptionModel;
