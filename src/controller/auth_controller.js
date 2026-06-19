import { loginUser, registerUser } from "../service/auth_service.js";
import { authCamera } from "../service/camera_service.js";
import { Log } from "../libs/logger/logger.js";
import {
  obfuscateApiKey,
  obfuscatePass,
  obfuscateRoles,
  obfuscateToken,
} from "../utils/obfuscate/obfucates.js";
import { consoleKeys } from "../libs/logger/console/constant.js";
import { registerUserDto } from "../dto/register_user_dto.js";
import { generalResponse } from "../utils/handler/response_handler.js";
import { CODES } from "../utils/const/codes.js";

const authController = "auth controller: ";

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar un nuevo usuario.
 *     description: Permite registrar un nuevo usuario en la plataforma asignándole roles y opcionalmente una bodega asociada. Requiere rol SUPERADMIN.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre completo del usuario.
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico único de acceso.
 *                 example: juan.perez@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: SecurePassword123!
 *               warehouse_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID de la bodega a la que pertenece el usuario (opcional).
 *                 example: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
 *               roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de IDs de roles a asignar (ej. ADMIN, VIEWER).
 *                 example: ["ADMIN"]
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericResponse'
 *       400:
 *         description: Parámetros inválidos o usuario ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: No autorizado (token JWT faltante o inválido).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado (requiere rol de SUPERADMIN).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const registerController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      obfuscatePass(req.body),
    );
    const serviceResp = await registerUser(req.ctx, req.body);

    const resp = registerUserDto(serviceResp.toJSON());
    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      resp,
    );

    return generalResponse(
      res,
      201,
      CODES.SUCCESS.CREATED,
      "User registered successfully",
      resp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, authController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, authController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión de usuario.
 *     description: Autentica un usuario en el sistema con credenciales estándar y retorna un token JWT firmado junto con el perfil del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario.
 *                 example: juan.perez@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña asociada a la cuenta.
 *                 example: SecurePassword123!
 *     responses:
 *       200:
 *         description: Autenticación exitosa. Retorna el token de acceso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Validación fallida en la petición.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Credenciales incorrectas o usuario inactivo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const loginController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      obfuscatePass(req.body),
    );
    const serviceResp = await loginUser(req.ctx, req.body);

    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      obfuscateToken(serviceResp),
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "User logged in successfully",
      serviceResp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, authController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, authController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /auth/login/camera:
 *   post:
 *     tags: [Auth]
 *     summary: Autenticar cámara inteligente.
 *     description: Autentica una cámara de escaneo IoT usando su código único y clave API (api_key) para obtener un token JWT de cámara.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - api_key
 *             properties:
 *               code:
 *                 type: string
 *                 description: Código de identificación de la cámara.
 *                 example: CAM-001
 *               api_key:
 *                 type: string
 *                 description: Clave API secreta de la cámara.
 *                 example: camera_secret_key_123
 *     responses:
 *       200:
 *         description: Cámara autenticada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Camera logged in successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Petición incorrecta o parámetros faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Clave API o código incorrectos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const loginCameraController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.StartKey,
      consoleKeys.RequestKey,
      obfuscateApiKey(req.body),
    );
    const serviceResp = await authCamera(req.body, req.ctx);

    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.SuccessKey,
      consoleKeys.ResponseKey,
      obfuscateToken(serviceResp),
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "Camera logged in successfully",
      serviceResp,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, authController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, authController + consoleKeys.FinishKey);
  }
};

/**
 * @openapi
 * /auth/get-me:
 *   get:
 *     tags: [Auth]
 *     summary: Obtener perfil del usuario autenticado.
 *     description: Recupera los detalles del usuario y sus roles a partir del token JWT proporcionado en los encabezados.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil de usuario recuperado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User retrieved successfully
 *                 code:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido o no suministrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const getMeController = async (req, res, next) => {
  try {
    Log.infoCtx(
      req.ctx,
      authController + consoleKeys.StartKey,
      consoleKeys.InformationKey,
      obfuscateRoles(req.user.toJSON()),
    );

    return generalResponse(
      res,
      200,
      CODES.SUCCESS.OK,
      "User retrieved successfully",
      req.user,
    );
  } catch (e) {
    Log.errorCtx(req.ctx, authController + consoleKeys.FailKey, e);
    next(e);
  } finally {
    Log.infoCtx(req.ctx, authController + consoleKeys.FinishKey);
  }
};

