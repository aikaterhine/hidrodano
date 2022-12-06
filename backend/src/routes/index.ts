import { Router } from 'express';

import TablesController from '../controllers/TablesController';
import QueryController from '../controllers/QueryController';

const routes = Router();
const tablesController = new TablesController();
const queryController = new QueryController();

// Retorna feições da tabela de barragens do banco
routes.get('/barragens', tablesController.getBarragens);

// Retorna feições da tabela de barragens do banco dado um id
routes.get('/barragens/id', tablesController.getBarragemById);

// Resultados da query realizada
routes.get('/barragens/minimum_path', queryController.getMinimumPath);

export default routes;