# How to create an interactive Node.js lab with Vitest?

<!--@include: ./../_components/TechnologyIntro.md-->

We'll divide this part into 5 sections:

1. Creating lab metadata
2. Setting up lab defaults
3. Setting up lab challenges
4. Setting up evaluation script
5. Setting up test file

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

Container image should be set as "HTML/CSS" for HTML/CSS labs. The following software are available by default in this image:

-   `static-server` npm package installed globally: [static-server](https://www.npmjs.com/package/static-server)
-   Puppeteer installation with Chrome for E2E testing (You can read about [puppeteer testing here](/docs/technologies/html-css))
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

### Lab Layout

<!--@include: ./../_components/LabLayout.md-->

## Step 2 - Lab Defaults

Lab defaults section include how your lab environment boots. It is one of the most important parts because a wrong default environment might confuse your students. Therefore it is important to set it up properly.

When a codedamn playground boots, it can setup a filesystem for user by default. You can specify what the starting files could be, by specifying a git repository and a branch name:

![Lab default repository](/images/html-css/lab-default-repo.png)

:::info
You will find a `.cdmrc` file in the repository given to you above. It is highly recommend, at this point, that you go through the [.cdmrc guide and how to use .cdmrc in playgrounds](/docs/concepts/cdmrc) to understand what `.cdmrc` file exactly is. Once you understand how to work with `.cdmrc` come back to this area.
:::

## Step 3 - Lab challenges

<!--@include: ./../_components/LabChallenges.md-->

## Step 4 - Evaluation Script

:::tip
HIGHLY recommended to watch the video before you read the documentation:
:::

<div
	style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
>
<iframe
	src="https://www.youtube.com/embed/1Ze0Js6XFKk?list=PLYxzS__5yYQnoUg4MCS2sew_tOZsgrUeH"
	title="YouTube video player"
	frameborder="0"
	style="position: relative; width: 100%; height: 0; padding-top: 56.25%;"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
></iframe>
</div>

Evaluation script is actually what runs when the user on the codedamn playground clicks on "Run Tests" button.

![](/images/common/lab-run-tests.png)

Since we're going to test this lab using Vitest, we'll setup the Vitest testing environment. This is what your evaluation script would look like:

```sh

#!/bin/bash
set -e 1

# Install vitest and testing util
cd /home/damner/code
yarn add vite@3 vitest@0.22.1 --dev
mkdir -p /home/damner/code/__labtests

# Move test file
mv $TEST_FILE_NAME /home/damner/code/__labtests/nodecheck.test.js

# setup file

# vitest config file
cat > /home/damner/code/__labtests/config.js << EOF
import { defineConfig } from 'vite'
export default defineConfig({
	plugins: [],
    test: {
        globals: true
    }
})
EOF

# process.js file
cat > /home/damner/code/__labtests/process.js << EOF
const fs = require('fs')
const payload = require('./payload.json')
const answers = payload.testResults[0].assertionResults.map(test => test.status === 'passed')
fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(answers))
EOF

# run test
yarn vitest run --config=/home/damner/code/__labtests/config.js --threads=false --reporter=json --outputFile=/home/damner/code/__labtests/payload.json || true


# Write results to UNIT_TEST_OUTPUT_FILE to communicate to frontend
node /home/damner/code/__labtests/process.js
```

Let's understand what the above evaluation script is doing:

-   We navigate to users' default code directory and install `vitest` and `vite`. We do this because we'll use `vitest` as the test runner.
-   We then move the cloned test file (more on this in the next step) inside `__labtests` folder. This folder is hidden from the user in the GUI while test is running.
-   We create a custom configuration for vite which would be read by vitest for testing.
-   We then create a `process.js` file that would read the results written by vitest and process them to write them on a file inside `$UNIT_TEST_OUTPUT_FILE` environment variable. This is important because this file is read by the playground to evaluate whether the challenges passed or failed.
-   Whatever your mapping of final JSON boolean array written in `process.env.UNIT_TEST_OUTPUT_FILE` is, it is matched exactly to the results on the playground. For example, if the array written is `[true, false, true, true]`, the following would be the output on playground:

![](/images/html-css/playground-tests-2.png)

-   Finally we run the test suite using `vitest` without multithreading (as we want sequential results) and then we run `process.js` file using Node. This runs the test suite.

:::note
You can setup a full testing environment in this block of evaluation script (installing more packages, etc. if you want). However, your test file will be timed out **after 30 seconds**. Therefore, make sure, all of your testing can happen within 30 seconds.
:::

## Step 5 - Test file

You will see a button named `Edit Test File` in the `Evaluation` tab. Click on it.

![](/images/common/lab-edit-test.png)

When you click on it, a new window will open. This is a test file area.

You can write anything here. Whatever script you write here, can be executed from the `Test command to run section` inside the evaluation tab we were in earlier.

The point of having a file like this to provide you with a place where you can write your evaluation script.

**For Node.js labs tested with Vitest, you can use the default test file of Node.js (Vitest) evaluation:**

![](/images/node/lab-test-file-dropdown.png)

The moment you select the Node.js (Vitest), the following code should appear in your editor:

```js
describe('Test runner suite', () => {
	test('Variable should be exported', async () => {
		const userVariable = await import('/home/damner/code/index').then(
			(t) => t.default
		)

		expect(typeof userVariable === 'undefined').to.be.false
	})

	test('Variable should have correct value', async () => {
		const userVariable = await import('/home/damner/code/index').then(
			(t) => t.default
		)
		expect(userVariable === 'Hello World').to.be.true
	})
})
```

This code is pretty self explanatory. You can do any and everything you want here. Please make sure of the following things:

-   If your number of `test` blocks are less than challenges added back in the UI, the "extra" UI challenges would automatically stay as "false". If you add more challenges in test file, the results would be ignored. Therefore, it is **important** that the number of `test` blocks is same as the number of challenges you added in the challenges UI.
-   Use only a single `describe` block (this is how `process.js` script above in evaluation script section expects the output to be)
-   We don't have to import `describe`, `test` and `expect` because we're using `globals: true` in the vitest configuration above. If you don't use that you'll have to import those functions as well.
-   It is better to dynamically import user code (instead of using top level imports) because that way if the user file doesn't exist your whole test suite would not crash.

:::tip
Read more about unit and integration testing with Vitest here: [https://vitest.dev/api](https://vitest.dev/api/)
:::

This completes your evaluation script for the lab. Your lab is now almost ready for users.

## Setup Verified Solution (Recommended)

<!--@include: ./../_components/LabVerifiedSolution.md-->
