import React from 'react';
import history from '../../../services/history';
import Input from '../../Input';
import { Wrapper } from './styles';
import { FaSearch as SearchIcon } from 'react-icons/fa';

interface FormData {
    query: string;
}

const SearchBarComponent: React.FC = () => {
    const handleSubmit = (data: FormData) => {
        const { query } = data;

        if (!query || !query.trim()) {
            return 0;
        }

        const param = query.replace(/ /g, '+');

        history.push(`/search?query=${param}`);
        window.location.reload();
    };

    return (
        <Wrapper onSubmit={handleSubmit}>
            <button type="submit">
                <SearchIcon size={18} />
            </button>

            <Input name="query" type="text" placeholder="Pesquisar..." />
        </Wrapper>
    );
};

export default SearchBarComponent;
