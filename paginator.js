import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Colors from 'theme/Colors';
import Fonts from 'theme/Fonts';

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0;
    padding: 0;

    height: 24px;
    /* max-width: 264px; */
    max-width: 284px;

    background: ${Colors.white};
    box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.05), 4px 0px 4px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.05), 0px -4px 4px rgba(0, 0, 0, 0.05);
    border-radius: 12px;

    > * {
        &:nth-child(3) {
            margin-left: 20px;
        }

        &:nth-child(6) {
            margin-right: 20px;
        }
    }
`;

const GlobalStyles = css`
    font-family: ${Fonts.primary};
    font-size: 12px;
    line-height: 14px;

    color: ${Colors.black};

    &:hover{
        cursor: pointer;
    }
`;

const PaginationNavigate = styled.div`
    ${GlobalStyles}

    display: block;

    margin: 0 20px;

    box-sizing: border-box;
`;

const PaginationArrow = styled.div`
    ${GlobalStyles}

    font-size: 18px;
    font-weight: bold;
`;

const PaginationItem = styled.li`
    ${GlobalStyles}

    list-style: none;

    margin-right: 16px;

    ${props => props.disabled && css`
        &:hover{
            cursor: default;
        }

        pointerEvents: none;
    `};

    ${props => props.active && css`
        font-size: 14px;
        line-height: 16px;
        font-weight: 700;
    `};
`;

const Paginator = ({ currentIndex, maxIndex }) => {
    const [currentNumber, setCurrentNumber] = useState(currentIndex);
    const [currentNumberArray, setCurrentNumberArray] = useState([]);

    const pageNumbers = [];

    for (let i = 1; i <= maxIndex; i += 1) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        if (currentNumber >= 1 && currentNumber <= 2) {
            setCurrentNumberArray([1, 2, 3, '...']);
        } else if (currentNumber > 3 && currentNumber < pageNumbers.length - 2) {
            const slicedSiblingLeft = pageNumbers.slice(currentNumber - 2, currentNumber);
            const sliceSiblingRight = pageNumbers.slice(currentNumber, currentNumber + 1);
            setCurrentNumberArray(['...', ...slicedSiblingLeft, ...sliceSiblingRight, '...']);
        } else if (currentNumber > pageNumbers.length - 4) {
            const sliced = pageNumbers.slice(pageNumbers.length - 3);
            setCurrentNumberArray(['...', ...sliced]);
        }
    }, [currentNumber]);

    const prevArrowNumber = () => {
        setCurrentNumber((pageNumber) => (pageNumber === 1 ? pageNumber : pageNumber - 1));
    };

    const nextArrowNumber = () => {
        setCurrentNumber((pageNumber) => (pageNumber === pageNumbers.length ? pageNumber : pageNumber + 1));
    };

    return (
        <PaginationContainer currentIndex={currentIndex} maxIndex={maxIndex}>
            <PaginationNavigate>First</PaginationNavigate>
            <PaginationArrow onClick={prevArrowNumber}>&lt;</PaginationArrow>

            {currentNumberArray.map((page) => {
                if (page === '...') return <PaginationItem disabled>&hellip;</PaginationItem>;
                return <PaginationItem key={page} active={currentNumber === page && true} onClick={() => { setCurrentNumber(page); }}>{page}</PaginationItem>;
            })}

            <PaginationArrow onClick={nextArrowNumber}>&gt;</PaginationArrow>
            <PaginationNavigate>Last</PaginationNavigate>
        </PaginationContainer>
    );
};

Paginator.propTypes = {
    /**
    * Current index
    */
    currentIndex: PropTypes.number.isRequired,
    /**
    * Max index
    */
    maxIndex: PropTypes.number.isRequired,
};

Paginator.defaultProps = {};

export default Paginator;
