import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IssueCard from '../src/components/issueCard';

const mockIssue = {
  id: 12312312,
  title: 'Test Issue',
  number: 1,
  created_at: '2022-02-02',
  user: {
    login: 'testuser',
  },
  comments: 3,
};

test('renders issue card with correct data', () => {
  render(<IssueCard issue={mockIssue} />);

  expect(screen.getByText('# 1')).toBeInTheDocument();

  expect(screen.getByText('Opened by: testuser')).toBeInTheDocument();

  expect(screen.getByText('Comments: 3')).toBeInTheDocument();
});
