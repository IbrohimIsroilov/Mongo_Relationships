const mongoose=require('mongoose');
const {Schema}=mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=>{
    console.log('MONGO CONNECTION OPEN');
})
.catch(err=>{
    console.log('MONGO CONNECTION ERROR');
    console.log(err);
})

const userSchema=new Schema({
    username: String,
    age: Number
})

const tweetSchema=new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const User=mongoose.model('User', userSchema);
const Tweet=mongoose.model('Tweet',tweetSchema);

const makeTweets=async ()=>{
    //const user= new User({username: 'chicken', age: 21});
    const user=await new User({name:'chicken'});
    const tweet2=new Tweet({text: 'i love my chickens', likes:1234});
    tweet2.user=user;
    user.save();
    tweet2.save();
}

makeTweets();

