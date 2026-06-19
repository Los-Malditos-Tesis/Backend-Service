import express from "express";
import "./libs/mqtt/mqtt_subscriber.js";
import syncDatabase from "../src/libs/database/sync.sequelize.js";
import { contextMiddleware } from "./middlewares/context_middleware.js";
import { globalErrorHandler } from "./errors/global_error_handler.js";
import { config } from "./config/config.js";
import router from "./route/index.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

const app = express();
syncDatabase();

app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(contextMiddleware);

// Exponer la documentación de Swagger con opciones personalizadas
const swaggerOptions = {
  customCss: `
    .swagger-ui .topbar { display: none !important; }
    .swagger-ui .opblock-summary-path { font-weight: bold; }
    
    /* Reset & Overall Background */
    body {
      background-color: #0b0f19 !important;
      color: #e2e8f0 !important;
    }
    .swagger-ui {
      background-color: #0b0f19 !important;
      color: #e2e8f0 !important;
    }
    .swagger-ui .info {
      margin: 20px 0 !important;
      color: #e2e8f0 !important;
    }
    .swagger-ui .info .title,
    .swagger-ui .info p,
    .swagger-ui .info li,
    .swagger-ui .info h1,
    .swagger-ui .info h2,
    .swagger-ui .info h3,
    .swagger-ui .info h4,
    .swagger-ui .info h5 {
      color: #f1f5f9 !important;
    }
    .swagger-ui .info a {
      color: #3b82f6 !important;
    }

    /* Schemes & Authorize Section */
    .swagger-ui .scheme-container {
      background-color: #111827 !important;
      border: 1px solid #1f2937 !important;
      box-shadow: none !important;
      padding: 15px !important;
      border-radius: 8px !important;
      margin-bottom: 20px !important;
      color: #e2e8f0 !important;
    }
    .swagger-ui .scheme-container .schemes-title {
      color: #f1f5f9 !important;
    }
    .swagger-ui .scheme-container label {
      color: #94a3b8 !important;
    }
    .swagger-ui .scheme-container select {
      background-color: #1f2937 !important;
      color: #e2e8f0 !important;
      border: 1px solid #374151 !important;
      border-radius: 4px !important;
      padding: 5px !important;
    }

    /* Buttons */
    .swagger-ui .btn {
      background-color: #1f2937 !important;
      color: #e2e8f0 !important;
      border: 1px solid #374151 !important;
      border-radius: 4px !important;
      transition: all 0.2s ease !important;
    }
    .swagger-ui .btn:hover {
      background-color: #374151 !important;
      color: #fff !important;
    }
    .swagger-ui .btn.authorize {
      background-color: #047857 !important;
      border-color: #047857 !important;
      color: #fff !important;
    }
    .swagger-ui .btn.authorize:hover {
      background-color: #059669 !important;
    }
    .swagger-ui .btn.authorize svg {
      fill: #fff !important;
    }
    .swagger-ui .btn.execute {
      background-color: #1d4ed8 !important;
      border-color: #1d4ed8 !important;
      color: #fff !important;
      font-weight: bold !important;
    }
    .swagger-ui .btn.execute:hover {
      background-color: #2563eb !important;
    }

    /* Filter Input */
    .swagger-ui .filter .operation-filter-input {
      background-color: #111827 !important;
      color: #e2e8f0 !important;
      border: 1px solid #1f2937 !important;
      border-radius: 6px !important;
      padding: 10px !important;
    }

    /* Section Tag Headers */
    .swagger-ui .opblock-tag {
      color: #f1f5f9 !important;
      border-bottom: 1px solid #1f2937 !important;
      font-family: sans-serif !important;
    }
    .swagger-ui .opblock-tag small {
      color: #94a3b8 !important;
    }
    .swagger-ui .opblock-tag:hover {
      background-color: #111827 !important;
    }

    /* Endpoint Blocks (Opblocks) */
    .swagger-ui .opblock {
      background-color: #111827 !important;
      border: 1px solid #1f2937 !important;
      border-radius: 8px !important;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2) !important;
      margin-bottom: 12px !important;
      overflow: hidden !important;
    }
    .swagger-ui .opblock:hover {
      background-color: #182235 !important;
    }
    
    /* Specific Opblock Borders based on method */
    .swagger-ui .opblock.opblock-get { border-color: #2563eb !important; }
    .swagger-ui .opblock.opblock-post { border-color: #059669 !important; }
    .swagger-ui .opblock.opblock-put { border-color: #d97706 !important; }
    .swagger-ui .opblock.opblock-delete { border-color: #dc2626 !important; }
    .swagger-ui .opblock.opblock-patch { border-color: #7c3aed !important; }

    /* Summary Bar */
    .swagger-ui .opblock .opblock-summary {
      background-color: #111827 !important;
      border-bottom: 1px solid #1f2937 !important;
      padding: 10px 20px !important;
    }
    .swagger-ui .opblock .opblock-summary-path {
      color: #f1f5f9 !important;
      font-weight: 600 !important;
    }
    .swagger-ui .opblock .opblock-summary-description {
      color: #94a3b8 !important;
    }

    /* Method Chips (Keep Vibrant Native Colors) */
    .swagger-ui .opblock .opblock-summary-method {
      border-radius: 4px !important;
      color: #ffffff !important;
      font-weight: bold !important;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2) !important;
    }
    .swagger-ui .opblock-get .opblock-summary-method { background-color: #2563eb !important; }
    .swagger-ui .opblock-post .opblock-summary-method { background-color: #059669 !important; }
    .swagger-ui .opblock-put .opblock-summary-method { background-color: #d97706 !important; }
    .swagger-ui .opblock-delete .opblock-summary-method { background-color: #dc2626 !important; }
    .swagger-ui .opblock-patch .opblock-summary-method { background-color: #7c3aed !important; }

    /* Opblock expanded body */
    .swagger-ui .opblock-body {
      background-color: #111827 !important;
    }
    .swagger-ui .opblock .opblock-section-header {
      background-color: #0b0f19 !important;
      border-bottom: 1px solid #1f2937 !important;
      border-top: 1px solid #1f2937 !important;
      padding: 10px 20px !important;
    }
    .swagger-ui .opblock .opblock-section-header h4 {
      color: #f1f5f9 !important;
    }

    /* Parameters & Request Body Tables */
    .swagger-ui table thead tr td, 
    .swagger-ui table thead tr th {
      color: #f1f5f9 !important;
      border-bottom: 1px solid #1f2937 !important;
      background-color: #0b0f19 !important;
    }
    .swagger-ui table tbody tr td {
      background-color: #111827 !important;
      border-bottom: 1px solid #1f2937 !important;
    }
    .swagger-ui .parameters-col_name {
      color: #f1f5f9 !important;
    }
    .swagger-ui .parameter__name {
      color: #e2e8f0 !important;
    }
    .swagger-ui .parameter__name.required {
      color: #ef4444 !important;
    }
    .swagger-ui .parameter__type {
      color: #60a5fa !important;
    }
    .swagger-ui .parameter__in {
      color: #94a3b8 !important;
    }
    
    /* Markdown inside tables and descriptions */
    .swagger-ui .renderedMarkdown table {
      border: 1px solid #1f2937 !important;
      border-collapse: collapse !important;
      width: 100% !important;
    }
    .swagger-ui .renderedMarkdown th,
    .swagger-ui .renderedMarkdown td {
      border: 1px solid #1f2937 !important;
      padding: 8px !important;
      background-color: #0b0f19 !important;
      color: #e2e8f0 !important;
    }
    .swagger-ui .renderedMarkdown tr:nth-child(even) td {
      background-color: #111827 !important;
    }

    /* Code Blocks & Pre */
    .swagger-ui .opblock-body pre {
      background-color: #0b0f19 !important;
      color: #e2e8f0 !important;
      border: 1px solid #1f2937 !important;
      border-radius: 6px !important;
    }
    .swagger-ui .opblock-body pre.microlight {
      background-color: #0b0f19 !important;
    }
    .swagger-ui .highlight-code pre {
      background-color: #0b0f19 !important;
      color: #e2e8f0 !important;
    }

    /* Input Fields (Textareas, Textboxes, Selects) */
    .swagger-ui input[type=text],
    .swagger-ui textarea,
    .swagger-ui select {
      background-color: #1f2937 !important;
      color: #f1f5f9 !important;
      border: 1px solid #374151 !important;
      border-radius: 4px !important;
      padding: 6px 10px !important;
      outline: none !important;
    }
    .swagger-ui input[type=text]:focus,
    .swagger-ui textarea:focus,
    .swagger-ui select:focus {
      border-color: #3b82f6 !important;
      background-color: #374151 !important;
    }
    .swagger-ui .parameter__extension, 
    .swagger-ui .parameter__in {
      color: #94a3b8 !important;
      font-style: italic !important;
    }

    /* Responses Section */
    .swagger-ui .responses-inner {
      background-color: #111827 !important;
    }
    .swagger-ui .responses-inner h4, 
    .swagger-ui .responses-inner h5 {
      color: #f1f5f9 !important;
    }
    .swagger-ui .response-col_status {
      color: #f1f5f9 !important;
      font-weight: bold !important;
    }
    .swagger-ui .response-col_links {
      color: #94a3b8 !important;
    }

    /* Tab controls (Example Value / Model switcher) */
    .swagger-ui .tabli {
      color: #94a3b8 !important;
      border-right: 1px solid #1f2937 !important;
    }
    .swagger-ui .tabli.active {
      color: #f1f5f9 !important;
      font-weight: bold !important;
      border-bottom: 2px solid #3b82f6 !important;
    }
    .swagger-ui .tabli:hover {
      color: #e2e8f0 !important;
    }

    /* Models & Schemas Section at bottom */
    .swagger-ui section.models {
      background-color: #111827 !important;
      border: 1px solid #1f2937 !important;
      border-radius: 8px !important;
      margin-top: 30px !important;
      padding: 10px !important;
    }
    .swagger-ui section.models.is-open {
      padding: 15px !important;
    }
    .swagger-ui section.models.is-open h4 {
      border-bottom: 1px solid #1f2937 !important;
      color: #f1f5f9 !important;
      margin-bottom: 15px !important;
    }
    .swagger-ui section.models h4 svg {
      fill: #f1f5f9 !important;
    }
    .swagger-ui .model-box {
      background-color: #0b0f19 !important;
      border: 1px solid #1f2937 !important;
      border-radius: 6px !important;
      padding: 10px !important;
      color: #e2e8f0 !important;
    }
    .swagger-ui .model {
      color: #e2e8f0 !important;
      background-color: transparent !important;
    }
    .swagger-ui .model-title {
      color: #f1f5f9 !important;
      font-weight: bold !important;
    }
    .swagger-ui .prop-type {
      color: #60a5fa !important;
    }
    .swagger-ui .prop-format {
      color: #94a3b8 !important;
    }
    .swagger-ui .prop-name {
      color: #e2e8f0 !important;
    }
    .swagger-ui .model-toggle {
      fill: #e2e8f0 !important;
    }

    /* Auth Dialog Popups */
    .swagger-ui .dialog-ux .modal-ux {
      background-color: #111827 !important;
      border: 1px solid #1f2937 !important;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5) !important;
      border-radius: 10px !important;
    }
    .swagger-ui .dialog-ux .modal-ux-header {
      border-bottom: 1px solid #1f2937 !important;
      padding: 15px 20px !important;
    }
    .swagger-ui .dialog-ux .modal-ux-header h3 {
      color: #f1f5f9 !important;
    }
    .swagger-ui .dialog-ux .modal-ux-header .close-modal {
      fill: #94a3b8 !important;
    }
    .swagger-ui .dialog-ux .modal-ux-content {
      padding: 20px !important;
    }
    .swagger-ui .dialog-ux .modal-ux-content h4 {
      color: #f1f5f9 !important;
    }
    .swagger-ui .dialog-ux .modal-ux-content p {
      color: #94a3b8 !important;
    }
    .swagger-ui .dialog-ux .modal-ux-content input {
      background-color: #1f2937 !important;
      color: #f1f5f9 !important;
      border: 1px solid #374151 !important;
      border-radius: 4px !important;
    }
    .swagger-ui .dialog-ux .modal-ux-content .auth-container {
      border-bottom: 1px solid #1f2937 !important;
      padding-bottom: 15px !important;
      margin-bottom: 15px !important;
    }
  `,
  customSiteTitle: "Tesis - API Documentation",
  swaggerOptions: {
    docExpansion: 'list', // Mantiene los endpoints colapsados al inicio
    filter: true,         // Activa el buscador visual
    displayRequestDuration: true, // Útil para que el jurado vea el rendimiento
  }
};

app.use(`${config.basePath}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

app.use(config.basePath, router);
app.use(globalErrorHandler);

export default app;

