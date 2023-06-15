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

cat > /home/damner/code/.labtests/package.json << EOF
{
    "type": "module"
}
EOF

cd /home/damner/code/.labtests
mv $TEST_FILE_NAME ./nodecheck.test.js

# import puppeteer doesn't work without it
npm link puppeteer

node nodecheck.test.js 2>&1 | tee evaluationscript.log
```

This will make sure we run the full Node.js script and write the results properly for the playground IDE to read. It would look like the following:

![](/images/html-css/lab-test-command.png)

**Note:** You can setup a full testing environment in this block of evaluation script (installing more packages, etc. if you want). However, your test file will be timed out **after 30 seconds**. Therefore, make sure, all of your testing can happen within 30 seconds.

## Step 5 - Test file

You will see a button named `Edit Test File` in the `Evaluation` tab. Click on it.

![](/images/common/lab-edit-test.png)

When you click on it, a new window will open. This is a test file area.

You can write anything here. Whatever script you write here, can be executed from the `Test command to run section` inside the evaluation tab we were in earlier.

The point of having a file like this to provide you with a place where you can write your evaluation script.

**For HTML/CSS labs, you can use the default test file of Node.js (Puppeteer) evaluation:**

![](/images/html-css/lab-test-file-dropdown.png)

The moment you select the Node.js (Puppeteer), the following code should appear in your editor:

```js
// !! Boilerplate code starts
import fs from 'node:fs'
import puppeteer from 'puppeteer'

// testlog is a log of test results
const testlog = []

// launch the headless browser for testing
const browser = await puppeteer.launch({
	executablePath: '/usr/bin/google-chrome',
	headless: true,
	args: [
		'--no-sandbox',
		'--disable-setuid-sandbox',
		'--disable-dev-shm-usage',
		'--disable-accelerated-2d-canvas',
		'--no-first-run',
		'--no-zygote',
		'--single-process',
		'--disable-gpu',
	],
})
const page = await browser.newPage()

// wait for server to come online
await page.goto('http://localhost:1337')

// add jQuery and chai for unit testing support if you want
await Promise.all([
	page.addScriptTag({
		url: 'https://code.jquery.com/jquery-3.5.1.slim.min.js',
	}),
	page.addScriptTag({
		url: 'https://cdnjs.cloudflare.com/ajax/libs/chai/4.2.0/chai.min.js',
	}),
])

// add chai-dom
await page.addScriptTag({
	url: 'https://cdn.jsdelivr.net/npm/chai-dom@1.11.0/chai-dom.min.js',
})

// !! Boilerplate code ends

// Start your tests here in individual try-catch block

{
	const result = await page.evaluate(async () => {
		const { expect } = window.chai
		try {
			expect(
				document.body.innerHTML.toLowerCase().includes('hello world')
			).to.be.true
			return { status: 'pass' }
		} catch (error) {
			return {
				status: 'error',
				error: error.message || 'Challenge failed',
			}
		}
	})

	testlog.push(result)
}

{
	const result = await page.evaluate(async () => {
		const { expect } = window.chai
		try {
			expect(
				document.body.innerHTML
					.toLowerCase()
					.includes('hello world again')
			).to.be.true
			return { status: 'pass' }
		} catch (error) {
			return {
				status: 'error',
				error: error.message || 'Challenge failed',
			}
		}
	})

	testlog.push(result)
}

// very important for the final length of \`testlog\` array to match the number of challenges, in this case - 2.

// write the test log
fs.writeFileSync(
	'/home/damner/code/.labtests/testlog.json',
	JSON.stringify(testlog)
)

// write the results array boolean. this will map to passed or failed challenges depending on the boolean value at the challenge index
fs.writeFileSync(
	process.env.UNIT_TEST_OUTPUT_FILE,
	JSON.stringify(testlog.map((result) => result.status === 'pass'))
)

await browser.close().catch((err) => {})

// Exit the process
process.exit(0)
```

Let us understand what is happening here exactly:

-   Remember that we can code anything in this file and then execute it later. In this example, we're writing a Node.js script from scratch.
-   Remember that we already have puppeteer with headless chrome pre-installed in codedamn playgrounds for HTML/CSS. Therefore, we can import it directly.
-   In the first part of `run` function, we start a headless puppeteer browser.
-   We then visit `http://localhost:1337`. At this point, I would highly recommend you to read [How port mapping works for codedamn playgrounds](/docs/concepts/port-mapping), if you haven't yet.
-   From this point onwards, we have some `try-catch` blocks. But why? Because we want to populate an array `results` and then finally write this array to a file inside environment variable `UNIT_TEST_OUTPUT_FILE`
-   Let's say, `[true, false]` is written to the file `process.env.UNIT_TEST_OUTPUT_FILE`. In that case, the first challenge would be marked as passed in the IDE, and the second challenge would be marked as failed:

![](/images/html-css/playground-tests.png)

-   Whatever your mapping of final JSON boolean array written in `process.env.UNIT_TEST_OUTPUT_FILE` is, it is matched exactly to the results on the playground. For example, if the array written is `[true, false, true, true]`, the following would be the output on playground:

![](/images/html-css/playground-tests-2.png)

-   **Note:** If your `results` array contain less values than challenges added back in the UI, the "extra" UI challenges would automatically stay as "false". If you add more challenges in test file, the results would be ignored. Therefore, it is **important** that the `results.length` is same as the number of challenges you added in the challenges UI.

-   We then also add jQuery and chai for assisting with testing. Although it is not required as long as you can populate the `results` array properly.

This completes your evaluation script for the lab. Your lab is now almost ready for users.

## Setup Verified Solution (Recommended)

<!--@include: ./../_components/LabVerifiedSolution.md-->
