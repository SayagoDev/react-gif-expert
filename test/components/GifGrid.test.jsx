import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs');

describe('Pruebas en <GifGrid />', () => {
    const category = 'One Punch Man';

    test('debe de mostrar el loading inicialmente', () => {

        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true
        })

        render( <GifGrid category={ category } /> );
        /* screen.debug(); */
        expect( screen.getByText('Cargando...') );
        expect( screen.getByText( category ) );
    });

    test('debe de mostrar items cuando se cargan las imágenes useFetchGifs', () => {

        const gifs = [
            {
                id: 'ABC',
                title: 'Saitama',
                url: 'https://example.com/saitama.jgp'
            },
            {
                id: '123',
                title: 'Goku',
                url: 'https://example.com/Goku.jgp'
            }
        ];

        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: true
        })

        render( <GifGrid category={ category } /> );
        expect( screen.getAllByRole('img').length ).toBe(2);
    });
});
