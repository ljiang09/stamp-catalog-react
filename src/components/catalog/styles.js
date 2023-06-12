import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  filterBy: {width: '30vw', marginLeft: '35vw'},
  binderBackground: {
    position: 'absolute',
    width: '70%',
    left: '13%',
    zIndex: -10
  },
  stampRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '64vw',
    marginLeft: '18vw'
  }
});

export default useStyles;
