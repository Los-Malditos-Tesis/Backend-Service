import db from "../models/index.js";
import { Op } from "sequelize";
import { repositoryHandler } from "../utils/handler/repository_handler.js";

const supplierRepository = "supplier repository: ";

export const save = repositoryHandler(
  supplierRepository,
  async (supplier = {}, ctx) => {
    return await db.Supplier.create(supplier);
  },
);

export const findAll = repositoryHandler(supplierRepository, async (ctx) => {
  return await db.Supplier.findAll({
    order: [["name", "ASC"]],
  });
});

export const findById = repositoryHandler(
  supplierRepository,
  async (id = "", ctx) => {
    return await db.Supplier.findByPk(id);
  },
);

export const update = repositoryHandler(
  supplierRepository,
  async (id = "", data = {}, ctx) => {
    const [updated] = await db.Supplier.update(data, {
      where: { id: id },
    });

    return updated;
  },
);

export const deleteById = repositoryHandler(
  supplierRepository,
  async (id = "", ctx) => {
    return await db.Supplier.destroy({
      where: { id: id },
    });
  },
);

export const findByCode = repositoryHandler(
  supplierRepository,
  async (code = "", ctx) => {
    return await db.Supplier.findOne({
      where: { code: code },
    });
  },
);

export const findWithProducts = repositoryHandler(
  supplierRepository,
  async (id = "", ctx) => {
    return await db.Supplier.findByPk(id, {
      include: [
        {
          model: db.Product,
          as: "Products",
        },
      ],
    });
  },
);

export const searchByName = repositoryHandler(
  supplierRepository,
  async (query = "", ctx) => {
    const { Op } = db.sequelize;
    return await db.Supplier.findAll({
      where: {
        name: { [Op.iLike]: `%${query}%` },
      },
      limit: 10,
    });
  },
);

//TODO:validar la paginacion
export const search = repositoryHandler(
  supplierRepository,
  async (query = "", limit = 10, page = 1, ctx) => {
    const offset = (page - 1) * limit;
    const { id, name, code, phone, email, contactName, location } = query;
    const whereClouse = {
      deleted_at: null,
    };

    if (id) whereClouse.id = { [Op.iLike]: `%${id}%` };
    if (name) whereClouse.name = { [Op.iLike]: `%${name}%` };
    if (code) whereClouse.code = { [Op.iLike]: `%${code}%` };
    if (phone) whereClouse.phone = { [Op.iLike]: `%${phone}%` };
    if (email) whereClouse.email = { [Op.iLike]: `%${email}%` };
    if (contactName)
      whereClouse.contactName = { [Op.iLike]: `%${contactName}%` };
    if (location) whereClouse.location = { [Op.iLike]: `%${location}%` };

    const productsQuery = {
      model: db.Product,
      as: "Products",
    };

    const { rows, count } = await db.Supplier.findAndCountAll({
      where: whereClouse,
      limit,
      offset,
      order: [["name", "ASC"]],
      include: [productsQuery],
    });

    return {
      items: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  },
);
