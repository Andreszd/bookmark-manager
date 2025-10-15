import { Server } from './server';
import { webUrlRoutes } from './routes/urls.route';
import { Database } from './db/database';
import { groupRoutes } from './routes/groups.route';
import { userRoutes } from './routes/user.route';

const app = Server.getInstance();
const database = new Database();

database.run();

/* routes defintion */

app.setRoute('/api/url', webUrlRoutes);
app.setRoute('/api/group', groupRoutes);
app.setRoute('/api/user', userRoutes);

/* middlewares definition */

app.defineMiddlewares();

app.run();
