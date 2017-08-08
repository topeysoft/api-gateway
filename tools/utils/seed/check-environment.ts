/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   !!!                                                                                   !!!
   !!!  This file is special in that it must be able to execute with wrong Node version  !!!
   !!!  or even when node_modules are missing.                                           !!!
   !!!                                                                                   !!!
   !!!  Do not depend on Node4+ features or presence of npm packages here.               !!!
   !!!                                                                                   !!!
   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

import * as semver from 'semver';
import { exec } from 'child_process';
import { checkNodeModules } from './npm/check-node-modules-process';

let issues = [];

// coarse Node version check
if (+process.version[1] < 5) {
  issues.push('This project currently requires Node 5+. Use nvm to update your node version.');
}

if (issues.length) {
  printWarning(issues);
  console.error(
      'Your environment doesn\'t provide the prerequisite dependencies.\n' +
      'Please fix the issues listed above and then rerun the gulp command.\n' +
      'Check out https://github.com/angular/angular/blob/master/DEVELOPER.md for more info.');
  process.exit(1);
}

// wrap in try/catch in case someone requires from within that file
try {
  checkNodeModules(false, false);
} catch (e) {
  issues.push('Looks like you are missing some npm dependencies. Run: npm install');
  throw e;
} finally {
  // print warnings and move on, the next steps will likely fail, but hey, we warned them.
  printWarning(issues);
}

export function checkEnvironment(reqs) {
  exec('npm --version', function(e, stdout) {
    var foundNpmVersion = semver.clean(stdout);
    var foundNodeVersion = process.version;
    var issues = [];


    if (!semver.satisfies(foundNodeVersion, reqs.requiredNodeVersion)) {
      issues.push(
          'You are running unsupported node version. Found: ' + foundNodeVersion + ' Expected: ' +
          reqs.requiredNodeVersion + '. Use nvm to update your node version.');
    }

    if (!semver.satisfies(foundNpmVersion, reqs.requiredNpmVersion)) {
      issues.push(
          'You are running unsupported npm version. Found: ' + foundNpmVersion + ' Expected: ' +
          reqs.requiredNpmVersion + '. Run: npm update -g npm');
    }

    if (reqs.shrinkwrap && !checkNodeModules(false, false)) {
      issues.push(
          'Your node_modules directory is stale or out of sync with npm-shrinkwrap.json. Run: npm install');
    }

    printWarning(issues);
  });
}

function printWarning(issues) {
  if (!issues.length) return;

  console.warn('');
  console.warn('!'.repeat(110));
  console.warn('!!!  Your environment is not in a good shape. Following issues were found:');
  issues.forEach(function(issue) { console.warn('!!!   - ' + issue); });
  console.warn('!'.repeat(110));
  console.warn('');

  if (process.env.CI) {
    process.exit(1);
  }
}
