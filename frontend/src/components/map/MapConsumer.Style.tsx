const mapConsumerStyles: { [key: string]: React.CSSProperties } = {
  app: {
    textAlign: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  appLoading: {
    overflow: 'auto',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    background: 'white',
    pointerEvents: 'none',
    backgroundColor: 'rgba(0,0,0,0.8)', display: 'block', width: '100%', height: '100%', color: 'white'
  },
  appZoomControl: {
    width: '50%',
    overflow: 'auto',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    background: 'white',
    pointerEvents: 'none',
  },
  appPanelControl: {
    width: '23%',
    height: '90%',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    background: 'white',
    pointerEvents: 'none',
    borderRadius: 40,
    overflow: "hidden",
    marginTop: '25px',
    marginRight: '25px'
  },
  appPanel: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '4px',
    padding: '3px',
    margin: '20px',
  },
  mapContainer: {
    height: '60vh',
    width: '100%',
  },
  clickedCoordLabel: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    background: 'white',
    borderRadius: '5px',
  },
  clickedCoordLabelP: {
    margin: '10px',
  },
  logo: {
    width: '70%',
    height: 'auto',
  },
  title: {
    fontFamily: 'Bebas Neue',
    fontSize: '100px'
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: '16px',
    color: "#616462",
    opacity: "70%",
    textAlign: 'justify',
    paddingTop: 15,
    lineHeight: 1.5
  },
  grid: {
    textAlign: "center",
    justifyContent: "center",
    minHeight: '100vh',
  },
  gridItem: {
    border: '10px solid rgba(0, 0, 0, 0.4)',
    padding: 0,
  },
  panelItem: {
    paddingLeft: 30,
    height: '100%',
    width: '100%',
  }      
};

export default mapConsumerStyles