---
sidebar_position: 3
sidebar_label: Quiz Mode Inside Lab
---

# Quiz mode

You can create a lab alongside a quiz. This is best suited for labs where challenges do not make a lot of sense. For example, teaching users about finding version of installed Python.

Take a look at how this lab would be rendered:

![](/images/guides/quiz-mode/quiz-mode-lab.png)

## Setting up

<div
	style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
>
	<iframe
		src="https://www.youtube.com/embed/FUgOD-6vrC4?list=PLYxzS__5yYQnoUg4MCS2sew_tOZsgrUeH"
		title="YouTube video player"
		frameborder="0"
		style="position: relative; width: 100%; height: 0; padding-top: 56.25%;"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	></iframe>
</div>

Setting up quiz mode is easy. Follow the following steps:

-   Go to your curriculum builder inside the course page.
-   Click on "Add Lab" button
-   Make sure to create a regular Interactive Lab (not an I/O lab)

![](/images/guides/quiz-mode/quiz-mode-lab-creation.png)

-   Link it and click on "Edit"
-   You can now see how to toggle lab as a Quiz now.

![](/images/guides/quiz-mode/quiz-mode-lab-toggle.png)

-   Once you toggle it to a quiz, you get more options:
    -   **Question**: This is your quiz question. What do you want to ask them?
    -   **Description**: Description of the quiz. You can include markdown here, code snippets, etc..
    -   **Add Option**: You can add options from the button on the bottom right.
    -   **Add Explanation:** You can add explanation from the button on bottom right as well.

![](/images/guides/quiz-mode/quiz-mode-lab-done.png)

-   Once the details are filled, save and proceed.
-   You can setup rest of the lab like you'd do for any other technology. Read about the [full guide of setting up interactive lab here](/docs/technologies/).

:::info

You **cannot** add challenges/evaluation if it is a quiz-lab. This means, you can setup the work environment for the user, and whatever they work on, finally they can answer the quiz question and move forward.

:::
