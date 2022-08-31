export default {
	github: 'https://github.com/codedamn/use.codedamn.com',
	docsRepositoryBase:
		'https://github.com/codedamn/use.codedamn.com/blob/master',
	titleSuffix: ' – codedamn',
	logo: (
		<>
			<span className="mr-2 font-extrabold hidden md:inline">
				codedamn
			</span>
			<span className="text-gray-600 font-normal hidden md:inline">
				docs
			</span>
		</>
	),
	head: (
		<>
			<meta name="msapplication-TileColor" content="#ffffff" />
			<meta name="theme-color" content="#ffffff" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta httpEquiv="Content-Language" content="en" />
			<meta
				name="description"
				content="Documentation for creators using codedamn platform"
			/>
			<meta
				name="og:description"
				content="Documentation for creators using codedamn platform"
			/>
			<meta name="twitter:card" content="summary_large_image" />
			{/* <meta name="twitter:image" content="https://nextra.vercel.app/og.png" /> */}
			<meta name="twitter:site:domain" content="use.codedamn.com" />
			<meta name="twitter:url" content="https://use.codedamn.com" />
			<meta name="og:title" content="Documentation - codedamn" />
			{/* <meta name="og:image" content="https://nextra.vercel.app/og.png" /> */}
			<meta name="apple-mobile-web-app-title" content="Codedamn" />
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href={getFavicon(32)}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href={getFavicon(16)}
			/>
			<link rel="manifest" href="/manifest.json" />
			<link rel="shortcut icon" href={getFavicon(96)} />

			<meta
				name="msapplication-TileImage"
				content="/ms-icon-144x144.png"
			/>
		</>
	),
	search: true,
	prevLinks: true,
	nextLinks: true,
	footer: true,
	footerEditLink: 'Edit this page on GitHub',
	footerText: (
		<>
			Copyright {new Date().getFullYear()} © codedamn. All rights
			reserved.
		</>
	),
	unstable_faviconGlyph: '💻'
}
