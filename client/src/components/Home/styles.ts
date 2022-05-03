import { makeStyles } from '@material-ui/core/styles';

interface IStyles {
    appBarSearch: {};
    pagination: {};
    gridContainer: {};
}

export default makeStyles((theme):IStyles => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));