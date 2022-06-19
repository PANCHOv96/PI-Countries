import {render} from '@testing-library/react';
import {Main} from './Main';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';


describe('Landing page test', () => {
    const initialState = {};
    let store;
    let main;

    beforeEach(() => {
        main = (
            <Provider store={store}>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </Provider>
        );
    });

    it('Should render a button to start the app', () => {
        const {getByText} = render(main);
        expect(getByText('CLICK TO BEGIN')).not.toBeNull();
    });

    it('should have a link to home', () => {
        const {getByRole} = render(main);
        expect(getByRole('link' ,'/home')).not.toBeNull();
    })
});