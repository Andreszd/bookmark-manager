import { Server } from '../server';
import { UrlsController } from '../controllers/urls.controller';
import { checkAuthentication } from '../middlewares/auth-check.middleware';

const app = Server.getInstance();
const router = app.getRouter();

router.get('/', checkAuthentication, UrlsController.getAll);
router.post('/', checkAuthentication, UrlsController.create);
router.patch('/:id', checkAuthentication, UrlsController.update);
router.get('/:id', checkAuthentication, UrlsController.getById);
router.delete('/multiple', checkAuthentication, UrlsController.removeMultiple);
router.delete('/:id', checkAuthentication, UrlsController.remove);

export const webUrlRoutes = router;
