const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Get all doctors
router.get('/doctors', authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find().select('name specialty');
    res.json({ doctors });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get doctor availability
router.get('/doctors/:id/availability', authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });
    res.json({ slots: doctor.availability.filter((slot) => !slot.isBooked) });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Book appointment
router.post('/appointments/book', authMiddleware, async (req, res) => {
  const { doctorId, userId, date, time } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

    const slot = doctor.availability.find(
      (s) => s.date === date && s.time === time && !s.isBooked
    );
    if (!slot) return res.status(400).json({ msg: 'Slot unavailable' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const appointment = new Appointment({
      doctorId,
      userId,
      date,
      time,
      status: 'confirmed',
    });
    await appointment.save();

    user.appointments.push(appointment._id);
    await user.save();

    slot.isBooked = true;
    await doctor.save();

    // Send confirmation notification
    if (user.notificationPreferences.email) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Appointment Confirmation',
        text: `Dear ${user.name},\n\nYour appointment with ${doctor.name} on ${date} at ${time} has been confirmed.\n\nThank you,\nRuthu Team`,
      });
    }
    if (user.notificationPreferences.sms && process.env.TWILIO_SID) {
      const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
      await client.messages.create({
        body: `Your appointment with ${doctor.name} on ${date} at ${time} has been confirmed.`,
        from: process.env.TWILIO_PHONE,
        to: user.contact,
      });
    }

    res.json({ msg: 'Appointment booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Cancel appointment
router.patch('/appointments/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
    if (appointment.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    const doctor = await Doctor.findById(appointment.doctorId);
    const slot = doctor.availability.find(
      (s) => s.date === appointment.date && s.time === appointment.time
    );
    if (slot) {
      slot.isBooked = false;
      await doctor.save();
    }

    const user = await User.findById(appointment.userId);
    if (user.notificationPreferences.email) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Appointment Cancellation',
        text: `Dear ${user.name},\n\nYour appointment with ${doctor.name} on ${appointment.date} at ${appointment.time} has been cancelled.\n\nThank you,\nRuthu Team`,
      });
    }
    if (user.notificationPreferences.sms && process.env.TWILIO_SID) {
      const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
      await client.messages.create({
        body: `Your appointment with ${doctor.name} on ${appointment.date} at ${appointment.time} has been cancelled.`,
        from: process.env.TWILIO_PHONE,
        to: user.contact,
      });
    }

    res.json({ msg: 'Appointment cancelled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's appointments
router.get('/appointments/user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'appointments',
      populate: { path: 'doctorId', select: 'name specialty' },
    });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ appointments: user.appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;