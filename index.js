import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import Metalsmith from 'metalsmith'
import layouts from '@metalsmith/layouts'
import markdown from '@metalsmith/markdown'
import permalinks from '@metalsmith/permalinks'
import collections from '@metalsmith/collections'
import inPlace from '@metalsmith/in-place'

const __dirname = dirname(fileURLToPath(import.meta.url))
const t1 = performance.now()
const prod = process.env.NODE_ENV === 'production';

const sitedata = {
  site: {
    basePath: !prod ? '' : '/ltg-grenoble',
    subject: 'Low-tech Lab - Grenoble',
    author: '© Low-tech Lab - Grenoble',
    contact: 'contact@lowtechlabgrenoble.org',
    address: '48 Ave. Washington, 38100 Grenoble'
  },
  socials: {
    twitter: 'https://twitter.com/johndoe',
    facebook: 'https://facebook.com/johndoe',
    github: 'https://github.com/johndoe'
  }
};

Metalsmith(__dirname)
  .clean(true)
  .watch( prod ? false : [ 'src', 'layouts' ] )
  .source('./src')
  .destination('./build')
  .env({
    DEBUG: process.env.DEBUG,
    NODE_ENV: process.env.NODE_ENV,
    TZ: 'Europe/Paris',
  })
  .metadata(sitedata)
  .use(inPlace({
    pattern: '**/*.md',
    transform: 'handlebars'
  }))
  .use(markdown())
  .use(permalinks())
  .use(collections({
    nav: {
      pattern: '**/*.html',
      sortBy: 'nav_order',
      metadata: {
        base: sitedata.site.basePath
      }
    }
  }))
  .use(function addBasePathToCollection(files) {
    Object.values(files).forEach(file => {
      file.basePath = sitedata.site.basePath;
    });
  })
  .use(layouts({
    directory: 'layouts',
    default: 'default.hbs',
    pattern: '**/*.html'
  }))
  .build(function (err) {
    if (err) throw err
    console.log(`Build success in ${((performance.now() - t1) / 1000).toFixed(1)}s`)
  })