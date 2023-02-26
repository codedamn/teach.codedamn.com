# Environment variables

There are a bunch of useful system environment variables available in the codedamn playground. They can be accessed in bash prompt using `$ENV`, for example, `$PUBLIC_HOSTNAME`

-   `$PUBLIC_HOSTNAME` can be used to get the hostname assigned to you to access APIs, etc. in browser (example value = my-domain.codedamn.app)
-   `$PUBLIC_PORT` is the port with which the hostname is embedded by default on right (this is `1337` - hardcoded value)
-   `$SECONDARY_PUBLIC_PORT` is the second port available (hardcoded to `1338` right now)
-   `$TEST_FILE_NAME` contains the full absolute path to the test file you add in a course lab using "Edit Test File" button.
-   `$UNIT_TEST_OUTPUT_FILE` contains the full absolute path to a file which is read by codedamn systems once your evaluation script ends. Once it finishes executing, our system would read it as a boolean array, and would mark all challenges as passed or failed depending on the values inside of that boolean array. For example, if the contents of the file at `$UNIT_TEST_OUTPUT_FILE` is `[true,false,true]`, then the first challenge would be marked as passed, but the second and the third challenge would be marked as failed.
