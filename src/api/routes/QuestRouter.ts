import Router from 'express-promise-router';
import { container } from 'tsyringe';



import { QuestController } from '@api/controllers';
import { PageRpp, QuestCreate } from '@api/dtos';
import { auth, upload, validateBody, validateQuery } from '@api/middleware';

const questRouter = Router();

const questController = container.resolve(QuestController);

questRouter.post('/', validateBody(QuestCreate), auth, questController.createQuest);

questRouter.get('/', validateQuery(PageRpp), questController.getQuests);

questRouter.get('/:questId/:userId', questController.getUserQuest);

questRouter.delete('/:questId', questController.deleteQuest);

questRouter.get('/count', questController.countQuestsByUserId);

questRouter.get('/:questId', questController.getQuest);

questRouter.get('/completed/:userId', questController.getCompletedUserQuests);

questRouter.put('/:questId', validateBody(QuestCreate), questController.editQuest);

questRouter.get('/disable/:stationId', questController.disableQuest);

questRouter.get('/enable/:stationId', questController.enableQuest);

questRouter.post('/closest', validateQuery(PageRpp), questController.getClosestQuests);

export { questRouter };