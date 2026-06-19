import swaggerJsdoc from "swagger-jsdoc";
import { config } from "../config/config.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Warehouse Management API",
      version: "1.0.0",
      description: "API de gestión de bodegas (Warehouse Management System) para control de inventarios, pedidos, escaneos automatizados y gestión de usuarios.",
      contact: {
        name: "Soporte de Desarrollo",
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}${config.basePath}`,
        description: "Servidor de Desarrollo Local",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingresa el token JWT en el formato: Bearer <token>",
        },
        CameraAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "Clave de API para autenticación de cámaras inteligentes.",
        },
      },
      schemas: {
        Role: {
          type: "object",
          properties: {
            id: { type: "string", example: "ADMIN", description: "Código único de rol en mayúsculas" },
            name: { type: "string", example: "Administrador" },
            description: { type: "string", example: "Acceso total al sistema" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string", example: "Juan Pérez" },
            email: { type: "string", format: "email", example: "juan.perez@example.com" },
            active: { type: "boolean", example: true },
            warehouse_id: { type: "string", format: "uuid", nullable: true },
            roles: {
              type: "array",
              items: { $ref: "#/components/schemas/Role" },
            },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Supplier: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string", example: "Distribuidora Central S.A." },
            code: { type: "string", example: "PROV-001" },
            contactName: { type: "string", example: "Carlos Gómez" },
            phone: { type: "string", example: "+503 2200-1122" },
            email: { type: "string", format: "email", example: "contacto@central.com" },
            location: { type: "string", example: "San Salvador, El Salvador" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            code: { type: "string", example: "PROD-1002" },
            name: { type: "string", example: "Caja de Leche Deslactosada 1L" },
            category: { type: "string", example: "Lácteos" },
            sku: { type: "string", example: "SKU-MILK-001" },
            supplier_id: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Warehouse: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string", example: "Bodega Central San Salvador" },
            address: { type: "string", example: "Calle el Mirador, #123" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Location: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            zone: { type: "string", example: "ZONA-A1" },
            category: { type: "string", example: "Refrigerado" },
            warehouse_id: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Box: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            qrCode: { type: "string", example: "BOX-QR-12345" },
            code: { type: "string", example: "B-001", nullable: true },
            quantity: { type: "integer", example: 12 },
            status: { type: "string", example: "CREATED" },
            product_id: { type: "string", format: "uuid" },
            pallet_id: { type: "string", format: "uuid", nullable: true },
            warehouse_id: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Pallet: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            code: { type: "string", example: "P-5501" },
            qrCode: { type: "string", example: "PALLET-QR-98765" },
            quantityBox: { type: "integer", example: 48 },
            quantityUnitsInBox: { type: "integer", example: 12, nullable: true },
            status: { type: "string", example: "CREATED" },
            product_id: { type: "string", format: "uuid" },
            warehouse_id: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            type: { type: "string", enum: ["IN", "OUT"], example: "IN" },
            unit_type: { type: "string", enum: ["BOX", "PALLET"], example: "BOX" },
            total_quantity: { type: "integer", example: 100 },
            total_delivered: { type: "integer", example: 0 },
            total_dispatched: { type: "integer", example: 0 },
            status: { type: "string", example: "PENDING" },
            product_id: { type: "string", format: "uuid" },
            origin_warehouse_id: { type: "string", format: "uuid", nullable: true },
            destination_warehouse_id: { type: "string", format: "uuid", nullable: true },
            store_id: { type: "string", format: "uuid", nullable: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Camera: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            code: { type: "string", example: "CAM-001" },
            isActive: { type: "boolean", example: true },
            location_id: { type: "string", format: "uuid", nullable: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        ScanEvent: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            qrCode: { type: "string", example: "BOX-QR-12345" },
            detectedType: { type: "string", enum: ["BOX", "PALLET"], example: "BOX" },
            status: { type: "string", example: "SUCCESS" },
            confidense: { type: "number", format: "float", example: 0.98 },
            type: { type: "string", enum: ["ENTRY", "EXIT", "VERIFY"], example: "ENTRY" },
            errorMessage: { type: "string", nullable: true },
            itemCode: { type: "string", nullable: true },
            camera_id: { type: "string", format: "uuid" },
            product_id: { type: "string", format: "uuid" },
            warehouse_id: { type: "string", format: "uuid" },
            order_id: { type: "string", format: "uuid", nullable: true },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        ConfigParams: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            key: { type: "string", example: "SCANNING_MODE" },
            value: { type: "string", example: "ENTRY" },
            warehouse_id: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        Store: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string", example: "Sucursal Escalón" },
            code: { type: "string", example: "ST-002" },
            address: { type: "string", example: "Centro Comercial Galerías, Local 2B" },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
          },
        },
        GenericResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Operación realizada con éxito" },
            code: { type: "string", example: "SUCCESS_CODE" },
            data: { type: "object", description: "Datos retornados por el servidor" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Mensaje explicativo del error" },
            code: { type: "string", example: "ERROR_CODE", nullable: true },
            details: { type: "object", description: "Información técnica o causa raíz", nullable: true },
          },
        },
        ValidationErrorResponse: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: { type: "string" },
              example: ["El nombre es requerido", "El id debe ser un UUID válido"],
            },
          },
        },
      },
    },
  },
  apis: ["./src/controller/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
