var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    pic: String,
    totalOrdered: {type: Number, default:0}
});

ProductSchema.methods.purchase = function(cb) {
    this.totalOrdered += 1;
    this.save(cb);
};
mongoose.model('Product', ProductSchema);