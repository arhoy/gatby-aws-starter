import React from 'react';

import { DashboardLayout } from '../layouts/DashboardLayout';
import { Section0 } from './Sections/Section0/_Section0';
import { Section1 } from './Sections/Section1/Section1';

export const HomePage = () => {
  return (
    <DashboardLayout>
      <Section0 />
      <Section1 />
    </DashboardLayout>
  );
};
