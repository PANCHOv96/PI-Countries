import { render, screen } from '@testing-library/react';
import Filters from './Filters.jsx';
import {Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from "../../store/index.js";
import { setFilters} from "../../actions/index.js";

describe('Filters page test', () => {
    let filters;
    beforeEach(() => {   
        filters = (
            <Provider store={store}>
                <BrowserRouter>
                    <Filters />
                </BrowserRouter>
            </Provider>
        );
    });
    it('it is showing Filters', () => {
        render(filters);
        store.dispatch(setFilters(true))
        expect(screen.getByText('Filters')).toBeInTheDocument();
        expect(screen.getByLabelText('Continents')).toBeInTheDocument();
    });
});