# How to create an interactive React.js lab with Vitest?

<!--@include: ./../_components/TechnologyIntro.md-->

We'll divide this part into 5 sections:

1. Creating lab metadata
2. Setting up lab defaults
3. Setting up lab challenges
4. Setting up test file
5. Setting up evaluation script

## Introduction

This guide would assume that you already have created an interactive course from your instructor panel. If not, [go here and set it up first](https://codedamn.com/instructor/interactive-courses)

## Step 1 - Creating lab metadata

<!--@include: ./../_components/LabMetadata.md-->

### Lab Details

Lab details is the tab where you add two important things:

-   Lab title
-   Lab description

Once both of them are filled, it would appear as following:

![](/images/html-css/lab-details.png)

Let's move to the next tab now.

### Container Image

Container image should be set as "HTML/CSS" for React labs as well. The following software are available by default in this image:

-   `static-server` npm package installed globally: [static-server](https://www.npmjs.com/package/static-server)
-   Puppeteer installation with Chrome for E2E testing (more on this in Evaluation tab)
-   Node.js v14, Yarn, NPM, Bun.js

The following NPM packages (non-exhaustive list) are globally installed:

-   puppeteer@10.2.0
-   static-server@2.2.1
-   chai@4.3.4
-   nodemon@2.0.12
-   node-fetch@2.6
-   yarn@1.22.11
-   truffle@5.5.13
-   @drizzle/store@1.5.3
-   ganache-cli@6.12.2

![Setting a container image](/images/html-css/lab-container-image.png)

We will setup and install a React environment on the runtime.

**Note:** It is highly recommended to **not** use `create-react-app` environment. Instead, stick with vite (more on this later).

### Lab Layout

<!--@include: ./../_components/LabLayout.md-->

## Step 2 - Lab Defaults

Lab defaults section include how your lab environment boots. It is one of the most important parts because a wrong default environment might confuse your students. Therefore it is important to set it up properly.

When a codedamn playground boots, it can setup a filesystem for user by default. You can specify what the starting files could be, by specifying a git repository and a branch name:

![Lab default repository](/images/react/lab-default-repo.png)

**Important note:** For React playground, we recommend you to fork the following repository and use it as a starter template: [React vite playground starter - codedamn](https://github.com/codedamn-projects/react-vite-playground)

**Note:** You can setup a React project in other ways as well - for example with `create-react-app`. However, it is highly recommended to use Vite for React because it sets up the project extremely fast for the user to work with.

You will find a `.cdmrc` file in the repository given to you above. It is highly recommend, at this point, that you go through the [.cdmrc guide and how to use .cdmrc in playgrounds](/docs/concepts/cdmrc) to understand what `.cdmrc` file exactly is. Once you understand how to work with `.cdmrc` come back to this area.

## Step 3 - Lab challenges

<!--@include: ./../_components/LabChallenges.md-->

## Step 4 - Test file

Once you save the lab, you will see a button named `Edit Test File` in the `Evaluation` tab. Click on it.

![](/images/common/lab-edit-test.png)

When you click on it, a new window will open. This is a test file area.

You can write anything here. Whatever script you write here, can be executed from the `Test command to run section` inside the evaluation tab we were in earlier.

The point of having a file like this to provide you with a place where you can write your evaluation script.

**For React.js labs, you can use the React (Vitest) evaluation script:**

![](/images/react/lab-edit-test-file.png)

The moment you select the React (Vitest), the following code should appear in your editor:

```jsx
import '@testing-library/jest-dom'
import * as React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'

// Import the user component if you want
import App from '/home/damner/code/src/App'

describe('Test runner suite', () => {
	// Sample test - each "test" block will be linked to individual challenge
	test('App should mount correctly', async () => {
		const { container } = render(<App />)
		expect(container.querySelector('main')).toBeInTheDocument()
	})
})
```

Let us understand what is happening here exactly:

-   Remember that we can code anything in this file and then execute it later. In this example, we're writing a React.js Vitest test script from scratch. Check out [vitest docs](https://vitest.dev) if you're new to vitest.
-   Remember that we will install vitest and other required utilities in the evaluation script section below. Therefore, you can try to import and use anything and everything here you want.
-   The rest of the code is just importing the default user code, and testing it through standard unit testing procedures.

![](/images/html-css/playground-tests.png)

-   The number of `test(...)` blocks inside your `describe` suite should match the number of challenges added in the creator area.

-   **Note:** If your number of `test` blocks are less than challenges added back in the UI, the "extra" UI challenges would automatically stay as "false". If you add more challenges in test file, the results would be ignored. Therefore, it is **important** that the `results.length` is same as the number of challenges you added in the challenges UI.

-   We then also add jQuery and chai for assisting with testing. Although it is not required as long as you can populate the `results` array properly.

This completes your evaluation script for the lab. Your lab is now almost ready for users.

## Step 5 - Evaluation Script

Evaluation script is actually what runs when the user on the codedamn playground clicks on "Run Tests" button.

![](/images/common/lab-run-tests.png)

Remember that we're using React Vite playground setup. This means we can assume that we already have vite installed.

However, we still need to setup a lot of things: `jsdom`, `vitest`, and `react-testing-library`. Therefore, we can write our evaluation bash script to install all of this and run our tests. To help you set it up, we maintain a [repository of evaluation scripts](https://github.com/codedamn/curriculum-testing-scripts). Here's how the React vitest script looks like:

```sh
#!/bin/bash
set -e 1

# Assumes you are running a react vite playground on codedamn

# Install vitest and testing util
cd /home/damner/code
yarn add vitest@0.32.2 jsdom@22.1.0 @testing-library/jest-dom@5.16.5 @testing-library/react@14.0.0 --dev
mkdir -p /home/damner/code/.labtests

# Move test file
mv $TEST_FILE_NAME /home/damner/code/.labtests/reactcheck.test.jsx

# setup file
cat > /home/damner/code/.labtests/setup.js << EOF
import '@testing-library/jest-dom'
EOF

# vitest config file
cat > /home/damner/code/.labtests/config.js << EOF
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: '/home/damner/code/.labtests/setup.js',
    }
})
EOF

# process.js file
cat > /home/damner/code/.labtests/process.js << EOF
import fs from 'node:fs'
const payload = JSON.parse(fs.readFileSync('./payload.json', 'utf8'))
const answers = payload.testResults[0].assertionResults.map(test => test.status === 'passed')

fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(answers))
EOF

# package.json
cat > /home/damner/code/.labtests/package.json << EOF
{
    "type": "module"
}
EOF

# run test
yarn vitest run --config=/home/damner/code/.labtests/config.js --threads=false --reporter=json --outputFile=/home/damner/code/.labtests/payload.json || true

# Write results to UNIT_TEST_OUTPUT_FILE to communicate to frontend
node /home/damner/code/.labtests/process.js
```

You might need to have a little understanding of bash scripting. Let us understand how the evaluation bash script is working:

-   With `set -e 1` we effectively say that the script should stop on any errors
-   We then navigate to user default directory `/home/damner/code` and then install the required NPM packages. Note that this assumes we already have `vite` installed. If you're using a different react setup (like `create-react-app`), you might have to install `vite` as well.
-   You can install additional packages here if you want. They would only be installed the first time user runs the test. On subsequent runs, it can reuse the installed packages (since they are not removed at the end of testing)
-   Then we create a `.labtests` folder inside of the `/home/damner/code` user code directory. Note that `.labtests` is a special folder that can be used to place your test code. This folder will not be visible in the file explorer user sees, and the files placed in this folder are not "backed up to cloud" for user.
-   We move the test file you wrote earlier (in last step) to `/home/damner/code/.labtests/reactcheck.test.jsx`. Note that it is important to give it an extension of `.test.jsx` for vitest to pick it as a JSX test file.
-   We then create another setup file `/home/damner/code/.labtests/setup.js` with just `jsdom` as the import. This is because vitest can then use JSDOM to parse the DOM without browser. More information about this [setup file can be found in vitest docs here](https://vitest.dev/config/#setupfiles).
-   We then also create a custom vite config file as `config.js`. This is because we don't want to override your (or users') custom `vite.config.js` file if present. This file only loads `jsdom` and marks the `globals: true` hence importing `describe`, `test`, etc. automatically available without importing. More information about the configuration can be found here in [vitest docs](https://vitest.dev/config/#globals).
-   We then create a `process.js` file that can be used to process our results into a single file of boolean values. This is important because on the playground page, the way challenges work, is that they get green or red based on a JSON boolean array written inside the file in environment variable: `$UNIT_TEST_OUTPUT_FILE`
-   For example, once the test run succeeds, and if you write `[true,false,true,true]` inside `$UNIT_TEST_OUTPUT_FILE`, it would reflect as PASS, FAIL, PASS for 3 challenges available inside codedamn playground UI (as shown below)

![](/images/html-css/playground-tests-2.png)

-   Then we run the actual test using `yarn vitest run` command, specifying the output as JSON (read by `process.js`) and in a single thread (as we want ordered results).

-   Finally we run the `process.js` file that writes the correct JSON boolean array on `$UNIT_TEST_OUTPUT_FILE` which is then read by the playground UI and marks the lab challenges as pass or fail.

**Note:** You can setup a full testing environment in this block of evaluation script (installing more packages, etc. if you want). However, your bash script test file will be timed out **after 30 seconds**. Therefore, make sure, all of your testing can happen within 30 seconds.

## Setup Verified Solution (Recommended)

<!--@include: ./../_components/LabVerifiedSolution.md-->
