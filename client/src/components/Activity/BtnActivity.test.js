import { render, screen } from '@testing-library/react';
import BtnActivity from './BtnActivity.jsx';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from "../../store/index.js";

describe('BtnActivity test', () => {
    let btnActivity;
    beforeEach(() => {   
        btnActivity = (
            <Provider store={store}>
                <BrowserRouter>
                    <BtnActivity />
                </BrowserRouter>
            </Provider>
        );
    });
    it('button exists', () => {
        render(btnActivity);
        expect(screen.getByRole('button')).toHaveTextContent('Create Activity');
    });
    it('link leads to /activity', () => {
        render(btnActivity);
        expect(screen.getByRole('link').href).toContain("/activity");
    });
});