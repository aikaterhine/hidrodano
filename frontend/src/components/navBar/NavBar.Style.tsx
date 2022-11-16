const navBarStyles : { [key: string]: React.CSSProperties } = {
  appbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    zIndex: 1,
    padding: '5px 10px',
  },
  navlinks: {
    marginLeft: 50,
    display: "flex",
  },
  logo: {
    cursor: "pointer",
    width: "80%"
  },
  link: {
    textDecoration: "none",
    color: "#616462",
    fontFamily: 'Poppins',
    marginLeft: 40
  },
  buttonText:{
    fontSize: '14px',
    letterSpacing: 0,
    fontWeight: 'bold'
  }
};

export default navBarStyles;