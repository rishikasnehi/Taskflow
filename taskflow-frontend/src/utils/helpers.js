export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

export const getPriorityColor = (priority) => {
  const colors = {
    low: 'badge-info',
    medium: 'badge-warning',
    high: 'badge-error',
    critical: 'badge-error',
  };
  return colors[priority] || 'badge-primary';
};

export const getStatusColor = (status) => {
  const colors = {
    todo: 'badge-info',
    'in-progress': 'badge-warning',
    review: 'badge-primary',
    done: 'badge-success',
  };
  return colors[status] || 'badge-primary';
};

export const truncateText = (text, length = 100) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};
