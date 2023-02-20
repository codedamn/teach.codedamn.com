export default {
	title: 'Codedamn Docs',
	description: 'Build interactive coding courses on codedamn',
	lastUpdated: true,
	cleanUrls: true,
	themeConfig: {
		editLink: {
			pattern:
				'https://github.com/codedamn/teach.codedamn.com/edit/main/:path',
			text: 'Edit this page on GitHub',
		},
		siteTitle: 'Codedamn Docs',
		logo: 'https://codedamn.com/assets/images/favicons/favicon-96x96.png',
		sidebar: [
			{
				text: 'Getting Started',
				collapsed: false,
				items: [
					{
						text: 'Why interactive?',
						link: '/docs/why-interactive',
					},
					{
						text: 'Setup a course',
						link: '/docs/setup-course',
					},
					{
						text: 'Create an instructor account',
						link: '/docs/create-account',
					},
					{
						text: 'Crash course [Important]',
						link: '/docs/crash-course',
					},
				],
			},
			{
				text: 'Course Item Guides',
				collapsed: false,
				items: [
					{
						text: 'Playgrounds in Article',
						link: '/docs/instructor-guides/playground-in-article',
					},
					{
						text: 'Regular Quiz',
						link: '/docs/instructor-guides/add-quiz',
					},
					{
						text: 'Quiz in Labs',
						link: '/docs/instructor-guides/quiz-mode-in-lab',
					},
					{
						text: 'Video in Labs',
						link: '/docs/instructor-guides/video-mode-in-lab',
					},
					{
						text: 'I/O Testing Labs',
						link: '/docs/instructor-guides/io-testing',
					},
					{
						text: 'Exam courses',
						link: '/docs/instructor-guides/exam-courses',
					},
					{
						text: 'Pre-sale courses',
						link: '/docs/instructor-guides/presale-course',
					},
				],
			},
			{
				text: 'All Technologies',
				collapsed: false,
				items: [
					{
						text: 'Introduction',
						link: '/docs/technologies/',
					},
					{
						text: 'HTML/CSS',
						link: '/docs/technologies/html-css',
					},
					{
						text: 'React.js',
						link: '/docs/technologies/react',
					},
					{
						text: 'Node.js',
						link: '/docs/technologies/node',
					},
					{
						text: 'Python',
						link: '/docs/technologies/python-pytest',
					},
					{
						text: 'Go',
						link: '/docs/technologies/go',
					},
					{
						text: 'Solidity',
						link: '/docs/technologies/solidity-hardhat',
					},
					{
						text: 'Java',
						link: '/docs/technologies/java-junit',
					},
				],
			},
			{
				text: 'Playground Concepts',
				collapsed: false,
				items: [
					{
						text: '.cdmrc file',
						link: '/docs/concepts/cdmrc',
					},
					{
						text: 'Environment Variables',
						link: '/docs/concepts/environment-variables',
					},
					{
						text: 'Port Mapping',
						link: '/docs/concepts/port-mapping',
					},
				],
			},
		],

		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2015-2023. All Rights Reserved',
		},
	},
}
