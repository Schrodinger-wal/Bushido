const Order = require('../schemas/order.schema');

// Post order

async function createOrder (req, res) {
    try {
        const body = req.body;
        const data = new Order(body);

        const newOrder = await data.save

    } catch {

    }
}




module.exports = {

}