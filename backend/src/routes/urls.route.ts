import { Server } from "../server";
import { UrlsController } from "../controllers/urls.controller";

const app = Server.getInstance();
const router = app.getRouter();

router.get("/", UrlsController.getAll);
router.post("/", UrlsController.create);
router.put("/:id", UrlsController.update);
router.get("/:id", UrlsController.getById);
router.delete("/:id", UrlsController.remove);

export const webUrlRoutes = router;
