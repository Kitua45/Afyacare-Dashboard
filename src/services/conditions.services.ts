
import { conditionsRepository } from '../repositories/conditions.repository';
import { Condition } from '../Types/condition.types';

export const conditionsService = {
  createCondition: async (conditionData: Omit<Condition, 'ConditionID'>): Promise<number> => {
    return await conditionsRepository.create(conditionData);
  },

  getConditionById: async (id: number): Promise<Condition> => {
    const condition = await conditionsRepository.getById(id);
    if (!condition) throw new Error(`Condition with ID ${id} not found`);
    return condition;
  },

  updateCondition: async (id: number, conditionData: Omit<Condition, 'ConditionID'>): Promise<void> => {
    const existing = await conditionsRepository.getById(id);
    if (!existing) throw new Error(`Condition with ID ${id} not found`);
    await conditionsRepository.update(id, conditionData);
  },

  deleteCondition: async (id: number): Promise<void> => {
    const existing = await conditionsRepository.getById(id);
    if (!existing) throw new Error(`Condition with ID ${id} not found`);
    await conditionsRepository.delete(id);
  },

  getAllConditions: async (): Promise<Condition[]> => {
    return await conditionsRepository.getAll();
  }
};
