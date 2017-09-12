/*
 * This style guide contains links to specific rules referenced by section and
 * rule number. This script may be used to automatically renumber each
 * reference so that new sections and rules can be added in any order.
 */

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)


readFile('./README.md', 'utf8')
  .then(renumber)

function renumber (file) {
  // Start at -1 to compensate for table of contents which shouldn't be counted
  let section = -1
  let renumbered = ''
  let bullet

  const rxRefLabel = /- \[TS (\d{1,2}\.\d{1,2})/
  const rxRefAnchor = /ts-(\d{4})/g
  const rxRefBare = /- \[TS\]/

  let newFile = file.split('\n').map(line => {
    const isSection = line.startsWith('## ');
    const isBullet = line.startsWith('  - [')
    const isBare = line.startsWith('  - [TS]')

    if (isSection) {
      section += 1
      bullet = 0
      return line
    } else if (isBullet) {
      bullet += 1
    } else {
      return line
    }

    const sectionPadded = String(section).padStart(2, '0')
    const bulletPadded = String(bullet).padStart(2, '0')
    const refDec = `TS ${section}.${bulletPadded}`
    const refPad = `ts-${sectionPadded}${bulletPadded}`

    if (isBare) {
      return line
        .replace(rxRefBare, `- [${refDec}](#${refPad})<a name='${refPad}'></a> -`)
    } else {
      return line
        .replace(rxRefLabel, `- [TS ${section}.${bulletPadded}`)
        .replace(rxRefAnchor, `ts-${sectionPadded}${bulletPadded}`)
    }
  })

  console.log(newFile.join('\n').trim())
}
