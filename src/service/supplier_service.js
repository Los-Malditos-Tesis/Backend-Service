import { AppError } from "../errors/app_error.js";
import { Log } from "../libs/logger/logger.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { CODES } from "../utils/const/codes.js";
import { serviceHandler } from "../utils/handler/service_handler.js";
import {
  findByCode,
  findById,
  save,
  deleteById,
  search,
  update,
} from "../repositories/supplier_repository.js";
import { filterAllowedFields } from "../utils/helper/filter_allowed_fields.js";
import { countActiveProducts } from "../repositories/product_repository.js";

const supplierService = "supplier service: ";

export const createSupplier = serviceHandler(
  supplierService,
  CODES.SUPPLIER.NOT_FOUND,
  async (supplierData = {}, ctx) => {
    Log.infoCtx(
      ctx,
      supplierService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      supplierData,
    );

    const existCode = await findByCode(supplierData.code, ctx);
    if (existCode)
      throw new AppError(
        "El proveedor ya existe",
        400,
        CODES.SUPPLIER.ALREADY_EXISTS,
      );

    const resp = await save(supplierData, ctx);
    Log.infoCtx(
      ctx,
      supplierService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );
    return resp;
  },
);

export const searchSuppliers = serviceHandler(
  supplierService,
  CODES.SUPPLIER.NOT_FOUND,
  async (query = "", limit = 10, page = 1, ctx) => {
    Log.infoCtx(
      ctx,
      supplierService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      query,
    );

    const suppliers = await search(query, limit, page, ctx);
    Log.infoCtx(
      ctx,
      supplierService + consoleKeys.StartKey,
      consoleKeys.ResponseKey,
      suppliers,
    );
    return suppliers;
  },
);

export const updateSupplier = serviceHandler(
  supplierService,
  CODES.SUPPLIER.NOT_FOUND,
  async (supplierData = {}, ctx) => {
    Log.infoCtx(
      ctx,
      supplierService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      supplierData,
    );

    const existSupplier = await findById(supplierData.id, ctx);
    if (!existSupplier)
      throw new AppError(
        "El proveedor no existe",
        404,
        CODES.SUPPLIER.NOT_FOUND,
      );

    const existCode = await findByCode(supplierData.code, ctx);
    if (existCode && existCode.id !== supplierData.id)
      throw new AppError(
        "El proveedor con este codigo ya existe",
        400,
        CODES.SUPPLIER.ALREADY_EXISTS,
      );

    const filterData = filterAllowedFields(supplierData, [
      "name",
      "code",
      "contactName",
      "phone",
      "email",
      "location",
    ]);

    Log.infoCtx(
      ctx,
      supplierService + "filterData",
      consoleKeys.InformationKey,
      filterData,
    );

    const resp = await update(supplierData.id, filterData, ctx);
    Log.infoCtx(
      ctx,
      supplierService + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );
    return resp;
  },
);

export const deleteSupplier = serviceHandler(
  supplierService,
  CODES.SUPPLIER.NOT_FOUND,
  async (id = "", ctx) => {
    Log.infoCtx(
      ctx,
      supplierService + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      id,
    );

    const supplier = await findById(id, ctx);
    if (!supplier)
      throw new AppError(
        "El proveedor no existe",
        404,
        CODES.SUPPLIER.NOT_FOUND,
      );

    const countProducts = await countActiveProducts(supplier.id, ctx);
    if (countProducts > 0)
      throw new AppError(
        "No se puede eliminar el proveedor porque tiene productos asociados",
        400,
        CODES.SUPPLIER.ALREADY_EXISTS,
      );

    Log.infoCtx(
      supplierService,
      consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      supplier,
    );
    return await deleteById(id, ctx);
  },
);
