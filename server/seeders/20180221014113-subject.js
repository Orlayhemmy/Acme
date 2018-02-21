'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects', [
    {
      subjectname: 'Mathematics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      {
        subjectname: 'English Language',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Basic Science',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Basic Technology',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Home Economics',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Citizen Education',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Yoruba',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Igbo',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'French',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Business Studies',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'ICT',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Physical and Health Education',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Cultural and Creative Arts',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Christian Religious Studies',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Agricultural Science',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Social Studies',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Music',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Physics',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Chemistry',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Financial Accounting',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Commerce',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Literature In English',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Fine Art',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Further Mathematics',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Economics',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'History',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Geography',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Government',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Biology',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Food and Nutrition',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Techincal Drawing',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Electrical Installation',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Fishery',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Catering Craft',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Visual Art',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Comprehension',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Grammar',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Creative Writing',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Handwriting',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Spelling',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Verbal Reasoning',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Quantitative Reasoning',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Vocational Aptitude',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Sounds',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        subjectname: 'Islamic Studies',
      createdAt: new Date(),
      updatedAt: new Date(),
      }], {});
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Subjects', null, {});
    }
  };