# How to create interactive HTML/CSS labs?

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
-   Puppeteer installation with Chrome for E2E testing (more on this in Evaluation tab)
-   Node.js v18, Yarn, NPM, Bun

The following NPM packages (non-exhaustive list) are globally installed:

-   puppeteer@20.2.0
-   static-server@2.2.1
-   chai@4.3.4
-   nodemon@2.0.12
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

:::tip
For HTML and CSS playground, we recommend you to fork the following repository and use it as a starter template: [HTML playground starter - codedamn](https://github.com/codedamn-classrooms/html-playground-starter)
:::

:::info
You will find a `.cdmrc` file in the repository given to you above. It is highly recommend, at this point, that you go through the [.cdmrc guide and how to use .cdmrc in playgrounds](/docs/concepts/cdmrc) to understand what `.cdmrc` file exactly is. Once you understand how to work with `.cdmrc` come back to this area.
:::

## Step 3 - Lab challenges

<!--@include: ./../_components/LabChallenges.md-->

## Step 4 - Evaluation Script

Evaluation script is actually what runs when the user on the codedamn playground clicks on "Run Tests" button.

![](/images/common/lab-run-tests.png)

Since we have already written a pure evaluation script that runs and finally writes the JSON result to the `UNIT_TEST_OUTPUT_FILE` environment, all we have to do is trigger that script via Node.js.

The full path of the script is made available at run-time with another environment variable called `TEST_FILE_NAME`. Therefore, all we have to do is write the following in the evaluation script area:

```sh
#!/bin/bash
set -e 1

mkdir -p /home/damner/code/.labtests
cd /home/damner/code/.labtests

cat > package.json << EOF
{
    "type": "module"
}
EOF

cat > playwright.config.ts << EOF
import { defineConfig, devices } from '@playwright/test'
import puppeteer from 'puppeteer'

export default defineConfig({
	timeout: 10_000,
	maxFailures: 0,
	testDir: '.',
	fullyParallel: false,
	forbidOnly: true,
	retries: 0,
	workers: 1,

	// Reporter to use
	reporter: [['list'], ['json', { outputFile: './report.json' }]],
	
	use: {
		baseURL: 'http://localhost:1337/',
		trace: 'off',
		launchOptions: {
			headless: true,
			executablePath: puppeteer.executablePath(),
			chromiumSandbox: false
		}
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	]
})
EOF

mv $TEST_FILE_NAME nodecheck.spec.js

npm link puppeteer
bun install @playwright/test@1.40.1 playwright@1.40.1 fs-extra

bunx playwright test || true

# process results file
cat > process-results.js << EOF
import fs from 'fs-extra'
const payload = JSON.parse(fs.readFileSync('./report.json', 'utf-8'))
const answers = payload.suites[0].suites[0].specs.map(spec => spec.ok === true)
fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(answers))
EOF

```

This will make sure we run the full Node.js script and write the results properly for the playground IDE to read. It would look like the following:

![](/images/html-css/lab-test-command.png)

**Note:** You can setup a full testing environment in this block of evaluation script (installing more packages, etc. if you want). However, your test file will be timed out **after 60 seconds**. Therefore, make sure, all of your testing can happen within 60 seconds.

## Step 5 - Test file

You will see a button named `Edit Test File` in the `Evaluation` tab. Click on it.

![](/images/common/lab-edit-test.png)

When you click on it, a new window will open. This is a test file area.

You can write anything here. Whatever script you write here, can be executed from the `Test command to run section` inside the evaluation tab we were in earlier.

The point of having a file like this to provide you with a place where you can write your evaluation script.

**For HTML/CSS labs, you can use the default test file for playwright:**

![](/images/html-css/lab-test-file-dropdown.png)

The moment you select the Node.js (Puppeteer), the following code should appear in your editor:

```js
import { expect, test } from '@playwright/test'

test.describe.serial('Test', () => {
	test.beforeEach(async ({ page }, testInfo) => {
		console.log(`Running ${testInfo.title}`)
		await page.goto('/')
	})

	test('Stylesheet is linked', async ({ page }) => {
		const linkElement = page.locator('link[rel="stylesheet"]')
		expect(linkElement).toBeDefined()
		expect(await linkElement.getAttribute('href')).toEqual('style.css')
	})
})
```


![](/images/html-css/playground-tests.png)

-   **Note:** If your `results` array contain less values than challenges added back in the UI, the "extra" UI challenges would automatically stay as "false". If you add more challenges in test file, the results would be ignored. Therefore, it is **important** that the `results.length` is same as the number of challenges you added in the challenges UI.

This completes your evaluation script for the lab. Your lab is now almost ready for users.

## Setup Verified Solution (Recommended)

<!--@include: ./../_components/LabVerifiedSolution.md-->
