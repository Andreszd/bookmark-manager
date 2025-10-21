import { UserController } from '../controllers/user.controller';
import { checkAuthentication } from '../middlewares/auth-check.middleware';
import { Server } from '../server';

const app = Server.getInstance();
const router = app.getRouter();

router.post('/', UserController.create);
router.get('/:id', UserController.getById);
router.get('/', checkAuthentication, UserController.getSession);

export const userRoutes = router;
