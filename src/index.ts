
import express from 'express';
import dotenv from 'dotenv';
import { getPool } from './db/config.js'; //  DB connection
import patientRoutes from './router/patients.routes'; 
import conditionsRoutes from './router/conditions.routes';
import patientConditionsRoutes from './router/patientconditions.routes';
import vitalRangesRoutes from './router/vitalranges.routes';
import vitalRecordsRoutes from './router/vitalrecords.routes';
import medicationsRoutes from './router/medications.routes';
import patientMedicationsRoutes from './router/patientsmedications.routes';
import medicationLogsRoutes from './router/medications.routes';



dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: parse JSON request bodies
app.use(express.json());

// Root route (health check)
app.get('/', (_req, res) => {
  res.send('Hello, Express API is running...');
});

// Mount other routes
app.use('/patients', patientRoutes);
app.use('/conditions', conditionsRoutes);
app.use('/patient-conditions', patientConditionsRoutes);
app.use('/vital-ranges', vitalRangesRoutes);
app.use('/vital-records', vitalRecordsRoutes);
app.use('/medications', medicationsRoutes);
app.use('/patient-medications', patientMedicationsRoutes);
app.use('/medication-logs', medicationLogsRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Connect to the database
getPool()
  .then(() => console.log('Database connected successfully'))
  .catch((err: any) => console.error('Database connection failed', err));
