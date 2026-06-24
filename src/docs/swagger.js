import swaggerJsdoc from "swagger-jsdoc";
import { config } from "../config/config.js";

/**
 * @openapi
 * tags:
 *   - name: Warehouse
 *     description: Operaciones de gestión de inventario, configuración y estructura de bodegas.
 *   - name: Product
 *     description: Operaciones de gestión y catálogo general de productos.
 *   - name: Pallet
 *     description: Operaciones de registro, actualización, búsqueda y control de pallets.
 *   - name: Audit
 *     description: Log de auditoría del sistema para rastreo de operaciones de base de datos.
 *   - name: Auth
 *     description: Operaciones de autenticación de usuarios, renovación de tokens y vinculación de dispositivos.
 *   - name: Automation
 *     description: Registro automatizado en tiempo real de ingresos, despachos y validaciones físicas mediante cámaras IoT.
 *   - name: Config
 *     description: Gestión de parámetros de configuración y comportamiento operacional de las bodegas.
 *   - name: Dashboard
 *     description: Indicadores estadísticos globales y consolidado operativo del sistema de almacenamiento.
 *   - name: Device
 *     description: Registro, control operativo y monitoreo de estado de cámaras inteligentes de escaneo.
 *   - name: Location
 *     description: Configuración y administración de zonas, racks y ubicaciones físicas de almacenamiento dentro de las bodegas.
 *   - name: Order
 *     description: Creación, seguimiento y flujo de estados de órdenes de entrada y salida de mercadería.
 *   - name: Scan
 *     description: Logs y auditoría histórica de eventos de escaneo de cajas y pallets detectados.
 *   - name: Store
 *     description: Administración de sucursales de destino para despachos y distribución de mercaderías.
 *   - name: Supplier
 *     description: Gestión de catálogo de proveedores y abastecedores asociados a los productos.
 *
 * components:
 *   schemas:
 *     Warehouse:
 *       type: object
 *       description: |
 *         Representa la unidad lógica de almacenamiento (Bodega).
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador único de la bodega | "d3b07384-d113-49cd-a5d7-9c0161a0f209" |
 *         | name | string | - | Nombre de la bodega (3 a 30 caracteres) | "Bodega Central San Salvador" |
 *         | address | string | - | Dirección de la bodega (3 a 250 caracteres) | "Calle el Mirador, #123" |
 *         | created_at | string | date-time | Fecha y hora de creación | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha y hora de última actualización | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *         name:
 *           type: string
 *           example: "Bodega Central San Salvador"
 *         address:
 *           type: string
 *           example: "Calle el Mirador, #123"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Product:
 *       type: object
 *       description: |
 *         Representa un producto en el catálogo general de inventarios.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador único del producto | "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" |
 *         | code | string | - | Código de barras o SKU interno único | "PROD-1002" |
 *         | name | string | - | Nombre descriptivo del producto | "Caja de Leche Deslactosada 1L" |
 *         | category | string | - | Categoría del producto para clasificación | "Lácteos" |
 *         | sku | string | - | Código de inventario único (Stock Keeping Unit) | "SKU-MILK-001" |
 *         | supplier_id | string | uuid | Identificador único del proveedor asociado | "b2b07384-d113-49cd-a5d7-9c0161a0f210" |
 *         | created_at | string | date-time | Fecha y hora de registro del producto | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha y hora de última actualización | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
 *         code:
 *           type: string
 *           example: "PROD-1002"
 *         name:
 *           type: string
 *           example: "Caja de Leche Deslactosada 1L"
 *         category:
 *           type: string
 *           example: "Lácteos"
 *         sku:
 *           type: string
 *           example: "SKU-MILK-001"
 *         supplier_id:
 *           type: string
 *           format: uuid
 *           example: "b2b07384-d113-49cd-a5d7-9c0161a0f210"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Pallet:
 *       type: object
 *       description: |
 *         Representa un pallet que agrupa cajas para almacenamiento y despacho.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador único del pallet | "e4b07384-d113-49cd-a5d7-9c0161a0f211" |
 *         | code | string | - | Código único de control asignado | "P-5501" |
 *         | qrCode | string | - | Código QR único del pallet físico | "PALLET-QR-98765" |
 *         | quantityBox | integer | - | Cantidad de cajas asociadas al pallet | 48 |
 *         | quantityUnitsInBox | integer | - | Unidades de producto contenidas por caja (opcional) | 12 |
 *         | status | string | enum | Estado actual: "CRE" (Creado), "STO" (Almacenado), "PPD" (Despacho Parcial), "DEL" (Entregado), "CAN" (Cancelado) | "CRE" |
 *         | warehouse_id | string | uuid | Identificador único de la bodega donde se ubica | "d3b07384-d113-49cd-a5d7-9c0161a0f209" |
 *         | product_id | string | uuid | Identificador único del producto del pallet | "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" |
 *         | created_at | string | date-time | Fecha y hora de creación | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha y hora de última actualización | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "e4b07384-d113-49cd-a5d7-9c0161a0f211"
 *         code:
 *           type: string
 *           example: "P-5501"
 *         qrCode:
 *           type: string
 *           example: "PALLET-QR-98765"
 *         quantityBox:
 *           type: integer
 *           example: 48
 *         quantityUnitsInBox:
 *           type: integer
 *           nullable: true
 *           example: 12
 *         status:
 *           type: string
 *           enum: ["CRE", "STO", "PPD", "DEL", "CAN"]
 *           example: "CRE"
 *         warehouse_id:
 *           type: string
 *           format: uuid
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *         product_id:
 *           type: string
 *           format: uuid
 *           example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Audit:
 *       type: object
 *       description: |
 *         Historial de auditoría para rastrear acciones CRUD sobre tablas de base de datos.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador único del log de auditoría | "f5b07384-d113-49cd-a5d7-9c0161a0f212" |
 *         | actions | string | enum | Acción realizada: "CRE" (Creación), "UPD" (Modificación), "DEL" (Eliminación) | "CRE" |
 *         | table | string | - | Nombre de la tabla afectada en la base de datos | "warehouses" |
 *         | newValue | object | - | Objeto JSON con los valores después del cambio | { "name": "Bodega Central", "address": "Calle el Mirador" } |
 *         | oldValue | object | - | Objeto JSON con los valores previos al cambio (nulo si es creación) | null |
 *         | user_id | string | uuid | Identificador del usuario que realizó la acción (opcional) | "c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a10" |
 *         | created_at | string | date-time | Fecha y hora de la auditoría | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha y hora de última modificación | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f5b07384-d113-49cd-a5d7-9c0161a0f212"
 *         actions:
 *           type: string
 *           enum: ["CRE", "UPD", "DEL"]
 *           example: "CRE"
 *         table:
 *           type: string
 *           example: "warehouses"
 *         newValue:
 *           type: object
 *           example:
 *             name: "Bodega Central"
 *             address: "Calle el Mirador, #123"
 *         oldValue:
 *           type: object
 *           nullable: true
 *           example: null
 *         user_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a10"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     Role:
 *       type: object
 *       description: |
 *         Rol de usuario para control de acceso basado en roles (RBAC).
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | - | Codigo unico identificador del rol (ej. ADMIN) | "ADMIN" |
 *         | name | string | - | Nombre legible del rol | "Administrador" |
 *         | description | string | - | Descripcion de permisos del rol | "Acceso total al sistema" |
 *         | created_at | string | date-time | Fecha de creacion del rol | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha de ultima actualizacion | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           example: "ADMIN"
 *         name:
 *           type: string
 *           example: "Administrador"
 *         description:
 *           type: string
 *           example: "Acceso total al sistema"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     User:
 *       type: object
 *       description: |
 *         Representa un usuario registrado y autenticado en el sistema.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador unico del usuario | "c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a10" |
 *         | name | string | - | Nombre completo del usuario | "Juan Perez" |
 *         | email | string | email | Correo electronico de acceso unico | "juan.perez@example.com" |
 *         | active | boolean | - | Estado de actividad del usuario | true |
 *         | warehouse_id | string | uuid | ID de bodega asociada (opcional) | "d3b07384-d113-49cd-a5d7-9c0161a0f209" |
 *         | roles | array | - | Lista de roles asignados al usuario | [{"id": "ADMIN"}] |
 *         | created_at | string | date-time | Fecha de registro | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha de ultima modificacion | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a10"
 *         name:
 *           type: string
 *           example: "Juan Perez"
 *         email:
 *           type: string
 *           format: email
 *           example: "juan.perez@example.com"
 *         active:
 *           type: boolean
 *           example: true
 *         warehouse_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *         roles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     Supplier:
 *       type: object
 *       description: |
 *         Representa un proveedor del catalogo de abastecedores.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador unico del proveedor | "b2b07384-d113-49cd-a5d7-9c0161a0f210" |
 *         | name | string | - | Nombre de la empresa del proveedor | "Distribuidora Central S.A." |
 *         | code | string | - | Codigo interno unico del proveedor | "PROV-001" |
 *         | contactName | string | - | Nombre del representante o contacto | "Carlos Gomez" |
 *         | phone | string | - | Telefono de contacto del proveedor | "+503 2200-1122" |
 *         | email | string | email | Correo de contacto oficial | "contacto@central.com" |
 *         | location | string | - | Direccion o ciudad base del proveedor | "San Salvador, El Salvador" |
 *         | created_at | string | date-time | Fecha de creacion del registro | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha de ultima actualizacion | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "b2b07384-d113-49cd-a5d7-9c0161a0f210"
 *         name:
 *           type: string
 *           example: "Distribuidora Central S.A."
 *         code:
 *           type: string
 *           example: "PROV-001"
 *         contactName:
 *           type: string
 *           example: "Carlos Gomez"
 *         phone:
 *           type: string
 *           example: "+503 2200-1122"
 *         email:
 *           type: string
 *           format: email
 *           example: "contacto@central.com"
 *         location:
 *           type: string
 *           example: "San Salvador, El Salvador"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     Location:
 *       type: object
 *       description: |
 *         Representa una ubicacion fisica (racks/zonas) en una bodega.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador unico de la ubicacion | "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a20" |
 *         | zone | string | - | Nombre de la zona o rack (ej. ZONA-A1) | "ZONA-A1" |
 *         | category | string | - | Categoria de almacenamiento | "Refrigerado" |
 *         | warehouse_id | string | uuid | ID de la bodega donde se ubica | "d3b07384-d113-49cd-a5d7-9c0161a0f209" |
 *         | created_at | string | date-time | Fecha de creacion del registro | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha de ultima actualizacion | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a20"
 *         zone:
 *           type: string
 *           example: "ZONA-A1"
 *         category:
 *           type: string
 *           example: "Refrigerado"
 *         warehouse_id:
 *           type: string
 *           format: uuid
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     Box:
 *       type: object
 *       description: |
 *         Caja fisica de productos agrupada en pallets o almacenada individualmente.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador unico de la caja | "75b07384-d113-49cd-a5d7-9c0161a0f214" |
 *         | qrCode | string | - | Codigo QR unico del contenedor fisico | "BOX-QR-12345" |
 *         | code | string | - | Codigo interno asignado por el sistema | "B-001" |
 *         | quantity | integer | - | Cantidad de unidades de producto que contiene | 12 |
 *         | status | string | - | Estado actual de la caja | "CREATED" |
 *         | product_id | string | uuid | ID del producto que contiene | "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" |
 *         | pallet_id | string | uuid | ID del pallet contenedor (opcional) | "e4b07384-d113-49cd-a5d7-9c0161a0f211" |
 *         | warehouse_id | string | uuid | ID de la bodega donde se encuentra | "d3b07384-d113-49cd-a5d7-9c0161a0f209" |
 *         | created_at | string | date-time | Fecha de creacion del registro | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha de ultima actualizacion | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "75b07384-d113-49cd-a5d7-9c0161a0f214"
 *         qrCode:
 *           type: string
 *           example: "BOX-QR-12345"
 *         code:
 *           type: string
 *           nullable: true
 *           example: "B-001"
 *         quantity:
 *           type: integer
 *           example: 12
 *         status:
 *           type: string
 *           example: "CREATED"
 *         product_id:
 *           type: string
 *           format: uuid
 *           example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
 *         pallet_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "e4b07384-d113-49cd-a5d7-9c0161a0f211"
 *         warehouse_id:
 *           type: string
 *           format: uuid
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     Order:
 *       type: object
 *       description: |
 *         Representa una orden de movimiento de mercaderia (entrada o salida).
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador unico de la orden | "85b07384-d113-49cd-a5d7-9c0161a0f215" |
 *         | type | string | enum | Tipo de orden: "IN" (Entrada), "OUT" (Salida) | "IN" |
 *         | unit_type | string | enum | Tipo de embalaje: "BOX" (Caja), "PALLET" (Pallet) | "BOX" |
 *         | total_quantity | integer | - | Cantidad total solicitada en la orden | 100 |
 *         | total_delivered | integer | - | Cantidad de bultos ya ingresados/entregados | 0 |
 *         | total_dispatched | integer | - | Cantidad de bultos ya despachados | 0 |
 *         | status | string | - | Estado actual de la orden | "PENDING" |
 *         | product_id | string | uuid | ID del producto solicitado | "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" |
 *         | origin_warehouse_id | string | uuid | ID de bodega origen (para salidas, opcional) | null |
 *         | destination_warehouse_id | string | uuid | ID de bodega destino (para ingresos, opcional) | "d3b07384-d113-49cd-a5d7-9c0161a0f209" |
 *         | store_id | string | uuid | ID de la sucursal destino (opcional) | null |
 *         | created_at | string | date-time | Fecha de creacion del registro | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha de ultima actualizacion | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "85b07384-d113-49cd-a5d7-9c0161a0f215"
 *         type:
 *           type: string
 *           enum: ["IN", "OUT"]
 *           example: "IN"
 *         unit_type:
 *           type: string
 *           enum: ["BOX", "PALLET"]
 *           example: "BOX"
 *         total_quantity:
 *           type: integer
 *           example: 100
 *         total_delivered:
 *           type: integer
 *           example: 0
 *         total_dispatched:
 *           type: integer
 *           example: 0
 *         status:
 *           type: string
 *           example: "PENDING"
 *         product_id:
 *           type: string
 *           format: uuid
 *           example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
 *         origin_warehouse_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: null
 *         destination_warehouse_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *         store_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: null
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     Camera:
 *       type: object
 *       description: |
 *         Representa una camara inteligente de escaneo del sistema de automatizacion IoT.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador unico de la camara | "95b07384-d113-49cd-a5d7-9c0161a0f216" |
 *         | code | string | - | Codigo operativo de identificacion | "CAM-001" |
 *         | isActive | boolean | - | Estado de actividad de la camara | true |
 *         | location_id | string | uuid | ID de ubicacion fisica asignada (opcional) | "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a20" |
 *         | created_at | string | date-time | Fecha de creacion del registro | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha de ultima actualizacion | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "95b07384-d113-49cd-a5d7-9c0161a0f216"
 *         code:
 *           type: string
 *           example: "CAM-001"
 *         isActive:
 *           type: boolean
 *           example: true
 *         location_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a20"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     ScanEvent:
 *       type: object
 *       description: |
 *         Log historico de un evento de deteccion fisica capturado por las camaras inteligentes.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador unico del evento de escaneo | "05b07384-d113-49cd-a5d7-9c0161a0f217" |
 *         | qrCode | string | - | Codigo QR escaneado del bulto | "BOX-QR-12345" |
 *         | detectedType | string | enum | Tipo de bulto detectado: "BOX" o "PALLET" | "BOX" |
 *         | status | string | - | Resultado del procesamiento (ej. SUCCESS, ERROR) | "SUCCESS" |
 *         | confidence | number | float | Nivel de confianza de lectura (0.00 a 1.00) | 0.98 |
 *         | type | string | enum | Tipo de flujo: "ENTRY" (Ingreso), "EXIT" (Despacho), "VERIFY" (Verificacion) | "ENTRY" |
 *         | errorMessage | string | - | Mensaje en caso de falla o error de escaneo | null |
 *         | itemCode | string | - | Codigo del item asignado tras procesar el QR | "B-001" |
 *         | camera_id | string | uuid | ID de la camara que capturo el evento | "95b07384-d113-49cd-a5d7-9c0161a0f216" |
 *         | product_id | string | uuid | ID del producto asociado | "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" |
 *         | warehouse_id | string | uuid | ID de la bodega donde ocurrio el evento | "d3b07384-d113-49cd-a5d7-9c0161a0f209" |
 *         | order_id | string | uuid | ID de la orden vinculada (opcional) | "85b07384-d113-49cd-a5d7-9c0161a0f215" |
 *         | created_at | string | date-time | Fecha y hora de captura del escaneo | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha de ultima actualizacion | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "05b07384-d113-49cd-a5d7-9c0161a0f217"
 *         qrCode:
 *           type: string
 *           example: "BOX-QR-12345"
 *         detectedType:
 *           type: string
 *           enum: ["BOX", "PALLET"]
 *           example: "BOX"
 *         status:
 *           type: string
 *           example: "SUCCESS"
 *         confidence:
 *           type: number
 *           format: float
 *           example: 0.98
 *         type:
 *           type: string
 *           enum: ["ENTRY", "EXIT", "VERIFY"]
 *           example: "ENTRY"
 *         errorMessage:
 *           type: string
 *           nullable: true
 *           example: null
 *         itemCode:
 *           type: string
 *           nullable: true
 *           example: "B-001"
 *         camera_id:
 *           type: string
 *           format: uuid
 *           example: "95b07384-d113-49cd-a5d7-9c0161a0f216"
 *         product_id:
 *           type: string
 *           format: uuid
 *           example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
 *         warehouse_id:
 *           type: string
 *           format: uuid
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *         order_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "85b07384-d113-49cd-a5d7-9c0161a0f215"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     ConfigParams:
 *       type: object
 *       description: |
 *         Parametros de configuracion interna del comportamiento operativo por bodega.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador del parametro de configuracion | "15b07384-d113-49cd-a5d7-9c0161a0f218" |
 *         | key | string | - | Clave identificadora del parametro | "SCANNING_MODE" |
 *         | value | string | - | Valor configurado para la clave | "ENTRY" |
 *         | warehouse_id | string | uuid | ID de la bodega a la que aplica | "d3b07384-d113-49cd-a5d7-9c0161a0f209" |
 *         | created_at | string | date-time | Fecha de creacion del registro | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha de ultima actualizacion | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "15b07384-d113-49cd-a5d7-9c0161a0f218"
 *         key:
 *           type: string
 *           example: "SCANNING_MODE"
 *         value:
 *           type: string
 *           example: "ENTRY"
 *         warehouse_id:
 *           type: string
 *           format: uuid
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     Store:
 *       type: object
 *       description: |
 *         Representa una sucursal de destino final para el despacho de mercaderias.
 *
 *         ### Campos del Esquema:
 *         | Propiedad | Tipo | Formato | Descripción | Ejemplo |
 *         | :--- | :--- | :--- | :--- | :--- |
 *         | id | string | uuid | Identificador unico de la sucursal | "25b07384-d113-49cd-a5d7-9c0161a0f219" |
 *         | name | string | - | Nombre comercial de la sucursal | "Sucursal Escalon" |
 *         | code | string | - | Codigo identificador de la sucursal | "ST-002" |
 *         | address | string | - | Direccion fisica detallada | "Centro Comercial Galerias, Local 2B" |
 *         | created_at | string | date-time | Fecha de registro en el sistema | "2026-06-19T21:11:44Z" |
 *         | updated_at | string | date-time | Fecha de ultima actualizacion | "2026-06-19T21:11:44Z" |
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "25b07384-d113-49cd-a5d7-9c0161a0f219"
 *         name:
 *           type: string
 *           example: "Sucursal Escalon"
 *         code:
 *           type: string
 *           example: "ST-002"
 *         address:
 *           type: string
 *           example: "Centro Comercial Galerias, Local 2B"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 * paths:
 *   /warehouse/create:
 *     post:
 *       tags: [Warehouse]
 *       summary: Crear una nueva bodega
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - address
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Bodega Central San Salvador"
 *                 address:
 *                   type: string
 *                   example: "Calle el Mirador, #123"
 *       responses:
 *         201:
 *           description: Bodega creada exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Warehouse created successfully" }
 *                   code: { type: string, example: "CREATED" }
 *                   data: { $ref: '#/components/schemas/Warehouse' }
 *         400:
 *           description: Error de validación
 *           content:
 *             application/json:
 *               schema: { $ref: '#/components/schemas/ValidationErrorResponse' }
 *         401:
 *           description: No autorizado
 *         500:
 *           description: Error interno del servidor
 *           content:
 *             application/json:
 *               schema: { $ref: '#/components/schemas/ErrorResponse' }
 *
 *   /warehouse/update:
 *     put:
 *       tags: [Warehouse]
 *       summary: Actualizar una bodega existente
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *                 name:
 *                   type: string
 *                   example: "Bodega Principal"
 *                 address:
 *                   type: string
 *                   example: "Alameda Roosevelt #555"
 *       responses:
 *         200:
 *           description: Bodega actualizada exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Warehouse updated successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { type: array, items: { type: integer }, example: [1] }
 *         400:
 *           description: Error de validación
 *         401:
 *           description: No autorizado
 *         404:
 *           description: Bodega no encontrada
 *         500:
 *           description: Error interno del servidor
 *
 *   /warehouse/search:
 *     post:
 *       tags: [Warehouse]
 *       summary: Buscar y listar bodegas con paginación
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: false
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Bodega"
 *                 address:
 *                   type: string
 *                   example: "San Salvador"
 *                 limit:
 *                   type: integer
 *                   default: 10
 *                 page:
 *                   type: integer
 *                   default: 1
 *       responses:
 *         200:
 *           description: Resultados de la búsqueda
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Warehouse search successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data:
 *                     type: object
 *                     properties:
 *                       items:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Warehouse'
 *                       total:
 *                         type: integer
 *                         example: 1
 *         401:
 *           description: No autorizado
 *         500:
 *           description: Error interno del servidor
 *
 *   /warehouse/{id}:
 *     get:
 *       tags: [Warehouse]
 *       summary: Obtener una bodega por ID
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *       responses:
 *         200:
 *           description: Bodega encontrada
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Warehouse get successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data:
 *                     $ref: '#/components/schemas/Warehouse'
 *         401:
 *           description: No autorizado
 *         404:
 *           description: Bodega no encontrada
 *         500:
 *           description: Error interno del servidor
 *
 *   /warehouse/delete/{id}:
 *     delete:
 *       tags: [Warehouse]
 *       summary: Eliminar una bodega (soft-delete)
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *       responses:
 *         200:
 *           description: Bodega eliminada exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Warehouse deleted successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { type: integer, example: 1 }
 *         401:
 *           description: No autorizado
 *         404:
 *           description: Bodega no encontrada
 *         500:
 *           description: Error interno del servidor
 *
 *   /warehouse/inventory/{locationId}/in/{id}:
 *     get:
 *       tags: [Warehouse]
 *       summary: Listar inventario de una bodega filtrado por ubicación
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: locationId
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a20"
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *       responses:
 *         200:
 *           description: Inventario por ubicación obtenido con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Warehouse inventory get successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { type: object }
 *
 *   /warehouse/structure/{id}:
 *     get:
 *       tags: [Warehouse]
 *       summary: Obtener la estructura lógica de la bodega con sus ubicaciones y cámaras
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "d3b07384-d113-49cd-a5d7-9c0161a0f209"
 *       responses:
 *         200:
 *           description: Estructura de la bodega obtenida con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Warehouse structure get successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { type: object }
 *
 *   /product/create:
 *     post:
 *       tags: [Product]
 *       summary: Crear un nuevo producto
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - code
 *                 - name
 *                 - category
 *                 - sku
 *                 - supplier_id
 *               properties:
 *                 code: { type: string, example: "PROD-1002" }
 *                 name: { type: string, example: "Caja de Leche Deslactosada 1L" }
 *                 category: { type: string, example: "Lácteos" }
 *                 sku: { type: string, example: "SKU-MILK-001" }
 *                 supplier_id: { type: string, format: uuid, example: "b2b07384-d113-49cd-a5d7-9c0161a0f210" }
 *       responses:
 *         201:
 *           description: Producto creado con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Product created successfully" }
 *                   code: { type: string, example: "CREATED" }
 *                   data: { $ref: '#/components/schemas/Product' }
 *         400:
 *           description: Error de validación o SKU duplicado
 *
 *   /product/update:
 *     put:
 *       tags: [Product]
 *       summary: Actualizar un producto existente
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *               properties:
 *                 id: { type: string, format: uuid, example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" }
 *                 code: { type: string, example: "PROD-1002-MOD" }
 *                 name: { type: string, example: "Caja de Leche Deslactosada 1L (Modificada)" }
 *                 category: { type: string, example: "Lácteos" }
 *                 sku: { type: string, example: "SKU-MILK-001-MOD" }
 *                 supplier_id: { type: string, format: uuid, example: "b2b07384-d113-49cd-a5d7-9c0161a0f210" }
 *       responses:
 *         200:
 *           description: Producto actualizado con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Product updated successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { type: array, items: { type: integer }, example: [1] }
 *         400:
 *           description: Error de validación
 *         404:
 *           description: Producto no encontrado
 *
 *   /product/search:
 *     post:
 *       tags: [Product]
 *       summary: Buscar y listar productos con paginación
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: false
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name: { type: string, example: "Leche" }
 *                 code: { type: string, example: "PROD-1002" }
 *                 sku: { type: string, example: "SKU-MILK-001" }
 *                 category: { type: string, example: "Lácteos" }
 *                 supplier_id: { type: string, format: uuid, example: "b2b07384-d113-49cd-a5d7-9c0161a0f210" }
 *                 limit: { type: integer, example: 10 }
 *                 page: { type: integer, example: 1 }
 *       responses:
 *         200:
 *           description: Resultados de la búsqueda
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Product search successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data:
 *                     type: object
 *                     properties:
 *                       items: { type: array, items: { $ref: '#/components/schemas/Product' } }
 *                       total: { type: integer, example: 1 }
 *
 *   /product/find-by-id/{id}:
 *     get:
 *       tags: [Product]
 *       summary: Obtener producto por ID
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
 *       responses:
 *         200:
 *           description: Producto encontrado exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Product retrieved successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { $ref: '#/components/schemas/Product' }
 *         404:
 *           description: Producto no encontrado
 *
 *   /product/delete/{id}:
 *     delete:
 *       tags: [Product]
 *       summary: Eliminar un producto (soft-delete)
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
 *       responses:
 *         200:
 *           description: Producto eliminado exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Product deleted successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { type: integer, example: 1 }
 *         404:
 *           description: Producto no encontrado
 *
 *   /pallet/create:
 *     post:
 *       tags: [Pallet]
 *       summary: Registrar un nuevo pallet
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - code
 *                 - qrCode
 *                 - quantityBox
 *                 - warehouse_id
 *                 - product_id
 *               properties:
 *                 code: { type: string, example: "P-5501" }
 *                 qrCode: { type: string, example: "PALLET-QR-98765" }
 *                 quantityBox: { type: integer, example: 48 }
 *                 quantityUnitsInBox: { type: integer, example: 12 }
 *                 warehouse_id: { type: string, format: uuid, example: "d3b07384-d113-49cd-a5d7-9c0161a0f209" }
 *                 product_id: { type: string, format: uuid, example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" }
 *       responses:
 *         201:
 *           description: Pallet creado exitosamente
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Pallet created successfully" }
 *                   code: { type: string, example: "CREATED" }
 *                   data: { $ref: '#/components/schemas/Pallet' }
 *         400:
 *           description: Error de validación o pallet duplicado
 *
 *   /pallet/update:
 *     put:
 *       tags: [Pallet]
 *       summary: Actualizar datos de un pallet
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *               properties:
 *                 id: { type: string, format: uuid, example: "e4b07384-d113-49cd-a5d7-9c0161a0f211" }
 *                 code: { type: string, example: "P-5501-MOD" }
 *                 qrCode: { type: string, example: "PALLET-QR-98765-MOD" }
 *                 quantityBox: { type: integer, example: 50 }
 *                 status: { type: string, enum: ["CRE", "STO", "PPD", "DEL", "CAN"], example: "STO" }
 *                 warehouse_id: { type: string, format: uuid, example: "d3b07384-d113-49cd-a5d7-9c0161a0f209" }
 *                 product_id: { type: string, format: uuid, example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" }
 *       responses:
 *         200:
 *           description: Pallet actualizado con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Pallet updated successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { type: array, items: { type: integer }, example: [1] }
 *         404:
 *           description: Pallet no encontrado
 *
 *   /pallet/search:
 *     post:
 *       tags: [Pallet]
 *       summary: Buscar y listar pallets con filtros y paginación
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: false
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code: { type: string, example: "P-55" }
 *                 qrCode: { type: string, example: "PALLET-QR" }
 *                 status: { type: string, example: "CRE" }
 *                 warehouse_id: { type: string, format: uuid, example: "d3b07384-d113-49cd-a5d7-9c0161a0f209" }
 *                 product_id: { type: string, format: uuid, example: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11" }
 *                 limit: { type: integer, example: 10 }
 *                 page: { type: integer, example: 1 }
 *       responses:
 *         200:
 *           description: Resultados de búsqueda de pallets
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Pallets search successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data:
 *                     type: object
 *                     properties:
 *                       items: { type: array, items: { $ref: '#/components/schemas/Pallet' } }
 *                       total: { type: integer, example: 1 }
 *
 *   /pallet/find-by-id/{id}:
 *     get:
 *       tags: [Pallet]
 *       summary: Obtener pallet por ID
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "e4b07384-d113-49cd-a5d7-9c0161a0f211"
 *       responses:
 *         200:
 *           description: Pallet obtenido con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Pallet retrieved successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { $ref: '#/components/schemas/Pallet' }
 *         404:
 *           description: Pallet no encontrado
 *
 *   /pallet/find-by-code/{code}:
 *     get:
 *       tags: [Pallet]
 *       summary: Obtener pallet por código de sistema
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: code
 *           required: true
 *           schema:
 *             type: string
 *           example: "P-5501"
 *       responses:
 *         200:
 *           description: Pallet obtenido con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Pallet retrieved successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { $ref: '#/components/schemas/Pallet' }
 *         404:
 *           description: Pallet no encontrado
 *
 *   /pallet/delete/{id}:
 *     delete:
 *       tags: [Pallet]
 *       summary: Eliminar un pallet (soft-delete)
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "e4b07384-d113-49cd-a5d7-9c0161a0f211"
 *       responses:
 *         200:
 *           description: Pallet eliminado con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Pallet deleted successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { type: integer, example: 1 }
 *         404:
 *           description: Pallet no encontrado
 *
 *   /audit/create:
 *     post:
 *       tags: [Audit]
 *       summary: Registrar un log de auditoría manualmente
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - actions
 *                 - table
 *                 - newValue
 *               properties:
 *                 actions: { type: string, enum: ["CRE", "UPD", "DEL"], example: "CRE" }
 *                 table: { type: string, example: "warehouses" }
 *                 newValue: { type: object, example: { "name": "Bodega Principal" } }
 *                 oldValue: { type: object, example: null }
 *                 user_id: { type: string, format: uuid, example: "c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a10" }
 *       responses:
 *         201:
 *           description: Log de auditoría creado con éxito
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Audit log created successfully" }
 *                   code: { type: string, example: "CREATED" }
 *                   data: { $ref: '#/components/schemas/Audit' }
 *
 *   /audit/update:
 *     put:
 *       tags: [Audit]
 *       summary: Actualizar un log de auditoría existente
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *               properties:
 *                 id: { type: string, format: uuid, example: "f5b07384-d113-49cd-a5d7-9c0161a0f212" }
 *                 actions: { type: string, enum: ["CRE", "UPD", "DEL"], example: "UPD" }
 *                 table: { type: string, example: "warehouses" }
 *                 newValue: { type: object, example: { "name": "Bodega Principal Actualizada" } }
 *       responses:
 *         200:
 *           description: Log de auditoría actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Audit log updated successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { type: array, items: { type: integer }, example: [1] }
 *
 *   /audit/search:
 *     post:
 *       tags: [Audit]
 *       summary: Buscar logs de auditoría con filtros y paginación
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: false
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 actions: { type: string, example: "CRE" }
 *                 table: { type: string, example: "warehouses" }
 *                 user_id: { type: string, format: uuid, example: "c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a10" }
 *                 limit: { type: integer, example: 10 }
 *                 page: { type: integer, example: 1 }
 *       responses:
 *         200:
 *           description: Listado de logs de auditoría
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Audits search successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data:
 *                     type: object
 *                     properties:
 *                       items: { type: array, items: { $ref: '#/components/schemas/Audit' } }
 *                       total: { type: integer, example: 1 }
 *
 *   /audit/find-by-id/{id}:
 *     get:
 *       tags: [Audit]
 *       summary: Obtener log de auditoría por ID
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "f5b07384-d113-49cd-a5d7-9c0161a0f212"
 *       responses:
 *         200:
 *           description: Log de auditoría recuperado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Audit log retrieved successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { $ref: '#/components/schemas/Audit' }
 *         404:
 *           description: Log de auditoría no encontrado
 *
 *   /audit/delete/{id}:
 *     delete:
 *       tags: [Audit]
 *       summary: Eliminar log de auditoría
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           example: "f5b07384-d113-49cd-a5d7-9c0161a0f212"
 *       responses:
 *         200:
 *           description: Log de auditoría eliminado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success: { type: boolean, example: true }
 *                   message: { type: string, example: "Audit log deleted successfully" }
 *                   code: { type: string, example: "OK" }
 *                   data: { type: integer, example: 1 }
 *         404:
 *           description: Log no encontrado
 */

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
    tags: [
      {
        name: "Warehouse",
        description: "Operaciones de gestion de inventario, configuracion y estructura de bodegas."
      },
      {
        name: "Product",
        description: "Operaciones de gestion y catalogo general de productos."
      },
      {
        name: "Pallet",
        description: "Operaciones de registro, actualizacion, busqueda y control de pallets."
      },
      {
        name: "Audit",
        description: "Log de auditoria del sistema para rastreo de operaciones de base de datos."
      },
      {
        name: "Auth",
        description: "Operaciones de autenticacion de usuarios, renovacion de tokens y vinculacion de dispositivos."
      },
      {
        name: "Automation",
        description: "Registro automatizado en tiempo real de ingresos, despachos y validaciones fisicas mediante camaras IoT."
      },
      {
        name: "Config",
        description: "Gestion de parametros de configuracion y comportamiento operacional de las bodegas."
      },
      {
        name: "Dashboard",
        description: "Indicadores estadisticos globales y consolidado operativo del sistema de almacenamiento."
      },
      {
        name: "Device",
        description: "Registro, control operativo y monitoreo de estado de camaras inteligentes de escaneo."
      },
      {
        name: "Location",
        description: "Configuracion y administracion de zonas, racks y ubicaciones fisicas de almacenamiento dentro de las bodegas."
      },
      {
        name: "Order",
        description: "Creacion, seguimiento y flujo de estados de ordenes de entrada y salida de mercaderia."
      },
      {
        name: "Scan",
        description: "Logs y auditoria historica de eventos de escaneo de cajas y pallets detectados."
      },
      {
        name: "Store",
        description: "Administracion de sucursales de destino para despachos y distribucion de mercaderias."
      },
      {
        name: "Supplier",
        description: "Gestion de catalogo de proveedores y abastecedores asociados a los productos."
      }
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
  apis: ["./src/docs/swagger.js", "./src/docs/paths/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);

