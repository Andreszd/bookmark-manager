import { Server } from './server';
import { webUrlRoutes } from './routes/urls.route';
import { Database } from './db/database';
import { groupRoutes } from './routes/groups.route';

const app = Server.getInstance();
const database = new Database();

database.run();

/* routes defintion */

app.setRoute('/api/url', webUrlRoutes);
app.setRoute('/api/group', groupRoutes);

/* middlewares definition */

app.defineMiddlewares();

app.run();
