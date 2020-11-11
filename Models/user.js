const mongoose=require('mongoose');

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

const userSchema=new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {id:false},
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User=mongoose.model('User',userSchema);

const makeUser= async ()=>{
    const u=new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: 'Kayki',
        city: 'Namangan',
        state: 'Namangan',
        country: 'Uzbekistan'
    })
    const res=await u.save();
    console.log(res);
}

const addAddress=async (id)=>{
    const user=await User.findById(id);
    user.addresses({
        street: 'Kayki',
        city: 'Namangan',
        state: 'Namangan',
        country: 'Uzbekistan'
    })
    const res=await user.save();
    console.log(res);
}

makeUser();