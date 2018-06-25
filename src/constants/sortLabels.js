const sortLabels = {
  email: 'Email',
  firstName: 'First name',
  lastName: 'Last name',
  role: 'Role',
  hasAccess: 'Is active',
  code: 'Code',
  name: 'Name',
  deprecated: 'Deprecated',
};

export function getSortLabel(sortField) {
  return sortLabels[sortField];
};