import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import Metalsmith from 'metalsmith'
import layouts from '@metalsmith/layouts'
import markdown from '@metalsmith/markdown'
import permalinks from '@metalsmith/permalinks'

const __dirname = dirname(fileURLToPath(import.meta.url))
const t1 = performance.now()
const prod = process.env.NODE_ENV === 'production';

const sitedata = {
  site: {
    base: !prod ? 'http://localhost:3000' : 'https://lowtech-lab-grenoble.fr',
    subject: 'Low-tech Lab - Grenoble',
    author: '© Low-tech Lab - Grenoble',
    contact: 'contact@lowtechlabgrenoble.org',
    address: '48 Ave. Washington, 38100 Grenoble'
  },
  nav: [
    { path: 'index.html', label: 'Accueil' },
    { path: 'actions.html', label: 'Actions' },
    { path: 'contact.html', label: 'Contact' },
    { path: 'faq.html', label: 'FAQ' },
    { path: 'ressources.html', label: 'Ressources' },
    { path: 'blog.html', label: 'Blog' }
  ],
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
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    directory: 'layouts',
    default: 'default.hbs',
    pattern: '**/*.html'
  }))
  .build(function (err) {
    if (err) throw err
    console.log(`Build success in ${((performance.now() - t1) / 1000).toFixed(1)}s`)
  })