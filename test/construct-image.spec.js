/* global expect */

import { constructImage } from '../src/construct-picture'

//-----------------------------------------------------------------------------

describe('Construct Image', () => {
  it('correctly builds src', () => {
    const spec = {
      src: {
        width: '240px',
        ratio: '16 / 9',
        options: {
          quality: 50,
        },
      },
      sizes: '50vw',

      options: {
        crop: 'auto',
      },
    }

    const template =
      'https://picsum.photos/id/{id}/{width}/{height}?q={quality}&crop={crop}'

    const image = {
      id: 128,
      quality: 80,
    }

    // ----------------------------------------

    const expected = {
      src: `https://picsum.photos/id/128/240/135?q=50&crop=auto`,
      sizes: '50vw',
    }

    // ----------------------------------------

    const result = constructImage(spec, template, image)

    expect(result).to.deep.equal(expected)
  })

  // ==========================================================

  it('correctly builds srcset', () => {
    const spec = {
      srcset: {
        widths: ['240px', 320, 480],
        ratio: '16 / 9',
        options: {
          quality: 50,
        },
      },
      sizes: '50vw',

      // These options will apply to any src or srcset spec unless overridden.
      // Options have the following priority:
      // 1. Options specified on a spec element (src or srcset);
      // 2. Specified at top-level of spec object;
      // 3. Specified on image object;
      options: {
        crop: 'auto',
      },
    }

    const template = `https://picsum.photos/id/{id}/{width}/{height}?q={quality}&crop={crop}`

    const image = {
      id: 128,
      quality: 80,
    }

    // ----------------------------------------

    const srcset = [
      'https://picsum.photos/id/128/240/135?q=50&crop=auto 240w',
      'https://picsum.photos/id/128/320/180?q=50&crop=auto 320w',
      'https://picsum.photos/id/128/480/270?q=50&crop=auto 480w',
    ].join(', ')

    const expected = {
      srcset,
      sizes: '50vw',
    }

    // ----------------------------------------

    const result = constructImage(spec, template, image)

    // console.log(result)

    expect(result).to.deep.equal(expected)
  })
})
