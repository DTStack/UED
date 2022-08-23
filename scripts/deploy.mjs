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
    infoLog('1. Check the staged');
    const isGitClean = (await $`git status --porcelain`).stdout.trim().length;
    assert(!isGitClean, 'You should empty the staged before release.');
    doneLog();

    infoLog('2. Check the branch');
    const currentBranch = (await $`git rev-parse --abbrev-ref HEAD`).stdout.trim();
    assert(currentBranch === 'master', `You should deploy on master.`);
    doneLog();

    infoLog('3. Check the remote up to date');
    const gitStatus = (await $`git status --short --branch`).stdout.trim();
    assert(!gitStatus.includes('behind'), `Git status is behind remote, please run 'git pull'.`);
    doneLog();

    infoLog('4. Bump version');
    const lastVersion = require('../package.json').version;
    const nextVersion = await question(`Input the next version(current version is ${lastVersion}): `);

    infoLog(`5. Generate Changelog`);
    $.verbose = true;
    await $`npx standard-version -r ${nextVersion}`;
    $.verbose = false;
    doneLog();

    infoLog('6. Input server ip');
    const ip = await question(`Input the server ip: `);
    doneLog(`Your ip is ${ip}.`);

    infoLog(`7. Uploading files...`);
    echo(await $`scp -P 22 -r public scripts server src *.json next* *.yaml deploy@${ip}:/opt/dtstack/temp/UED`);
    doneLog();

    infoLog(`Upload done`);
    doneLog(`Please ssh to server and run 'pnpm restart' to complete deploy.`);
})();
