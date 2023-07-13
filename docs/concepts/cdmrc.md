# Using .cdmrc

The file `.cdmrc` is a very important file for your playgrounds. This is the configuration file for codedamn playgrounds that control how your playground behaves. This is written in YAML. You can [learn YAML syntax here](https://www.youtube.com/watch?v=motSWssLHCQ).

There are only a few key-value pairs you can specify in this file. They are documented here. Let's learn how you can work with `.cdmrc` with example configs.

## Creating Terminals

```yaml
terminals: ['echo one', 'echo two', 'echo three']
```

The `terminals` key can be use to execute commands in the terminal instances. You can boot up to **6** terminals instances. The `terminals` array in the `.cdmrc` can only contain 6 elements in them.

The above config will create 3 terminals and execute the commands `echo one`, `echo two` and `echo three` in them. The config above will start three terminals as soon as your playground boots. Note that these commands run only once the playground is booted. This means that if you invite collaborators to your playground, and you're already on that same playground (that already has executed these commands), they will **not** run again.

Note that the terminals will not execute in the same order as given in the array, the order of the terminal tabs is based on the execution time of the commands. The terminal that executes the command first will be the first tab, and so on.

## Default Files

```yaml
tabs: ['src/index.html', 'src/folder/script1.js', 'README.md']
```

The `tabs` field in the `.cdmrc` is an array of strings. Once specified, whenever your playground boots for the first time - it would open the mentioned files by default in the Monaco editor.

This is for a good UX when users don't know what should be a good entry point for the project.

We at codedamn do this on our codelabs and some default playground repos. You can customize this behavior or disable it completely by passing an empty array `[]` or just removing the key altogether.

You can also optionally specify a line number and column number separated by a `#` symbol. This will automatically place the cursor at the specified position. Here's how a modified version could look like:

```yaml
tabs: ['src/index.html#22:10', 'src/folder/script1.js#2:55', 'README.md']
```

The config above will open `index.html` file at line number 22 and column number 10 the first time user opens it. Similarly, for `script1.js` file above, it'll open at line number 2 and column number 55.

## Playground view

```yaml
playground-view: terminal-editor-browser
```

There are three possible views for playground you can specify in this configuration:

-   `terminal-editor-browser`: This view includes terminal, editor and browser preview. It is the best and recommended view if you intend to use a frontend web server to display output.
-   `terminal-editor`: This view includes a terminal and an editor only. It is good for programming where no web server is involved. For example, writing a sorting algorithm in C++ may not need a web server output.
-   `terminal-browser`: This view includes only the terminal and browser. You can combine it with `browser-link` too.

## Run button

```yaml
run-button: node $$file
```

The `run-button` command in a playground does two things:

-   It makes a new button saying "Run Code" visible on your playground.
-   When you click on that "Run Code" button - it executes that command in the first terminal. However, we **automatically** run a **CTRL + C** sequence as well to terminate any previously running program. Therefore, anything running in the foreground on your first terminal would get terminated.

This is especially useful when you're working with, say, a program that requires you to run the same command over and over again. You can open a C++ playground on codedamn and configure the command as `gcc script.c -o script && ./script` and every time you click on `Run Code` button, it'll execute this script.

Another important thing to note here is the `$$file` syntax. If you'd like to run a command dynamically on the focused tab/active tab, you can specify `$$file` and we would run your command after replacing `$$file` it with the path to the file you have currently opened inside your Monaco editor on codedamn.

For example, if you're on `src/index.js` file and your `run-button` command is `node $$file`, then when you click on "Run Code" button, we would run `node src/index.js`. If you change file and click on the button again, we'll update the path again before running.

## Browser Link

```
browser-link: https://codedamn.com
```

By default, we open `https://<whatever-host-is-assigned-to-you>.codedamn.app:1337` in the iframe browser preview on the right. However, you can override the webpage opened on the right using the command shown above.

Note that because we use `iframe` to embed the window, it is entirely possible that a variety of URLs might not work due to `x-frame-options` set to `sameorigin` or `deny`. [Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options).

## Conclusion

Here's a dummy config file that uses all the options we have currently:

```yaml
# terminals
terminals:
    [
        'cd client && yarn && yarn start',
        'cd server && yarn && yarn dev',
        'echo "We''re ready"',
    ]
# other config
tabs: ['README.md']
run-button: clear && node $$file
browser-link: https://wikipedia.org
```
