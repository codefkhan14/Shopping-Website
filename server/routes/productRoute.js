const router = require("express").Router();

const productController = require("../controllers/productController");

router.post("/addtocart", productController.addToCart);
router.post("/cart", productController.cart);
router.post("/removefromcart", productController.removeFromCart);
router.post("/getproductbycategory", productController.getProductByCategory);
router.post("/getproductbytag", productController.getProductByTag);
router.post("/getproductbyid", productController.getProductById);
module.exports = router;
