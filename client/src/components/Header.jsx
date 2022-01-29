import { AppBar, Toolbar, Typography ,makeStyles } from "@material-ui/core";
import {Link, useHistory} from 'react-router-dom';
import {useOktaAuth}  from '@okta/okta-react'
const useStyle = makeStyles({
  component: {
      background: '#FFFFFF',
      color: 'black'
  },
  container: {
      justifyContent: 'center',
      '&  >*': {
          padding: 20,
          color: 'black',
          textDecoration: 'none'
      }
  },
  link:{
    textDecoration:'none',
    color:'inherit'
  }
})

const Header = () => {

  const classes = useStyle();

  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();

  if (authState && authState.isPending) return null;


  const login = async () => history.push('/login');

  const logout = async () => oktaAuth.signOut();

  const button = authState.isAuthenticated ?
  <button onClick={logout}
  style={{
    background:'unset',
    border:'none',
    textTransform:'uppercase',
    fontFamily:'Roboto',
    fontSize:17,
    opacity:0.8,
    cursor:'pointer'

  }}
  >Logout</button> :
  <button onClick={login}>Login</button>;

  return (
    <AppBar className={classes.component}>
      <Toolbar className={classes.container}>
        <Link className ={ classes.link} to ='/'> <Typography>Home</Typography> </Link>
        <Typography>About</Typography>
        <Typography>Contact</Typography>
        <Typography>Login</Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
