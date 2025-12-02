import { AuthController } from '../controllers/auth.controller';
import { Server } from '../server';

const app = Server.getInstance();
const router = app.getRouter();

router.post('/', AuthController.auth);
router.post('/google', AuthController.authGoogle);
router.get('/status', AuthController.status);

export const authRoutes = router;
