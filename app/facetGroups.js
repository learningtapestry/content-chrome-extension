const FACET_GROUPS = {
  grades: {
    displayName: 'Grade',
    param: 'grade_ids[]'
  },

  identities: {
    displayName: 'Publisher',
    param: 'identity_ids[]'
  },

  languages: {
    displayName: 'Language',
    param: 'language_ids[]'
  },

  resource_types: {
    displayName: 'Resource Type',
    param: 'resource_type_ids[]'
  },

  standards: {
    displayName: 'Standard',
    param: 'standard_ids[]'
  },
  
  subjects: {
    displayName: 'Subject',
    param: 'subject_ids[]'
  },
};

export default FACET_GROUPS;
