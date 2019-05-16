import React from 'react';
import { Route } from 'react-router-dom';

import Charts from './pages/Charts';
import PatientSummary from './pages/PatientSummary';
import Terms from '../version/pages/Terms';

export default [
    <Route exact path="/charts" component={Charts} />,
    <Route exact path="/summary" component={PatientSummary} />,
    <Route exact path="/terms" component={Terms} noLayout />
];