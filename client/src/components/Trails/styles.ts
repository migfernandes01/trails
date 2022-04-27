import { makeStyles } from '@material-ui/core/styles';

// interface to describe TrailsStyles
interface TrailsStyles {
    mainContainer: {};
    smMargin: {};
    actionDiv: {};
}

// styles for Trails
export default makeStyles((theme): TrailsStyles => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));