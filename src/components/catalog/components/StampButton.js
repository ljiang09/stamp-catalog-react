import {Button} from '@mui/material';
import React from 'react';

import StampTooltip from './StampTooltip';

const StampButton = ({obj, alt, handleClick}) => {
    return (
        <StampTooltip
            stampInfo={obj}
        >
            <Button
            onClick={() => handleClick(obj.id)}
                style={{
                    display: 'inline-block',
                    height: '9.5vw',
                    margin: '0.85vw 1vw',
                    padding: '0'
                }}
            >
                <img src={obj.image} alt={alt}
                    style={{display: 'inline-block', height: '100%', filter: (obj.owned) ? 'none' : 'brightness(50%)'}} />
            </Button>
        </StampTooltip>
    );
};

export default StampButton;
