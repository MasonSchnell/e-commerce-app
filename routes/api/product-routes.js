const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
    // find all products
    // be sure to include its associated Category and Tag data
    try {
        const categories = await Category.findAll({
            include: Product,
        });

        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// get one product
router.get("/:id", async (req, res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    try {
        const product_id = req.params.id;

        const product = await Product.findByPk(product_id, {
            include: [{ model: Category }, { model: Tag, through: ProductTag }],
        });

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// create new product
router.post("/", (req, res) => {
    /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    Product.create(req.body)
        .then((product) => {
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

// update product
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { new_data } = req.body;

        const updatedProduct = await Product.update(new_data, {
            where: { id },
        });

        if (updatedProduct[0] === 1) {
            res.status(200).json({ message: "Product updated" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    // delete one product by its `id` value
    try {
        const product_id = req.params.id;

        const deleted_product = await Product.destroy({
            where: { id: product_id },
        });

        if (deleted_product === 1) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
