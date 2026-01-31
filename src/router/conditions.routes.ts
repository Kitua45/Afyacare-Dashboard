// src/routes/conditionsRoutes.ts
import { Router } from 'express';
import { conditionsController } from '../controllers/conditions.controllers';

const router = Router();

// Routes
router.post('/', conditionsController.createCondition);       // Create
router.get('/:id', conditionsController.getConditionById);    // Get by ID
router.put('/:id', conditionsController.updateCondition);     // Update
router.delete('/:id', conditionsController.deleteCondition);  // Delete
router.get('/', conditionsController.getAllConditions);       // Get all

export default router;
