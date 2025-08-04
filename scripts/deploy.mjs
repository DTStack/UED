import { chalk, $, question, echo } from 'zx';

const errorLog = (str) => console.log(chalk.redBright(str));
const infoLog = (str) => console.log(chalk.whiteBright(str));
const doneLog = (str = '') => console.log(chalk.greenBright(str ? str : '✔ DONE!'));

const assert = (validation, str) => {
    if (!validation) {
        errorLog(str);
        process.exit(1);
    }
};
$.verbose = false;

(async () => {
    infoLog('1. Bump version');
    const lastVersion = require('../package.json').version;
    const nextVersion = await question(`Input the next version(current version is ${lastVersion}): `);

    infoLog(`2. Generate Changelog`);
    $.verbose = true;
    await $`npx standard-version -r ${nextVersion}`;
    $.verbose = false;
    doneLog();

    infoLog('3. Input server ip');
    const ip = await question(`Input the server ip: `);
    doneLog(`Your ip is ${ip}`);

    infoLog(`4. Uploading files...`);
    $.verbose = true;
    echo(await $`scp -P 22 -r public scripts server src *.json next* *.yaml deploy@${ip}:/opt/dtstack/UED`);
    $.verbose = false;
    doneLog();

    doneLog(`Deploy done. Please ssh to server and run 'pnpm restart' to complete deploy.`);
})();
