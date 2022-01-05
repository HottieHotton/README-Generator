// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  let licenseBadge = `![badge](https://img.shields.io/badge/license-${license}-blue)<br/>`;
  if (license ==='None') {
    licenseBadge ='';
  }
  return licenseBadge;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  const licenseLink = {
    None:'',
    Apache:'https://opensource.org/licenses/Apache-2.0',
    BSD3:'https://opensource.org/licenses/BSD-3-Clause',
    BSD2:'https://opensource.org/licenses/BSD-2-Clause',
    GPL:'https://opensource.org/licenses/gpl-license',
    LGPL:'https://opensource.org/licenses/lgpl-license',
    MIT:'https://opensource.org/licenses/MIT',
    MPL:'https://opensource.org/licenses/MPL-2.0',
    EPL:'https://opensource.org/licenses/EPL-2.0',
    CDDL:'https://opensource.org/licenses/CDDL-1.0',
  };
  return licenseLink[license];
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let licenseSection = `## License
  ![badge](https://img.shields.io/badge/license-${license}-blue)
  <br/>
  This application is licensed by these groups: <br/> ${license}`;
  if (license === 'None') {
    licenseSection = '';
  }
  return licenseSection;
}

function install(installation){
  if(installation === undefined){
    return 'No specific installation instructions required for this repo!'
  }
  else{
  return installation;
}
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);
  const licenseLink = renderLicenseLink(data.license);
  const licenseSection = renderLicenseSection(data.license);
  const installSection = install(data.installation);


  return `# ${data.title} ${licenseBadge}

  ## Table of Contents
  --------------------
  - [Description](#description)
  - [Installations](#installation)
  - [Usage](#Usage)
  - [Contributing](#contributions)
  - [Tests](#testing)
  - [License](#licenses)
  - [Questions](#contact)

  ## Description
  --------------
  ${data.description}

  ## Installation
  ---------------
  ${installSection}

  ## Usage
  ---------------------
  ${data.instructions}

  ## Contribution
  --------------------------
  ${data.contribution}

  ## Testing
  ---------------------
  ${data.testing}

  ## Licenses
  ----------------
  ${licenseSection}

  ${licenseLink}

  ## Contact Me!
  --------------
  ${data.questions}
  
  GitHub: [${data.username}](https://github.com/${data.username})

  Email: [Gmail](mailto:${data.email})

`;
}

module.exports = generateMarkdown;
