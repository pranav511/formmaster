const Razorpay = require('razorpay');
const {RAZORPAY_ID_KEY, RAZORPAT_SECRET_KEY} = process.env;

const razorpayInstance = new Razorpay({
    key_id:RAZORPAY_ID_KEY,
    key_secret:RAZORPAT_SECRET_KEY
});

exports.renderProduct = async (req,res)=>{
    try {
        res.render('product');
    } catch (error) {
        console.log(error.message);
    }
}

exports.createOrder = async(req,res)=>{
    try {
        const amount = req.body.amount*100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id:RAZORPAY_ID_KEY,
                        product_name:req.body.name,
                        description:req.body.description,
                        contact:"8567345632",
                        name: "Pranav Kewate",
                        email: "pranavkewate5405@gmail.com"
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}
