import { Router } from 'express';
import { HabitController } from '../controllers/habits.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { HabitEventsController } from '../controllers/habitEvents.controller';

const router = Router();

router.use(authMiddleware);

// === Habit Routes ===
router.post('/create', HabitController.createHabit);
router.get('/all', HabitController.getAllHabits);
router.get('/:id', HabitController.getHabitById);
router.put('/:id', HabitController.updateHabit);
router.delete('/:id', HabitController.deleteHabit);
router.post('/:id/check-in', HabitController.checkInHabit);
router.post('/:id/archive', HabitController.archiveHabit);
router.post('/:id/unarchive', HabitController.unarchiveHabit);
router.get('/frequency/:frequency', HabitController.getHabitsByFrequency);
router.get('/archived', HabitController.getArchivedHabits);
router.get('/count', HabitController.getHabitCount);
router.get('/archived/count', HabitController.getArchivedHabitCount);
router.get('/habit/:name', HabitController.getHabitByName);
router.get('/search', HabitController.searchHabits);
router.get('/events', HabitEventsController.getHabitEventsByUser);
router.get('/events/all', HabitEventsController.getAllHabitEvents);
router.get('/events/habit/:habitId', HabitEventsController.getEventsByHabitId);
router.get('/events/filter', HabitEventsController.filterHabitEvents);
router.delete('/events/:eventId', HabitEventsController.deleteHabitEvent);

export default router;
