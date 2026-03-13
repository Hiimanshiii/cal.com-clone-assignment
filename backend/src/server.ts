import 'dotenv/config';
import app from './app';

import { runMigration } from './db';

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await runMigration();
});