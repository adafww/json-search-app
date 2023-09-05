import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import InputMask from 'react-input-mask';

const SearchForm = () => {
    const [formData, setFormData] = useState({ email: '', number: '' });
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const serverUrl = 'http://localhost:5000';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validator.isEmail(formData.email)) {
            alert('Пожалуйста, введите корректный email.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${serverUrl}/api/search`, formData);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email (обязательное)</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Number</label>
                    <InputMask
                        mask="99-99-99"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    Submit
                </button>
            </form>
            {loading && <p>Идет поиск...</p>}
            {searchResult.length > 0 && (
                <div>
                    <h2>Результаты поиска:</h2>
                    <ul>
                        {searchResult.map((user, index) => (
                            <li key={index}>
                                Email: {user.email}, Number: {user.number}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchForm;