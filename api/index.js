const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();

const nodemailer = require('nodemailer');

const User = require('./models/User')
const Post = require('./models/Post')
const EmailSubscription = require('./models/EmailSubscription');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const coockieParser = require('cookie-parser')
const multer = require('multer')
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');
const { userInfo } = require('os');

const app = express()

const salt = bcrypt.genSaltSync(10)
const secret = 'yzeagzhfnvbsufjza'
app.use(cors({credentials:true, origin:"http://localhost:5173"}))
app.use(express.json())
app.use(coockieParser())

//we used this to handle the image dinamically 
// in home page after creating a post
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose.connect(process.env.MONGODB_URI).then(() => {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
  });
}).catch(err => {
  console.log(err);
});

 
  // Create a nodemailer transporter using your email service provider
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'ihebmeftah@outlook.fr',
      pass: 'BattleChaosLeague',
    },
  });

  app.get('/', (req, res) => {
    res.send('Hello!');
  });

app.post('/register', async (req, res) => {
  const { userName, email, password, role } = req.body;
  try {
    const userDoc = await User.create({
      userName,
      email,
      password: bcrypt.hashSync(password, salt),
      role,
    });
    // Return the user object with the username
    res.json({
      _id: userDoc._id,
      userName: userDoc.userName,
      email: userDoc.email,
      role: userDoc.role
    });
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const emailDoc = await User.findOne({ email });

  if (!emailDoc) {
    // User does not exist
    res.status(400).json('User does not exist');
    return;
  }

  const passOk = bcrypt.compareSync(password, emailDoc.password);

  if (passOk) {
    // Include the username when signing the token
    jwt.sign(
      { email, id: emailDoc._id, userName: emailDoc.userName, role: emailDoc.role },
      secret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id: emailDoc._id,
          email,
          userName: emailDoc.userName,
          role: emailDoc.role,
        });
      }
    );
  } else {
    // Wrong password
    res.status(400).json('Wrong password');
  }
});



app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  // Check if the token exists
  if (!token) {
    res.status(401).json('Unauthorized');
    return;
  }

  // Verify the token
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    res.json(info);
  });
});


    app.post('/logout', (req, res) => {
      res.cookie('token', '').json("ok")
    })


// Create a new post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // extract the image type from the file and add it in uploads folder
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    // get the id of the author and Create Post
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;

      const { title, summary, content, category } = req.body;

      // Validate required fields
      if (!title || !summary || !content || !category) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }

      const postDoc = await Post.create({
        title,
        summary,
        content,
        category,
        cover: newPath,
        author: info.id,
      });
      


// Function to send an email
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: 'ihebmeftah@outlook.fr',
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

      // Get a list of subscribed users
      const subscribedUsers = await EmailSubscription.find();

      // Send emails to subscribed users
      const postLink = `http://localhost:5173/post/${postDoc._id}`;
      const emailSubject = '🚀 Exciting News: A New Post Awaits You!';
      const emailHtml = `
  <h2><b>${postDoc.title}</b></h2>
  <h6><b><i>by ${info.userName}</i></b></h6>
  <br />
  <p>${postDoc.summary}</p>
  <a href="${postLink}"> ${postLink}</a>
`;
      
      for (const { email } of subscribedUsers) {
        await sendEmail(email, emailSubject, emailHtml);
      }

      res.json({ postDoc });
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

    
    

    
// Edit Post/:id
app.put("/post", uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    // extract the image type from the file and add it in uploads folder
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  // get the id of the author and Edit Post
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content, category } = req.body;

    // Find the post by id
    const postDoc = await Post.findById(id);

    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

    if (!isAuthor) {
      res.status(400).json('You are not the author'); // Send an error response
    } else {
      await Post.updateOne(
        { _id: id }, // Filter by the document's ID
        {
          $set: {
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
            category,
          }
        }
      );
      res.json(postDoc); // Send a success response after updating the post
    }
  });
});


    // Show posts on home page with auhto and sort them
    // by the latest 20 posts created
    app.get('/post', async (req, res) => {
      res.json(
         await Post.find()
         .populate("author", ['userName'])
         .sort({createdAt: -1})
         .limit(20)
         );        
        })


    // Get the  full content in Post Page

    app.get('/post/:id', async (req, res) => {
      const { id } = req.params;
      const postDoc = await Post.findById(id).populate("author", ["userName"]);
      res.json(postDoc);
    });


    // handle email subscription requests.

    app.post('/subscribe', async (req, res) => {
      const { email} = req.body;
    
      try {
        const subscription = await EmailSubscription.create({ email});
        res.status(201).json(subscription);
      } catch (error) {
        res.status(400).json({ error: 'Subscription failed' });
      }
    });


    