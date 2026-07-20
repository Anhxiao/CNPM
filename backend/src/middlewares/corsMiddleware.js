import cors from "cors";

import { corsOptions } from "../config/cors.js";

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;