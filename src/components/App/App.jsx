import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import css from '../App/App.module.css';

class App extends Component {
    state = {
        images: [],
        page: 1,
        searchQuery: '',
        isLoading: false,
        isModalOpen: false,
        largeImageURL: '',
    };
    //-----------------------форма-----------------
    searchImage = value => {
        if (value !== this.state.searchQuery) {
            this.setState({
                images: [],
                page: 1,
                searchQuery: '',
            });
        }

        if (value !== '') {
            this.setState({ searchQuery: value });
        }
    };
    // -------------------------запрос------------------
    async fetchImages() {
        if (this.state.searchQuery === '') {
            return;
        }
        const PER_PAGE = 12;
        const KEY = '31814066-d36b2cc87cac42beedbbff451';
        const BASE_URL =
            'https://pixabay.com/api/?&image_type=photo&orientation=horizontal&';
        const url = `${BASE_URL}q=${this.state.searchQuery}&page=${this.state.page}&key=${KEY}&per_page=${PER_PAGE}`;

        const response = await axios.get(url);
        const { data } = await response;

        console.log(data.totalHits);
        const totalPage = data.totalHits / PER_PAGE;
        console.log(totalPage);
        this.setState({ images: data.hits });
    }

    //----------кнопка загрузить еще----------------------
    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1,
        }));
    };
    //----------------клик по картинке----открываем модалку------
    onImageClick = largeImageURL => {
        this.setState({
            largeImageURL,
            isModalOpen: true,
        });
    };
    //------------------закрываем модалку---------------------
    onCloseModal = () => {
        this.setState({
            isModalOpen: false,
        });
    };

    onCloseBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.setState({
                isModalOpen: false,
            });
        }
    };

    //----------метод цикла---вызов запроса-----------
    componentDidUpdate(_, prevState) {
        if (
            prevState.searchQuery !== this.state.searchQuery ||
            prevState.page !== this.state.page
        ) {
            this.fetchImages(this.state.searchQuery);
        }
    }

    render() {
        return (
            <div className={css.App}>
                <Searchbar onSubmit={this.searchImage} />
                <ImageGallery
                    images={this.state.images}
                    onImageClick={this.onImageClick}
                />
                {this.totalPage > 12 && <Button loadMore={this.loadMore} />}

                {this.state.isModalOpen && (
                    <Modal
                        largeImageURL={this.state.largeImageURL}
                        onCloseModal={this.onCloseModal}
                        onCloseBackdropClick={this.onCloseBackdropClick}
                    />
                )}
            </div>
        );
    }
}

export default App;
