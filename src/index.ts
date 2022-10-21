import app from '@app';
import Logger from '@configs/logger';
import env from '@configs/env';

const { PORT } = env;

const port = PORT || 3000;

app.listen(port, () => {
    Logger.info(`Server started on port ${port}.`);
});
