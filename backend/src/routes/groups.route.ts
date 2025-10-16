import { GroupsController } from '../controllers/groups.controller';
import { checkAuthentication } from '../middlewares/auth-check.middleware';
import { Server } from '../server';

const app = Server.getInstance();
const router = app.getRouter();

router.get('/', checkAuthentication, GroupsController.getAll);
router.post('/', checkAuthentication, GroupsController.create);
router.put('/:id', checkAuthentication, GroupsController.update);
router.get('/:id', checkAuthentication, GroupsController.getById);
router.delete('/:id', checkAuthentication, GroupsController.remove);

export const groupRoutes = router;
