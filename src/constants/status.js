export const STATUS = {
  ACTIVE: 'active',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ON_HOLD: 'on_hold'
}

export const STATUS_LABELS = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.IN_PROGRESS]: 'In Progress',
  [STATUS.COMPLETED]: 'Completed',
  [STATUS.CANCELLED]: 'Cancelled',
  [STATUS.ON_HOLD]: 'On Hold'
}

export const STATUS_COLORS = {
  [STATUS.ACTIVE]: {
    bg: '#e3f2fd',
    border: '#2196f3',
    text: '#1976d2'
  },
  [STATUS.IN_PROGRESS]: {
    bg: '#fff3e0',
    border: '#ff9800',
    text: '#f57c00'
  },
  [STATUS.COMPLETED]: {
    bg: '#e8f5e9',
    border: '#4caf50',
    text: '#2e7d32'
  },
  [STATUS.CANCELLED]: {
    bg: '#ffebee',
    border: '#f44336',
    text: '#c62828'
  },
  [STATUS.ON_HOLD]: {
    bg: '#f3e5f5',
    border: '#9c27b0',
    text: '#7b1fa2'
  }
}

