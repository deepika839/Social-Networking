const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const path = require('path');
const navigationRoutes = require('./routes/navigation.routes');
const db = require('./config/db.config');
const postRoutes = require('./routes/post.routes');
const postLikeRoutes = require('./routes/devuser.routes')
var userRoute = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const newgroupRoutes=require('./routes/newgroup.route');
const memberRoutes = require('./routes/member.routes');
const app = express();

var corsOptions = {
    origin: "http://localhost:3000"  //client URL
};
app.use(cors(corsOptions)); 
app.use(express.json());

mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((result) => console.log("connected"))
    .catch((err) => console.log("Not connected ", err))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/postlike', postLikeRoutes);
app.use("/api/userlog", userRoute);
app.use('/api/profile', profileRoutes);
app.use('/api/groups',newgroupRoutes);
app.use('/api/members', memberRoutes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
}); 