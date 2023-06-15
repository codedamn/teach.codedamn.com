# How to create AWS Sandbox labs?

Codedamn supports creating interactive courses for AWS cloud provider. This means, your course on AWS can include hands-on challenges for students to solve using AWS control panel. The control panel is fully managed by codedamn and neither student nor creator has to handle the infrastructure part.

This document would list down steps to create an interactive AWS Sandbox.

## Introduction

This guide would assume that you already have created an interactive course from your instructor panel. If not, [go here and set it up first](https://codedamn.com/instructor/interactive-courses)

## Step 1 - Creating lab metadata

<!--@include: ./../_components/CloudLabMetadata.md-->

## Step 2 - Adding lab details

The next step is to add title, description and lab duration for your AWS lab. Here is what it means:

-   Title: A general overall title of your lab. Make it precise and to the point.
-   Description: This can be a detailed overview of what the user has to do in the full lab session. You can add as many steps in the lab as required, therefore you do not have to explain everything here. You can keep it around 300-500 words.
-   Lab duration: Depending on the number of challenges in the lab, you can set the duration between 5 minutes and 3 hours. This must be specificed in number of minutes.

When the lab duration expires, the session of the user is ended. Therefore, consider how much time a user would take to complete a lab, and add 15-20 minutes on top of it.

Once you're done, click on "Save and Next" button.

![](/images/aws/intro-box.png)

## Step 3 - Adding challenges

Every AWS lab can have multiple challeges. Think of it as a series of tasks you want the user to do. The challenge builder screen is where you can set them up.

![](/images/aws/challenges-screen.png)

Here is the description of every step:

1. Title: This is the title of your challenge.
2. Description: This is the description of your challenge. We recommend keeping description very detailed and step by step to help users complete the challenge. You can insert images here in the markdown editor if you wish to.
3. Evaluation Type: You can keep the challenge self evaluative or system evaluative. Self evaluative challenges are informational, i.e. users can simply read and mark that challenge as done. However, for system evaluative challenges, you get to specify an evaluation script that tests their work.
4. Evaluation script: This is automatically visible once your challenge type is system evaluative. Let's learn about evaluation script in detail.

### Node.js Evaluation Script

Currently, we support writing evaluation script in Node.js. In future, we will add support for Python, and more. When working with Node.js, you have complete access to:

-   AWS SDK (v2 and v3).
-   `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_REGION` to instantiate any SDK (S3, EC2, etc.).

You must export a default function inside the evaluation script and this function must return a `true` or a `false`. If it returns `true`, we will mark the evaluation as success for the given challenge. If it returns `false`, we will mark the evaluation as failed.

Remember that the user cannot skip challenges and have to complete all challenges in a given lab in a step-by-step order.

Here's how a dummy evaluation script might look like:

```js
// import anything you like from AWS sdk here (v2 or v3)
import { EC2Client, DescribeSecurityGroupsCommand } from '@aws-sdk/client-ec2'

// import a default async function here. The parameter object is passed by codedamn when calling your function
export default async function ({
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION,
}) {
	const ec2Client = new EC2Client({
		credentials: {
			accessKeyId: AWS_ACCESS_KEY_ID,
			secretAccessKey: AWS_SECRET_ACCESS_KEY,
		},
		region: AWS_REGION,
	})

	const results = await ec2Client.send(new DescribeSecurityGroupsCommand({}))
	const securityGroups = results.SecurityGroups

	const port_8080_rule_exists = securityGroups.some((sg) =>
		sg.IpPermissions.some(
			(rule) => rule.FromPort === 8080 && rule.ToPort === 8080
		)
	)

	// return a boolean value from this function marking success or failure of the lab
	return port_8080_rule_exists
}
```

## How to test AWS Sandbox?

Currently, only Pro users can use AWS cloud sandboxes. You can signup for a Pro account and test your labs, or if you are far ahead in your course creation and want a free Pro account, <a href="https://codedamn.com/contact">contact our support</a>.
