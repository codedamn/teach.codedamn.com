import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const FeatureList = [
	{
		title: 'Easy to use',
		Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
		description: (
			<>
				Once you understand how the underlying architecture works,
				interactive codedamn playgrounds are extremely easy to use and
				setup.
			</>
		)
	},
	{
		title: 'Get started quickly',
		Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
		description: (
			<>
				These docs are written by programmers, and would help you
				quickly setup your first interactive course in the language of
				your choice.
			</>
		)
	},
	{
		title: 'Powered by codedamn',
		Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
		description: (
			<>
				Our infrastructure is secure, battle tested, and ready to handle
				the burden of interactively educating the next 50 million
				aspiring developers.
			</>
		)
	}
]

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	)
}
