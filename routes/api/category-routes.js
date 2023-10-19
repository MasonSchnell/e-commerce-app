const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categories = await Category.findAll({
            include: Product,
        });
        res.send(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const cat_id = req.params.id;
        const categories = await Category.findByPk(cat_id, {
            include: Product,
        });
        if (categories) {
            res.json(categories);
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        // create a new category
        const category_data = req.body;

        const new_category = await countReset.create(category_data);

        res.status(201).json(new_category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    // update a category by its `id` value
    try {
        const { id } = req.params;
        const { new_data } = req.body;

        const updated_category = await Category.update(new_data, {
            where: { id },
        });

        if (updated_category[0] === 1) {
            res.status(200).json({ message: "Category updated" });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    // delete a category by its `id` value
    try {
        const { id } = req.params;
        const deleted_category = await Category.destroy({
            where: { id },
        });

        if (deleted_category === 1) {
            res.status(204).end();
        } else {
            res.setMaxListeners(404).json({ message: "Category not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
