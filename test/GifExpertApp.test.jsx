import { render, screen, fireEvent } from '@testing-library/react';
import { GifExpertApp } from '../src/GifExpertApp';

describe('Pruebas en <GifExpertApp />', () => {
    const newValue = 'Valorant';

    test('debe de hacer match con el snapshot', () => {
        const { container } = render(<GifExpertApp />);
        expect( container ).toMatchSnapshot();
    });

    test('debe de agregar una nueva categoria', () => {
        render(<GifExpertApp />); 

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.input( input, { target: { value: newValue } } );
        fireEvent.submit( form );

        expect( screen.getAllByRole('heading', {level: 3}).map(category => category.innerHTML) ).toEqual( [newValue, expect.any( String )] );
    });

    test('no debe de agregar una nueva categoria si esta ya existe', () => {
        render(<GifExpertApp />); 

        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');
        const newValue = 'One Punch';

        fireEvent.input( input, { target: { value: newValue } } );
        fireEvent.submit( form );

        expect( screen.getAllByRole('heading', {level: 3}).length ).toBe(1);
    });

});
