import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

/* rss for static generated sites

export async function GET(context) {
	const songs = await getCollection('song');
	return rss({
		stylesheet: "/rss/styles.xsl",
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: songs.map((song) => ({
			...song.data,
			link: `/song/${song.id}/`,
		})),
	});
}
*/