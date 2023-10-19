const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
// Product.belongsToMany(Tag, { through: ProductTag, foreignKey: "product_id" });
// Tag.belongsToMany(Product, { through: ProductTag, foreignKey: "tag_id" });

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const tags = await Tag.findAll({
            include: Product,
        });

        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
        const tag_id = req.params.id;
        const tag = await Tag.findByPk(tag_id, {
            include: Product,
        });

        if (tag) {
            res.json(tag);
        } else {
            res.status(404).json({ message: "Product tag not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
    // create a new tag
    try {
        const tag_id = req.body;

        const new_id = await Tag.create(tag_id);

        res.status(201).json(new_id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    // update a tag's name by its `id` value
    try {
        const { id } = req.params;
        const { new_data } = req.body;

        const tag_id = await Tag.update(new_data, {
            where: { id },
        });

        if (tag_id[0] === 1) {
            res.status(200).json({ message: "Tag Updated" });
        } else {
            res.status(404).json({ message: "Tag not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    // delete on tag by its `id` value

    try {
        const tag_id = req.params.id;

        const deleted_tag = await Tag.destroy({
            where: { id: tag_id },
        });

        if (deleted_tag === 1) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Product tag not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
