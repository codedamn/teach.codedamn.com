# Embedding a playground in article

Your course articles can be made much more interactive by including embedded code examples students can play with.

You can use codedamn playgrounds to embed code examples in your articles. Here's how it works:

1. Go to https://codedamn.com/playgrounds
2. Create a playground, your URL will change to https://codedamn.com/playground/:playgroundID
3. You can now embed your playground as follows:

```html{2}
<iframe
	src="https://codedamn.com/playground/:playgroundID?embed=1"
	width="1280"
	height="720"
></iframe>
```

## Click to load

You can enable click-to-load mode on the playgrounds. This ensures that playgrounds do not load immediately. Click to load mode could be useful when you have to embed multiple playgrounds on a single page.

Use `ctl=1` parameter to use click to load feature:

```html{2}
<iframe
	src="https://codedamn.com/playground/:playgroundID?embed=1&ctl=1"
	width="1280"
	height="720"
></iframe>
```
