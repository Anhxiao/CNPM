import express from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import projectRoutes from "./project.routes.js";
import taskRoutes from "./task.routes.js";
import notificationRoutes from "./notification.routes.js";
import calendarRoutes from "./calendar.routes.js";
import statisticsRoutes from "./statistics.routes.js";
import uploadRoutes from "./upload.routes.js";

const router = express.Router();

router.use("/upload",uploadRoutes);

router.use(

    "/statistics",

    statisticsRoutes

);

router.use(

    "/notifications",

    notificationRoutes

);

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/projects", projectRoutes);

router.use("/tasks", taskRoutes);

export default router;