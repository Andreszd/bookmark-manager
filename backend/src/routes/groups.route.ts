import { GroupsController } from '../controllers/groups.controller';
import { Server } from '../server';

const app = Server.getInstance();
const router = app.getRouter();

router.get('/', GroupsController.getAll);
router.post('/', GroupsController.create);
router.put('/:id', GroupsController.update);
router.get('/:id', GroupsController.getById);
router.delete('/:id', GroupsController.remove);

export const groupRoutes = router;
