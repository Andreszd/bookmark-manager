import { UserController } from '../controllers/user.controller';
import { Server } from '../server';

const app = Server.getInstance();
const router = app.getRouter();

router.post('/', UserController.create);
router.get('/:id', UserController.getById);

export const userRoutes = router;
