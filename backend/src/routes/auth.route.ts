import { AuthController } from '../controllers/auth.controller';
import { Server } from '../server';

const app = Server.getInstance();
const router = app.getRouter();

router.post('/', AuthController.auth);

export const authRoutes = router;
