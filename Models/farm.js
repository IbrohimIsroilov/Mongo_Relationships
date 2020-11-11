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

const productSchema=new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring','Summer','Fall','Winter']
    }
})
const farmSchema=new Schema({
    name: String,
    city: String,
    products: [
    {type: Schema.Types.ObjectId, ref: 'Product'}
    ]
    })

const Product=mongoose.model('Product',productSchema);
const Farm=mongoose.model('Farm',farmSchema);

//Product.insertMany([
  //  {name: 'Melon',price: 12, season: 'Summer'},
    //{name: 'Water',price: 12, season: 'Summer'},
    //{name: 'Melolona',price: 12, season: 'Spring'}
//])
const makeFarm=async ()=>{
    const farm=new Farm({name: 'Gogo', city: 'New'});
    const melon= await Product.findOne({name: 'Melon'});
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
}

Farm.findOne({name: 'Farms'}).populate('products').then(farm=>console.log(farm))


