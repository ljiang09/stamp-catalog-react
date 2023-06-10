import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  stampBtn: {
    display: 'inline-block',
    // height: '9.5vw',
    height: (props) => `${props.height/3}vw`,
    margin: '0.85vw 1vw !important',
    padding: '0'
  },
  stampImg: {
    display: 'inline-block',
    height: '100%',
    filter: (props) => props.owned ? 'none' : 'brightness(50%)'
  }
});

export default useStyles;
