# How to create an interactive Java lab with JUnit?

We'll divide this part into 5 sections:

1. Creating lab metadata
2. Setting up lab defaults
3. Setting up lab challenges
4. Setting up test file
5. Reading the output from stdout
6. Setting up evaluation script

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

Container image should be set as "Java" for Java labs. The following software are available by default in this image:

-   openjdk 11.0.16 2022-07-19
-   OpenJDK Runtime Environment (build 11.0.16+8-post-Ubuntu-0ubuntu120.04)
-   OpenJDK 64-Bit Server VM (build 11.0.16+8-post-Ubuntu-0ubuntu120.04, mixed mode, sharing)
-   Java LSP to provide IntelliSense

![Setting a container image](/images/java/container-image-select.png)

### Lab Layout

<!--@include: ./../_components/LabLayout.md-->

## Step 2 - Lab Defaults

Lab defaults section include how your lab environment boots. It is one of the most important parts because a wrong default environment might confuse your students. Therefore it is important to set it up properly.

When a codedamn playground boots, it can setup a filesystem for user by default. You can specify what the starting files could be, by specifying a git repository and a branch name:

![Lab default repository](/images/html-css/lab-default-repo.png)

**Important note:** For Java playground, we recommend you to fork the following repository and use it as a starter template: [Java playground starter - codedamn](https://github.com/codedamn-classrooms/java-starter-playground)

You will find a `.cdmrc` file in the repository given to you above. It is highly recommend, at this point, that you go through the [.cdmrc guide and how to use .cdmrc in playgrounds](/docs/concepts/cdmrc) to understand what `.cdmrc` file exactly is. Once you understand how to work with `.cdmrc` come back to this area.

## Step 3 - Lab challenges

<!--@include: ./../_components/LabChallenges.md-->

## Step 4 - Test file

Once you save the lab, you will see a button named `Edit Test File` in the `Evaluation` tab. Click on it.

![](/images/common/lab-edit-test.png)

When you click on it, a new window will open. This is a test file area.

You can write anything here. Whatever script you write here, can be executed from the `Test command to run section` inside the evaluation tab we were in earlier.

The point of having a file like this to provide you with a place where you can write your evaluation script.

**For Java labs, you can use the default test file of Java (JUnit) evaluation:**

![](/images/java/evaluation-script.png)

The moment you select the Java (JUint), the following code should appear in your editor:

```java

import static org.junit.jupiter.api.Assertions.*;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.PrintStream;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import java.io.ByteArrayOutputStream;
import java.lang.reflect.Method;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TestFile {

    @BeforeAll
    public static void setupStuff() { // Runs before each test

    }

    @AfterAll
    public static void doCleanup() { // Runs after each test case

    }

    @Test
    @Order(1)
    public void test1() {
        try {
            Class classNameToTest = Class.forName("<Class Name Here>");
            Method methodToTest = classNameToTest.getMethod("< Method Name Here >"); // Optional: Add parameter types as second argument here

            var returnedOutput = methodToTest.invoke(null, null); // Give arguments as an array in 2nd parameter

            assertTrue(true); // Check for the expected output

        } catch(Exception e) {
            fail();
        }
    }
}
```

Let us understand what is happening here exactly:

-   Remember that we can code anything in this file and then execute it later. In this example, we're writing a JUnit test in Java.
-   With Java testing, it is possible that the user doesn't create methods or classes that you need to test. This might result in your whole test file to crash **if** you try to import it globally at the top.
-   Therefore, we **recommend** to use Reflection API in Java to test everything. This allows you to strictly pass/fail tests even if the methods/classes don't exist. Otherwise, your boilerplate code would always need to have empty definitions and all classes pre-made.
-   Reflection API might look very verbose in syntax but is fairly straightforward to implement once you understand the basics. You should learn about how to work with Reflection API in Java here: [Reflection API docs](https://javapapers.com/core-java/java-reflection-cheat-sheet/)
-   Also note that the tests here are run in order through `@TestMethodOrder(MethodOrderer.OrderAnnotation.class)` and `@Order(1)` decorators. This is important if you want to map the results of these tests (passed/failed) correctly with the tests you added in challenges tab earlier.

![](/images/html-css/playground-tests.png)

-   Let's say your tests results from up is PASS, FAIL, PASS, PASS. Then, the following would be the output on playground:

![](/images/html-css/playground-tests-2.png)

-   **Note:** If your test suite contain less tests than challenges added back in the UI, the "extra" UI challenges would automatically stay as "false". If you add more challenges in test file, the results would be ignored. Therefore, it is **important** that the number of tests you write in the testing class is same as the number of challenges you added in the challenges UI.

This completes your evaluation script for the lab. Your lab is now almost ready for users.

## Step 5 - Reading the output from stdout

There are situations when you want to validate the output that is being printed on the terminal. For example, If you ask the user to write a simple Java code that prints 'Hello World', and you want to test if the user was able to print it correct or not, in this case you can easily compare the terminals output by the expected output using the `ByteArrayOutputStream`.

In your test() method, you can use the `out.toString()` method from the `out` object declared at the class level to read the output from the terminal and finally do a `assertEquals()` to compare the output.

Sample Code to check `Hello World` program:

```java
import static org.junit.jupiter.api.Assertions.*;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.PrintStream;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import java.io.ByteArrayOutputStream;
import java.lang.reflect.Method;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TestFile {

    // IO Streams
    private static final  ByteArrayOutputStream out = new ByteArrayOutputStream();
    private static final ByteArrayOutputStream err = new ByteArrayOutputStream();
    private static ByteArrayInputStream inputStream;

    // Backup Streams
    private static final PrintStream originalOut = System.out;
    private static final PrintStream originalErr = System.err;
    private static final InputStream originalInput = System.in;


    @BeforeAll
    public static void setStreams() { // Override all the streams to our custom IO streams
        System.setOut(new PrintStream(out));
        System.setErr(new PrintStream(err));
    }

    @AfterAll
    public static void restoreInitialStreams() { // Restores all the streams to its original backups
        System.setOut(originalOut);
        System.setErr(originalErr);
        System.setIn(originalInput);
    }


    @Test
    @Order(1)
    public void test1() {
        try {
            Class classNameToTest = Class.forName("<Class Name Here>");
            Method methodToTest = classNameToTest.getMethod("< Method Name Here >"); // Optional: Add parameter types as second argument here

            var returnedOutput = methodToTest.invoke(null, null); // Give arguments as an array in 2nd parameter

            String outputFromConsole = out.toString(); // Reads the output from the terminal

            assertTrue(true); // Check for the expected output

        } catch(Exception e) {
            fail();
        }
    }
}
```

## Step 6 - Evaluation Script

Evaluation script is actually what runs when the user on the codedamn playground clicks on "Run Tests" button.

![](/images/common/lab-run-tests.png)

Since we have already written a pure evaluation script that runs as a JUint test utility, all we have to do is trigger that script via Java + JUnit and write it to proper file `$UNIT_TEST_OUTPUT_FILE` for the UI to show the results.

```sh
#!/bin/bash
set -e 1

# Compile user code
cd /home/damner/code
javac -cp . *.java

# setup test env
mkdir -p /home/damner/.javatest
mv $TEST_FILE_NAME /home/damner/.javatest/TestFile.java

# Download the junit5main.jar binary if not present
[ -e "/home/damner/.javatest/junit5main.jar" ] || curl https://raw.githubusercontent.com/codedamn-classrooms/java-junit-files/main/junit5main.jar -o /home/damner/.javatest/junit5main.jar

# Compile test file
cd /home/damner/.javatest
javac -cp .:junit5main.jar TestFile.java

# Run the test file
cd /home/damner/.javatest
java -jar junit5main.jar -cp .:/home/damner/code --select-class TestFile --reports-dir . || true

# Convert TEST-junit-jupiter.xml to JSON
cd /home/damner/.javatest
yarn add xml2js
cat > processJavaResults.js << EOF
const fs = require('fs')
const xmlFile = fs.readFileSync('./TEST-junit-jupiter.xml', 'utf8')
const { parseString } = require('xml2js')
parseString(xmlFile, (err, data) => {
    const results = []
    console.log(data.testsuite.testcase[0])
    for (let i = 0; i < data.testsuite.testcase.length; i++) {
        results.push(!data.testsuite.testcase[i].failure)
    }

    fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
})
EOF

# Run the node script to write results to playground UI
cd /home/damner/.javatest
node processJavaResults.js
```

This will make sure we run the full Java script and write the results properly for the playground IDE to read.

Let us understand what exactly is happening here:

-   We first of all, compile all the user code by going to `/home/damner/code` directory and running `javac -cp . *.java`. This would compile all files. If you want to compile your user code in a different way, you can do it here.
-   Next, we setup a temporary folder outside of user working space to download JUnit.
-   JUnit jar binary would be downloaded only once. On subsequent runs, it would be reused.
-   We then compile the `TestFile.java` (the JUnit code that we wrote in the full JUnit testing script above) with `junit5main.jar` being in the classpath.
-   Finally, we run the `TestFile` class using `--select-class TestFile` (remember, this is the same class name of the JUnit test script as we wrote above in Test File section).
-   We also add the user code in the classpath here itself so that we can import it directly in the test file (as we do).
-   Finally, the `--reports-dir` flag outputs the result in the same directory which then we read with a simple Node.js script.
-   JUnit outputs the results in XML. We use a simple `xml2js` parser to convert this into a JS object, and then convert the results into a boolean JSON array. We write this array inside `$UNIT_TEST_OUTPUT_FILE` which is then read by the playground and challenges are marked as passed or failed.

**Note:** You can setup a full testing environment in this block of evaluation script (installing more packages, etc. if you want). However, your test file will be timed out **after 30 seconds**. Therefore, make sure, all of your testing can happen within 30 seconds.

## Setup Verified Solution (Recommended)

<!--@include: ./../_components/LabVerifiedSolution.md-->
