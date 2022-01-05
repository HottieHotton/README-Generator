const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const util = require('util');

// TODO: Create an array of questions for user input
const questions = [{
    type: 'input',
    name: 'title',
    message: 'What is the title of your repository? (Required): ',
    //validate to make sure there is a value there
    validate: titleInput => {
      if (titleInput) {
        return true;
      } else {
        console.log('Please enter your repository title.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'What is the description of your repository? (Required): ',
    validate: descInput => {
      if (descInput) {
        return true;
      } else {
        console.log('Please enter a description of the repository.');
        return false;
      }
    }
    },
  //confirm whether or not there is a installation process first
  {
    type: 'confirm',
    name: 'confirmInstallation',
    message: 'Is there an installation process?'
    },
  {
    type: 'input',
    name: 'installation',
    message: 'Please list installation instructions: ',
    // the <when> = if the person selects a installation process allow them to input steps
    when: ({ confirmInstallation }) => {
      if (confirmInstallation) {
        return true;
      } else {
        console.log('No specific installation instructions required for this repo!');
        return false;
      }
    }
  },
  
  { //confirm
    type: 'confirm',
    name: 'confirmUsage',
    message: 'Would you like to give instructions for using your application?'
  },
  { //if confirmed
    type: 'input',
    name: 'instructions',
    message: 'Please list instructions for using your application(It is highly suggested to add images later to further the understanding of the instructions): ',
    when: ({ confirmUsage }) => {
      if (confirmUsage) {
        return true;
      } else {
        console.log('There are no usage instructions needed for this project, just hit run and follow prompts!');
        return false;
      }
    }
  },
  
  {
    type: 'confirm',
    name: 'confirmContribution',
    message: 'May other developers contribute to your repository?'
  },
  {
    type: 'input',
    name: 'contribution',
    message: 'Please explain how other developers may contribute to your project.',
    when: ({ confirmContribution }) => {
      if (confirmContribution) {
        return true;
      } else {
        console.log('Contribution is not allowed on this repo!');
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'testConfirm',
    message: 'Is testing available?'
  },
  {
    type: 'input',
    name: 'testing',
    message: 'Please explain how users may test your application: ',
    when: ({ testConfirm }) => {
      if (testConfirm) {
        return true;
      } else {
        console.log('No Testing Allowed in this program!');
        return false;
      }
    }
  },
  { //checkbox that allows license choice
    type: 'checkbox',
    name: 'license',
    message: 'Please choose a license(Required, select None if you do not have a license): ',
    choices: ['None', 'Apache', 'BSD3', 'BSD2',
    'GPL', 'LGPL', 'MIT', 'MPL', 'EPL', 'CDDL',],
    validate: licenseInput => {
      if (licenseInput) {
        return true;
      } else {
        console.log('Please select a license.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'username',
    message: 'What is your GitHub username? (Required): ',
    validate: userInput => {
      if (userInput) {
        return true;
      } else {
        console.log('Please enter your GitHub username.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address? (Required): ',
    validate: emailInput => {
      if (emailInput) {
        return true;
      } else {
        console.log('Please enter your email.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'questions',
    message: 'Please list instructions for those who wish to contact you(Required): ',
    validate: (contactInput) => {
      if (contactInput) {
        return true;
      } else {
        return false;
      }
    }
  }];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, error => {
    if (error) {
      return console.log('Sorry there was an error : ' + error);
    }
  })}
  


const createREADME = util.promisify(writeToFile);
async function init() {
    try {
      const userAnswers = await inquirer.prompt(questions);
      console.log('Thank you! Your answers are being generated into your new README.md file: ', userAnswers);
      // Collects answers, pushing data to the markdown
      const myMarkdown = generateMarkdown(userAnswers);
      console.log(myMarkdown);
      //Call the README writeup and create the new README
      await createREADME('README1.md', myMarkdown);
      
    } catch (error) {
      console.log('Sorry there was an error.' + error);
    }
  };




init();
