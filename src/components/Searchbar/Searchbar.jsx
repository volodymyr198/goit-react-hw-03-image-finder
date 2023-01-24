import React, { Component } from 'react';
import { MdOutlineImageSearch } from 'react-icons/md';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        searchFormValue: '',
    };

    handleSubmit = e => {
        e.preventDefault();
        // console.log(e.courentTarget.value);
        const { onSubmit } = this.props;
        onSubmit(this.state.searchFormValue);
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    render() {
        const { searchFormValue } = this.state;
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.formButton}>
                        <span className={css.buttonLabel}>
                            <MdOutlineImageSearch />
                        </span>
                    </button>

                    <input
                        onChange={this.handleChange}
                        className={css.input}
                        type="text"
                        name="searchFormValue"
                        value={searchFormValue}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
