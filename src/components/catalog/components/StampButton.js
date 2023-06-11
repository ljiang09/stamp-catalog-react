import {Button} from '@mui/material';
import React from 'react';

import StampTooltip from './StampTooltip';
import useStyles from './styles.js'

const StampButton = ({obj, setName, tags, alt, handleClick}) => {
    const classes = useStyles({height: obj.height, owned: obj.owned});

    return (
        <StampTooltip stampInfo={obj} setName={setName} tags={tags}>
            <Button
                onClick={() => handleClick(obj)}
                className={classes.stampBtn}
            >
                <img
                    src={obj.image}
                    alt={alt}
                    className={classes.stampImg}
                />
            </Button>
        </StampTooltip>
    );
};

export default StampButton;
